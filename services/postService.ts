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

    async likePost(request: any) {
        const response = await apiClient.post(`/post/like`, request);
        return response.data;
    },

    async postView(request:any) {
        const response = await apiClient.post(`/post/view`, request);
        return response.data;
    },

    async searchMentions(query :any) {
        const response = await apiClient.get(`/users/search?query=${encodeURIComponent(query)}`);
        return response.data;
    },

    async createPost(postData :any) {
        const response = await apiClient.post('/posts/create', postData);
        return response.data;
    },

    async getPredefinedComments() {
    const response = await apiClient.post(`/comment/dropdown`);
    return response.data;
    },
}

export default postService;