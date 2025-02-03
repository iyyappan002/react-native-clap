import { PostProvider } from "@/context/PostContext";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function RootLayout() {
  return <QueryClientProvider client={queryClient}>
    <GestureHandlerRootView>
    <PostProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </PostProvider>
    </GestureHandlerRootView>
  </QueryClientProvider>
}
