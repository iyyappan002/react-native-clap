import { useLastMonthAchieversQuery } from '@/api/queries'
import React, { useMemo } from 'react'
import { Text } from 'react-native'
import AcheiverCard from './AcheiverCard'

function AcheiversList() {
    const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } = useLastMonthAchieversQuery()

    const achievers = useMemo(() => {
        return data?.pages?.at(0)?.lastMonthAchievers?.slice(0, 5) ?? []
    }, [data?.pages])
    console.log({achievers,data : data?.pages});

    return (
        achievers.map(achiever => <AcheiverCard key={achiever.id.toString()} acheiver={achiever}/>)
    )
}

export default AcheiversList