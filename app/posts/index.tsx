import { usePostsQuery } from '@/api/queries'
import PostCard from '@/components/posts/PoctCard';
import { Post } from '@/types/postTypes';
import React from 'react'
import { Text, View } from 'react-native'

function Index() {
  const { data, error, isLoading } = usePostsQuery()

  return (
    <View>
      {data?.pages.map(response => {
        return response.data?.posts?.map((post: Post) => {
          return <PostCard post={post} />
        })
      })}
    </View>
  )
}

export default Index