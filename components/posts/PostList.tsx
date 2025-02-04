import { Post } from '@/types/postTypes'
import React, { useEffect } from 'react'
import { ActivityIndicator, FlatList, RefreshControl, View } from 'react-native'
import PostCard from './PostCard'
import { usePost } from '@/context/PostContext'
import AcheiversList from './AcheiversList'

type Props = {
}

function PostList(props: Props) {
    const { posts, loadMorePosts, loading, hasMore, isNextPageLoading, refreshPost } = usePost();
    const items = posts || []; // Extracting posts

    useEffect(() => {
        refreshPost()
    }, [])

    return (
        <View style={{ paddingHorizontal: 5 }}>
            <FlatList
                ListHeaderComponent={<AcheiversList />}
                nestedScrollEnabled
                data={items}
                keyExtractor={(item, index) => index?.toString()}
                renderItem={({ item }) => <PostCard key={item.id} post={item} />}
                onEndReached={() => hasMore && loadMorePosts()}
                onEndReachedThreshold={0.5} // Load more when scrolled halfway
                refreshControl={
                    <RefreshControl refreshing={isNextPageLoading} onRefresh={refreshPost} />
                }
                ListFooterComponent={isNextPageLoading ? <ActivityIndicator size="large" style={{ padding: 20 }} /> : null}

            />
            {(loading || items?.length == 0) && <ActivityIndicator size="large" />}
        </View>
    )
}

export default PostList