import { Post } from "@/types/postTypes";
import React, { useMemo } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import {
  getInitials,
  getRandomRGBColor,
  getStorageItem,
} from "@/utils/storage";
import { usePost } from "@/context/PostContext";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { usePredefinedCommentsQuery } from "@/api/queries";
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';


function PostView() {
  const { id } = useLocalSearchParams();

  const { toggleLike, userData: user, postView, posts } = usePost();
  const post: Post = useMemo(
    () => posts.find((post) => post?.id == id),
    [posts]
  );
  const isLiked = post.likedBy?.some((likes) => likes.userId === user?.userId);

  const onLikesPress = async () => {
    toggleLike(post.id, user?.userId);
  };

  const { data } = usePredefinedCommentsQuery();

  const commentsDropddown = data?.comments.map((comment,index) =>{
    return {value: index,label : comment}
  }) 

  console.log(commentsDropddown,"comments",data);

    const highlightText = (text :any) => {
      const mentionPattern = /@(\w+(\.\w+)?)/gi; // Pattern to match @name and @name.surname
      const hashtagPattern = /(#\w+)/g;
  
      const parts = text.split(/(@\w+(?:\.\w+)?|#\w+)/g); // Pattern to match @name and @name.surname
  
      return parts.map((part, index) => {
          if (mentionPattern.test(part)) {
              return (
                  <Text key={index} style={styles.mentions}>
                      {part}
                  </Text>
              );
          } else if (hashtagPattern.test(part)) {
              return (
                  <Text key={index} style={styles.mentions}>
                      {part}
                  </Text>
              );
          } else {
              return part;
          }
      });
  };

  console.log(post.author.name, "author");

  return (
    <ScrollView>
        <Stack.Screen options={{ headerTitle: post.author.name }} />
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
            <Text style={styles.postJob}>{post.author.jobcode}</Text>
          </View>
        </View>
        <View style={styles.employeeContainer}>
          <Text style={styles.employeeName}>@ {post.employee.name}</Text>
          </View>
        <Text style={styles.postText}>{highlightText(post.content)}</Text>
        {post.images.length > 0 &&<Image
          source={{
            uri: post.images[0],
          }}
          resizeMode="cover"
          style={styles.postImage}
        />
        }
        <View style={styles.postActions}>
          <View>
            <View style={styles.actionContainer}>
              <Text onPress={onLikesPress}>
                <MaterialCommunityIcons
                  name="thumb-up"
                  size={20}
                  color={isLiked ? "blue" : "gray"}
                />{" "}
                {post.metrics.likes}
              </Text>
              <Text>
                <FontAwesome name="comment-o" size={20} color="gray" />{" "}
                {post.metrics.commentsCount}
              </Text>
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 8,
              alignItems: "center",
            }}
          >
            <FontAwesome5 name="eye" size={20} color="gray" />
            <Text>{post.metrics.views} Views</Text>
          </View>
        </View>
      </View>
      <View style={styles.commentContainer}>
        {/* <View style={styles.commentInputContainer}>
        <Dropdown
          style={[styles.dropdown]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={commentsDropddown}
          maxHeight={300}
          labelField="label"
          valueField="value"
          // placeholder={!isFocus ? 'Select item' : '...'}
          searchPlaceholder="Search..."
          // value={value}
          // onFocus={() => setIsFocus(true)}
          // onBlur={() => setIsFocus(false)}
          onChange={item => {
            // setValue(item.value);
            // setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              // color={isFocus ? 'blue' : 'black'}
              name="Safety"
              size={20}
            />
          )}
        />
        </View> */}
        <View style={styles.commentHeader}>
          <Text style={styles.headerText}>Comments</Text>
        </View>
        <View>
          {post.comments
            .slice(0)
            .reverse()
            .map((comment, index) => (
              <View key={index} style={styles.comment}>
                <View style={styles.feedHeader}>
                  <Text
                    style={[
                      styles.postLogoText,
                      {
                        backgroundColor: getRandomRGBColor(comment.author.name),
                      },
                    ]}
                  >
                    {getInitials(comment.author.name)}
                  </Text>
                  <View style={styles.postTitle}>
                    <View style={styles.postHeader}>
                      <Text style={styles.postName}>{post.author.name}</Text>
                      <Text style={styles.postTime}>{post.timestamp}</Text>
                    </View>
                    <Text style={styles.postJob}>{comment.author.jobcode}</Text>
                  </View>
                </View>
                <Text style={styles.commentText}>{comment.content}</Text>
              </View>
            ))}
        </View>
      </View>
    </ScrollView>
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
    backgroundColor: "#F8F8F8",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  lastMonthtitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  lastMonthText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  seeAll: {
    fontSize: 14,
    color: "#2B93E7",
  },
  scrollContainer: {
    gap: 20,
  },
  achieverContainer: {
    alignItems: "center",
  },
  logoText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    backgroundColor: "purple",
    borderRadius: 40,
    textAlign: "center",
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  feedContainer: {
    backgroundColor: "white",
    shadowColor: "#000",
    // Android Shadow
    elevation: 4,
  },
  feedHeader: {
    padding: 8,
    flexDirection: "row",
    gap: 15,
  },
  postHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  postTitle: {
    gap: 5,
  },
  postLogoText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    backgroundColor: "purple",
    borderRadius: 50,
    textAlign: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  postName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  postTime: {
    fontSize: 14,
    color: "#939393",
  },
  postJob:{
    color: "#939393",
  },
  postText: {
    padding: 8,
    fontSize: 16,
  },
  postImage: {
    width: "100%",
    height: 200,
  },
  postFeed: {
    flex: 1,
    paddingBottom: 20,
  },
  postActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
    paddingTop: 12,
    paddingBottom: 12,
  },
  actionContainer: {
    flexDirection: "row",
    gap: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  employeeContainer: {
    textAlign: "center",
    alignSelf: "flex-start",
    marginTop: 10,
    paddingHorizontal:8,
    paddingVertical: 5,
    color: "white",
    backgroundColor: "rgb(25, 118, 210)",
    borderRadius: 20,
  },
  employeeName: {
    color: "white",
    alignItems: "center",
    textAlign:'center',
    backgroundColor: "rgb(25, 118, 210)",
  },
  commentContainer: {
    marginTop: 10,

  },
  comment: {
    backgroundColor: "white",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
    padding: 10,
  },
  commentText: {
    paddingLeft: 60,
    fontSize: 16,
  },
  mentions:{
    color: "#2B93E7",
  },
  commentHeader:{
    backgroundColor: "white",
    padding: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  headerText:{
    fontSize: 18,
    fontWeight: "bold",
  }
  
});

export default PostView;
