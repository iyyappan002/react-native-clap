import apiClient from "@/api/apiClient";
import { Pagination, Post } from "@/types/postTypes";
import { AxiosRequestConfig } from "axios";

const postService = {
    async getPosts(config?: AxiosRequestConfig<any> | undefined): Promise<{ posts: Post[], pagination: Pagination }> {
        const response = await apiClient.get(`/post/list`, config);
        return {
            pagination: response?.data?.data?.pagination,
            posts: response?.data?.data?.posts,
        };
    },
}

export default postService;