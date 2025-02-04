import { useInfiniteQuery, useQuery } from "react-query"
import QUERY_CONSTANTS from "@/config/queryConfig"
import apiClient from "./apiClient"
import postService from "@/services/postService"

// export const useMentionsQuery = (query) => {
//     return useQuery({
//         queryKey: ['mentions', query],
//         queryFn: () => postService.searchMentions(query),
//         enabled: !!query,
//         keepPreviousData: true,
//         cacheTime: 10 * 60 * 1000, //10min
//     })
// }


export const usePostsQuery = () => {
    return useInfiniteQuery({
        queryKey: ['posts'],
        queryFn: ({ pageParam }) => postService.getPosts({ params: { page: pageParam } }),
        getNextPageParam: (lastPage, allPages) => lastPage?.pagination?.hasNextPage
            ? lastPage?.pagination?.currentPage + 1
            : undefined,
        keepPreviousData: true,
        staleTime: QUERY_CONSTANTS.staletime
    })
}


// export const useTagsQuery = () => {
//     return useQuery({
//         queryKey: ['tags'],
//         queryFn: () => postService.tagList(),
//         keepPreviousData: true,
//         staleTime: 10 * 60 * 1000, //10min
//     })
// }

// export const useEventsQuery = (page) => {
//     return useQuery({
//         queryKey: ['events', page],
//         queryFn: () => postService.getEvents(page),
//         keepPreviousData: true,
//         staleTime: QUERY_CONSTANTS.staletime
//     })
// }

// export const useBirthdayQuery = () => {
//     return useQuery({
//         queryKey: ['biethdays'],
//         queryFn: () => postService.getBirthdays(),
//         keepPreviousData: true,
//         staleTime: QUERY_CONSTANTS.staletime
//     })
// }


export const usePredefinedCommentsQuery = () => {
    return useQuery({
        queryKey: ['predefinedComments'],
        queryFn: () => postService.getPredefinedComments(),
        keepPreviousData: true,
        staleTime: QUERY_CONSTANTS.staletime
    })
}

export const useLastMonthAchieversQuery = () => {
    return useInfiniteQuery({
        queryKey: ['lastMonthAchievers'],
        queryFn: ({ pageParam = 1 }) => postService.getLastMonthAchievers({ page: pageParam }),
        getNextPageParam: (lastPage, allPages) => lastPage?.pagination?.hasNextPage
            ? lastPage?.pagination?.currentPage + 1
            : undefined,
        keepPreviousData: true,
        staleTime: QUERY_CONSTANTS.staletime
    })
}