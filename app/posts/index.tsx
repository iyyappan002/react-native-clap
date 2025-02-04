import { usePostsQuery } from '@/api/queries'
import AcheiversList from '@/components/posts/AcheiversList';
import PostCard from '@/components/posts/PostCard';
import PostList from '@/components/posts/PostList';
import { Post } from '@/types/postTypes';
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { ActivityIndicator, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { navigate } from 'expo-router/build/global-state/routing';
import { GestureHandlerRootView, NativeViewGestureHandler } from "react-native-gesture-handler";

import { router } from 'expo-router';

function Index() {
  return (
    <View style={{
      flex: 1,
    }}>
      <PostList />
      {/* <View style={styles.addButton}>
        <TouchableOpacity onPress={() => router.navigate("/posts/create")}>
          <Ionicons name="add-circle" size={60} color="black" />
        </TouchableOpacity>
      </View> */}
    </View>
  )
}

const styles = StyleSheet.create({
  addButton: {
    position: 'absolute',
    zIndex: 10,
    right: 20,
    bottom: 20,
  }
})

export default Index