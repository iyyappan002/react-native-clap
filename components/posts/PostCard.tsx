import { Post } from '@/types/postTypes'
import React from 'react'
import { Text } from 'react-native'

type Props = {
    post: Post
}

function PostCard({ post }: Props) {
    console.log({post})
    return (
        <Text>{post.title}</Text>
    )
}

export default PostCard