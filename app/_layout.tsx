import { PostProvider } from "@/context/PostContext";
import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function RootLayout() {
  return <QueryClientProvider client={queryClient}>
    <PostProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false, title: "Sign In" }} />
        <Stack.Screen name="posts/index" options={{ headerTitle: "Feeds" }} />
        <Stack.Screen name="posts/create" options={{ headerTitle: "Create Post" }} />
        <Stack.Screen name="posts/[id]" options={{ headerTitle: "Create Post" }} />
      </Stack>
    </PostProvider>
  </QueryClientProvider>
}
