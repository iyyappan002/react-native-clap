import { Post } from '@/types/postTypes'
import React, { useEffect } from 'react'
import { ActivityIndicator, FlatList, RefreshControl, View } from 'react-native'
import PostCard from './PostCard'
import { usePost } from '@/context/PostContext'
import AcheiversList from './AcheiversList'
import SkeletonLoading from "expo-skeleton-loading";

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
            {/* {(loading || items?.length == 0) && <ActivityIndicator size="large" />} */}
            {(loading || items?.length == 0) && 
                Array.from({ length: 2 }).map((n,i) => (
            <SkeletonLoading 
                background={"#cacaca"} highlight={"#ffffff"}>
                <View style={{flexDirection:'column',borderRadius:10,borderWidth:1,marginBottom:15,paddingBottom:10,paddingHorizontal:2}}>
                    <View>
                        <View style={{ flexDirection: 'row',marginTop:20,gap:10 }}>
                            <View style={{ width: 80, height: 80, backgroundColor: "#cacaca", borderRadius: 40 }} />
                            <View style={{flexDirection:'column',flex:1,gap:10}}>
                                <View style={{ width:"60%",height:20, backgroundColor: "#cacaca",borderRadius:10 }} />
                                <View style={{ width:"30%",height:20, backgroundColor: "#cacaca",borderRadius:10 }} />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row',marginTop:10,gap:10 }}>
                            <View style={{ width:"100%",height:200, backgroundColor: "#cacaca" }} />
                        </View>
                        <View style={{ flexDirection: 'row',marginTop:10,gap:10 }}>
                            <View style={{ width: "30%", height: 20, backgroundColor: "#cacaca", borderRadius: 10 }} />
                            <View style={{ width:"40%",height:20, backgroundColor: "#cacaca",borderRadius:10 }} />
                            <View style={{ width:"25%",height:20, backgroundColor: "#cacaca",borderRadius:10 }} />
                        </View>
                    </View>
                    </View>
                    
                    </SkeletonLoading>
                ))
    }
        </View>
    )
}

export default PostList