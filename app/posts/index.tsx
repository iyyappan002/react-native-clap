import { usePostsQuery } from '@/api/queries'
import AcheiversList from '@/components/posts/AcheiversList';
import PostCard from '@/components/posts/PostCard';
import PostList from '@/components/posts/PostList';
import { Post } from '@/types/postTypes';
import React from 'react'
import { ActivityIndicator, Text, View } from 'react-native'

function Index() {
  return (
    <View>
      <AcheiversList />
      <PostList />
    </View>
  )
}

export default Index