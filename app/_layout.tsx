import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function RootLayout() {
  return <QueryClientProvider client={queryClient}>
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  </QueryClientProvider>
}
