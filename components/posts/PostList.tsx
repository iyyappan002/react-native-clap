import { Post } from '@/types/postTypes'
import React, { useEffect } from 'react'
import { ActivityIndicator, FlatList, RefreshControl, View } from 'react-native'
import PostCard from './PostCard'
import { usePostsQuery } from '@/api/queries'
import { usePost } from '@/context/PostContext'

type Props = {
}

function PostList(props: Props) {
    const { posts, loadMorePosts, loading, hasMore, isNextPageLoading, refreshPost } = usePost();
    const items = posts || []; // Extracting posts

    useEffect(() => {
        refreshPost()
    }, [])
    
    return (
       <View style={{paddingHorizontal:5}}>
         <FlatList
            data={items}
            keyExtractor={(item, index) => index?.toString()}
            renderItem={({ item }) => <PostCard key={item.id} post={item} />}
            onEndReached={() => hasMore && loadMorePosts()}
            onEndReachedThreshold={0.5} // Load more when scrolled halfway
            refreshControl={
                <RefreshControl refreshing={isNextPageLoading} onRefresh={refreshPost} />
            }
            ListFooterComponent={isNextPageLoading ? <ActivityIndicator size="large" style={{padding:20}} /> : null}

        />
        {loading && <ActivityIndicator size="large" /> }
       </View>
    )
}

export default PostList