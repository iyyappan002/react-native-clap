import { PostProvider } from "@/context/PostContext";
import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function RootLayout() {
  return <QueryClientProvider client={queryClient}>
    <PostProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </PostProvider>
  </QueryClientProvider>
}
