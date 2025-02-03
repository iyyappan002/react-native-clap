import apiClient from "@/api/apiClient";
import { Pagination, Post, LastMonthAchiever } from "@/types/postTypes";
import { AxiosRequestConfig } from "axios";

const postService = {
    async getPosts(config?: AxiosRequestConfig<any> | undefined): Promise<{ posts: Post[], pagination: Pagination }> {
        const response = await apiClient.get(`/post/list`, config);
        return {
            pagination: response?.data?.data?.pagination,
            posts: response?.data?.data?.posts,
        };
    },

    async getLastMonthAchievers(request: any, config?: AxiosRequestConfig<any> | undefined): Promise<{ lastMonthAchievers: LastMonthAchiever[], pagination: Pagination }> {
        const response = await apiClient.post(`/achievers/list`, request, config);
        return {
            pagination: response?.data?.data?.pagination,
            lastMonthAchievers: response?.data?.data?.result,
        };
    },
}

export default postService;