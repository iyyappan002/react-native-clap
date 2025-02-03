import CommentsList from '@/components/posts/CommentsList';
import { useLocalSearchParams } from 'expo-router';
import React from 'react'
import { Text } from 'react-native'

function PostView() {
    const { id } = useLocalSearchParams();
  return (
    <>
    <Text>Post view {id}</Text>

<CommentsList />
    </>
  )
}

export default PostView