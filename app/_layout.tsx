import { Stack } from 'expo-router';
import { View } from 'react-native';
import { EventProvider } from '../store/eventStore';
import { ThemeProvider, useTheme } from '../store/themeStore';
import { ThemeToggle } from '../components/ThemeToggle';

function AppLayout() {
  const { colors } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.card,
        },
        headerShadowVisible: false,
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
          color: colors.text,
        },
        contentStyle: {
          backgroundColor: colors.background,
        },
        headerRight: () => <ThemeToggle />,
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Events' }} />
      <Stack.Screen name="add" options={{ presentation: 'modal', title: 'New Event' }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <EventProvider>
        <View style={{ flex: 1 }}>
          <AppLayout />
        </View>
      </EventProvider>
    </ThemeProvider>
  );
}
