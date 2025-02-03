import { useMutation, useQueryClient } from "react-query";
import apiClient from "./apiClient";

export const useLoginMutation = () => useMutation({
    mutationFn: (request) => apiClient.post('/login', request)
})