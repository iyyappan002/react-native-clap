import postService from '@/services/postService';
import React, { createContext, useContext, useState, useCallback, useEffect, useReducer } from 'react';
import { useQueryClient } from 'react-query';

const PostContext = createContext(null);

const postInitialState = {
  page:1,
  sort:"latest",
  search:"",
  loading:true,
  isNextPageLoading:false,
  hasMore:false,
  posts:[],
  refreshKey:0,
}

function postReducer(state, action) {
  if (action.type == "nextPage") {
    return {
      ...state,
      page: state.page + 1,
      loading: false,
      isNextPageLoading: true,
    }
  } else if (action.type == "sort") {
    return {
      ...state,
      sort: action.sort,
      page: 1,
      loading: true,
    }
  } else if (action.type == "search") {
    return {
      ...state,
      page: 1,
      search: action.search,
      loading: true,
    }
  } if (action.type == "fetchSuccess") {
    return {
      ...state,
      loading: false,
      isNextPageLoading: false,
      posts: state.page == 1 ? action.data?.posts : [...state.posts, ...action.data.posts],
      hasMore: action.data?.pagination?.hasNextPage,
    }
  } else if (action.type == "toggleLike") {
    return {
      ...state,
      posts: state.posts?.map(post => {
        if (post.id === action.postId) {
          const isLiked = post.likedBy.some(user => user.userId === action.userId);
          return {
            ...post,
            metrics: {
              ...post.metrics,
              likes: isLiked ? post.metrics.likes - 1 : post.metrics.likes + 1
            },
            likedBy: isLiked
              ? post.likedBy.filter(user => user.userId !== action.userId)
              : [...post.likedBy, { userId: action.userId, name: 'Me' }]
          };
        }
        return post;
      })
    }
  } else if (action.type == "addComment") {
    return {
      ...state,
      posts: state.posts.map(post => {
        if (post.id === action.postId) {
          return {
            ...post,
            metrics: {
              ...post.metrics,
              commentsCount: post.metrics.commentsCount + 1
            },
            comments: [action.comment, ...post.comments]
          };
        }
        return post;
      })
    }
  } else if (action.type == "postView") {
    return {
      ...state,
      posts: state.posts.map(post => {
        if (post.id === action.postId) {
          const userViewed = post.viewedBy.some(user => user.userId === action.userId);

          return {
            ...post,
            metrics: {
              ...post.metrics,
              views: userViewed ? post.metrics.views : post.metrics.views + 1
            },
            viewedBy: userViewed
              ? post.viewedBy
              : [...post.viewedBy, { userId: action.userId, name: 'Me' }]
          };
        }
        return post;
      })
    }
  } else if (action.type == "toggleCommentLike") {
    return {
      ...state,
      posts: state.posts.map(post => {
        if (post.id === action.postId) {
          return {
            ...post,
            comments: post.comments?.map(comment => {
              if (comment.id == action.commentId) {
                const isLiked = comment?.likedBy?.some(user => user.userId === action.userId);
                return {
                  ...comment,
                  likes: isLiked?comment.likes-1 :comment.likes + 1,
                  likedBy: isLiked
                    ? comment.likedBy.filter(user => user.userId !== action.userId)
                    : [...comment.likedBy, { userId: action.userId, name: 'Me' }]
                }
              }
              return comment;
            })
          };
        }
        return post;
      })
    }
  }

  else if (action.type == "refresh") {
    return { ...postInitialState,loading: false, refreshKey: state.refreshKey + 1 }
  }
}

