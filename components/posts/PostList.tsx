import { Post } from '@/types/postTypes'
import React from 'react'
import { ActivityIndicator, FlatList, RefreshControl, View } from 'react-native'
import PostCard from './PostCard'
import { usePostsQuery } from '@/api/queries'

type Props = {
}

function PostList(props: Props) {
    const { data, isLoading, isFetchingNextPage, refetch, hasNextPage, fetchNextPage } = usePostsQuery()
    const items = data?.pages.flatMap((page) => page.posts) || []; // Extracting posts
    return (
       <View>
         <FlatList
            data={items}
            keyExtractor={(item, index) => index?.toString()}
            renderItem={({ item }) => <PostCard key={item.id} post={item} />}
            onEndReached={() => hasNextPage && fetchNextPage()}
            onEndReachedThreshold={0.5} // Load more when scrolled halfway
            refreshControl={
                <RefreshControl refreshing={isFetchingNextPage} onRefresh={refetch} />
            }
            ListFooterComponent={isFetchingNextPage ? <ActivityIndicator size="small" /> : null}

        />
        {isLoading && <ActivityIndicator size="large" /> }
       </View>
    )
}

export default PostList