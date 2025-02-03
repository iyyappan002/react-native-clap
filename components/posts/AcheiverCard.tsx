import { LastMonthAchiever } from '@/types/postTypes'
import React from 'react'
import { Text } from 'react-native'

type Props  = {
    acheiver: LastMonthAchiever
}

function AcheiverCard({ acheiver }: Props) {
    return (
        <Text>{acheiver.username}</Text>
    )
}

export default AcheiverCard