export const PostProvider = ({ children }) => {
  const [postState, postDispatch] = useReducer(postReducer, postInitialState)
  const [userData, setUserData] = useState(null)
  const queryClient = useQueryClient();
  console.log({postState});

  

  const loading = postState.loading;
  const hasMore = postState.hasMore;
  const posts = postState.posts;
  const isNextPageLoading = postState?.isNextPageLoading;

  const refreshPost = () => {
    postDispatch({ type: 'refresh' })
  }

  const fetchPosts = async (params) => {
    try {
      const data = await postService.getPosts({
        params,
      })
        postDispatch({ type: "fetchSuccess", data: data })
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const loadMorePosts = () => {
    if (!loading &&!isNextPageLoading && hasMore) {
      postDispatch({ type: 'nextPage' })
    }
  };

  console.log({ loading, isNextPageLoading });


  const toggleLike = async (postId, userId) => {
    postService.likePost({
      post_id: postId
    }).then(() => {
      queryClient.invalidateQueries('lastMonthAchievers')
    })
    postDispatch({ type: "toggleLike", postId, userId })
  };

  const toggleCommentLike = async (postId, userId, commentId) => {
    postService.likeComment({
      comment_id: commentId
    })
    postDispatch({ type: "toggleCommentLike", postId, userId, commentId })
  };

  const addComment = (postId, comment) => {
    postDispatch({ type: "addComment", postId, comment })
  };

  const postView = (postId, userId) => {
    postService.postView({
      post_id: postId
    })
    postDispatch({ type: 'postView', postId, userId })
  }


  const changeSort = (event) => {
    postDispatch({ type: "sort", sort: event.target.value })
  };

  const searchPost = (q) => {
    postDispatch({ type: "search", search: q })
  }

  const clearSearch = () => {
    postDispatch({ type: "search", search: "" })
  }


  useEffect(() => {
    if (postState.refreshKey != 0) {
      const params = {
        page: postState.page,
        sort: postState.sort,
        q: postState.search
      }
      fetchPosts(params);
    }
  }, [postState.page, postState.search, postState.sort, postState.refreshKey]);

  return (
    <PostContext.Provider value={{
      posts,
      loading,
      hasMore,
      loadMorePosts,
      toggleLike,
      toggleCommentLike,
      refreshPost,
      addComment,
      postView,
      postState,
      postDispatch,
      isNextPageLoading,
      changeSort,
      searchPost,
      clearSearch,
      userData, 
      setUserData,
    }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePost = () => useContext(PostContext);



























// import React, { createContext, useContext, useState, useCallback } from 'react';
// import { generateMockPosts } from '../utils/mockData';

// const PostContext = createContext(null);
// const POSTS_PER_PAGE = 5;

// export const PostProvider = ({ children }) => {
//   const [posts, setPosts] = useState(generateMockPosts(20));
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');

//   const loadMorePosts = useCallback(async () => {
//     if (loading || !hasMore) return;

//     setLoading(true);
//     await new Promise(resolve => setTimeout(resolve, 1000));

//     const start = page * POSTS_PER_PAGE;
//     const newPosts = generateMockPosts(POSTS_PER_PAGE);
    
//     if (newPosts.length < POSTS_PER_PAGE) {
//       setHasMore(false);
//     }

//     setPosts(prevPosts => [...prevPosts, ...newPosts]);
//     setPage(prevPage => prevPage + 1);
//     setLoading(false);
//   }, [page, loading, hasMore]);

//   const filterPosts = useCallback((posts, query) => {
//     if (!query) return posts;

//     const searchTerms = query.toLowerCase().split(' ');
    
//     return posts.filter(post => {
//       const content = post.content.toLowerCase();
//       const authorName = post.author.name.toLowerCase();
//       const authorRole = post.author.role.toLowerCase();
//       const hashtags = (content.match(/#\w+/g) || []).join(' ').toLowerCase();
      
//       return searchTerms.every(term => 
//         content.includes(term) ||
//         authorName.includes(term) ||
//         authorRole.includes(term) ||
//         hashtags.includes(term)
//       );
//     });
//   }, []);

//   const getFilteredPosts = useCallback(() => {
//     return filterPosts(posts, searchQuery);
//   }, [posts, searchQuery, filterPosts]);

//   const addComment = (postId, comment) => {
//     setPosts(posts.map(post => {
//       if (post.id === postId) {
//         return {
//           ...post,
//           comments: [comment, ...post.comments]
//         };
//       }
//       return post;
//     }));
//   };

//   const toggleLike = (postId, userId) => {
//     setPosts(posts.map(post => {
//       if (post.id === postId) {
//         const isLiked = post.likedBy.includes(userId);
//         return {
//           ...post,
//           likes: isLiked ? post.likes - 1 : post.likes + 1,
//           likedBy: isLiked 
//             ? post.likedBy.filter(id => id !== userId)
//             : [...post.likedBy, userId]
//         };
//       }
//       return post;
//     }));
//   };

//   return (
//     <PostContext.Provider value={{ 
//       posts: getFilteredPosts(),
//       addComment, 
//       toggleLike, 
//       loadMorePosts, 
//       loading, 
//       hasMore,
//       searchQuery,
//       setSearchQuery
//     }}>
//       {children}
//     </PostContext.Provider>
//   );
// };

// export const usePost = () => useContext(PostContext);