import { Post } from '@/types/postTypes'
import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Alert, Animated, FlatList, Modal, Pressable, RefreshControl, StyleSheet, Text, View } from 'react-native'
import PostCard from './PostCard'
import { usePost } from '@/context/PostContext'
import AcheiversList from './AcheiversList'
import SkeletonLoading from "expo-skeleton-loading";

type Props = {
}

function PostList(props: Props) {
    const [modalVisible, setModalVisible] = useState(false);
    const { posts, loadMorePosts, loading, hasMore, isNextPageLoading, refreshPost } = usePost();
    const items = posts || []; // Extracting posts

    const scrollY = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        refreshPost()

    }, [])

    return (<>
            <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>You Have Logged In !!</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <View style={{ paddingHorizontal: 5 }}>
            <Animated.FlatList
                ListHeaderComponent={<AcheiversList />}
                // onScroll={Animated.event(
                //     [{ nativeEvent : { contentOffset :{ y: scrollY }}}],
                //     {useNativeDriver: true}
                // )}
                nestedScrollEnabled
                data={items}
                keyExtractor={(item, index) => index?.toString()}
                renderItem={({ item,index }) => {
                    const inputRange = [-1,0, 1000 * index, 1000 * (index +1)]
                    const scale = scrollY.interpolate({
                        inputRange : [-100, 0], 
                        outputRange :[2, 1],
                        extrapolate: 'clamp'
                    })
                    return <PostCard key={item.id} post={item} scale={scale}/>
                }}
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
        </>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        borderWidth:1,
      },
      button: {
        // borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      buttonOpen: {
        backgroundColor: '#F194FF',
      },
      buttonClose: {
        backgroundColor: '#2196F3',
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      },
})

export default PostList