import { Post } from "@/types/postTypes";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { getInitials, getRandomRGBColor, getStorageItem } from "@/utils/storage";
import { usePost } from "@/context/PostContext";

type Props = {
    post: Post;
};

function PostCard({ post }: Props) {
    console.log({ post });
    const { toggleLike, userData: user } = usePost();
    const isLiked = post.likedBy?.some(likes => likes.userId === user?.userId);


    const onLikesPress = async () => {
        console.log("presse")
        toggleLike(post.id, user?.userId)
    }

    return (
        <View style={styles.feedContainer}>
            <View style={styles.feedHeader}>
                <Text
                    style={[
                        styles.postLogoText,
                        { backgroundColor: getRandomRGBColor(post.author.name) },
                    ]}
                >
                    {getInitials(post.author.name)}
                </Text>
                <View style={styles.postTitle}>
                    <View style={styles.postHeader}>
                        <Text style={styles.postName}>{post.author.name}</Text>
                        <Text style={styles.postTime}>{post.timestamp}</Text>
                    </View>
                    <Text>{post.author.jobcode}</Text>
                </View>
            </View>
            {/* <View style={styles.employeeContainer}> */}
            {/* <Chip mode='outlined' >@{post.employee.name}</Chip> */}
            {/* </View> */}
            <Text style={styles.postText}>{post.content}</Text>
            <Image
                source={{
                    uri: post.images[0],
                }}
                resizeMode="cover"
                style={styles.postImage}
            />
            <View style={styles.postActions}>
                <View>
                    <View style={styles.actionContainer}>
                        <Text onPress={onLikesPress}>
                            <MaterialCommunityIcons name="thumb-up" size={20} color={isLiked ? "blue" : "black"} />{" "}
                            {post.metrics.likes}
                        </Text>
                        <Text>
                            <FontAwesome name="comment-o" size={20} color="blue" />{" "}
                            {post.metrics.commentsCount}
                        </Text>
                    </View>
                </View>
                <View style={{display:"flex", flexDirection:"row", gap:8, alignItems:"center"}}>
                        <FontAwesome5 name="eye" size={20} color="blue" />
                    <Text>
                        {post.metrics.views} Views
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 20,
    },
    lastMonthCard: {
        backgroundColor: '#F8F8F8',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
    },
    lastMonthtitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    lastMonthText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    seeAll: {
        fontSize: 14,
        color: '#2B93E7',
    },
    scrollContainer: {
        gap: 20,
    },
    achieverContainer: {
        alignItems: 'center',
    },
    logoText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: 'purple',
        borderRadius: 40,
        textAlign: 'center',
        paddingHorizontal: 15,
        paddingVertical: 5,
    },
    feedContainer: {
        backgroundColor: 'white',
        marginTop: 10,
        shadowColor: "#000",
        // Android Shadow
        elevation: 4,
    },
    feedHeader: {
        flex: 1,
        padding: 8,
        flexDirection: 'row',
        gap: 15,
    },
    postHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10,
    },
    postTitle: {
        gap: 5,
    },
    postLogoText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: 'purple',
        borderRadius: 50,
        textAlign: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    postName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    postTime: {
        fontSize: 14,
        color: '#939393',
    },
    postText: {
        padding: 8,
        fontSize: 16,
    },
    postImage: {
        width: '100%',
        height: 200,
    },
    postFeed: {
        flex: 1,
        paddingBottom: 20,
    },
    postActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 8,
        paddingTop: 12,
        paddingBottom: 12,
    },
    actionContainer: {
        flexDirection: 'row',
        gap: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    employeeContainer: {
        textAlign: 'center',
        marginTop: 10,
        borderRadius: 20,
        color: 'white',
        // width:'40%'
    },
    employeeName: {
        color: 'white',
        alignItems: 'center',
        backgroundColor: "rgb(25, 118, 210)",
    }

})

export default PostCard;
