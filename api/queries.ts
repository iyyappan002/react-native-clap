import { useInfiniteQuery, useQuery } from "react-query"
import QUERY_CONSTANTS from "@/config/queryConfig"
import apiClient from "./apiClient"

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
        queryFn: ({ pageParam }) => apiClient.get("/post/list", { params: { page: pageParam } }),
        getNextPageParam: (lastPage, allPages) => lastPage?.data?.data?.pagination?.hasNextPage
            ? lastPage?.data?.data?.pagination?.currentPage + 1
            : undefined,
        getPreviousPageParam: (firstPage, pages) => firstPage?.data?.prev,
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


// export const usePredefinedCommentsQuery = () => {
//     return useQuery({
//         queryKey: ['predefinedComments'],
//         queryFn: () => postService.getPredefinedComments(),
//         keepPreviousData: true,
//         staleTime: QUERY_CONSTANTS.staletime
//     })
// }

// export const useLastMonthAchieversQuery = () => {
//     return useInfiniteQuery({
//         queryKey: ['lastMonthAchievers'],
//         queryFn: ({ pageParam=1 }) => postService.lastMonthAchievers({ page: pageParam }),
//         getNextPageParam: (lastPage, allPages) => lastPage?.data?.pagination?.hasNextPage
//             ? lastPage?.data?.pagination?.currentPage + 1
//             : undefined,
//         initialPageParam: 1,
//         keepPreviousData: true,
//         staleTime: QUERY_CONSTANTS.staletime
//     })
// }