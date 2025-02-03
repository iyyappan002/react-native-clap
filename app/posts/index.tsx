import { usePostsQuery } from '@/api/queries'
import PostCard from '@/components/posts/PostCard';
import PostList from '@/components/posts/PostList';
import { Post } from '@/types/postTypes';
import React from 'react'
import { ActivityIndicator, Text, View } from 'react-native'

function Index() {
  return (
    <View>
      <PostList />
    </View>
  )
}

export default Index