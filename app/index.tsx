import { useState } from 'react';
import { View, FlatList, StyleSheet, Pressable, Text } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Plus } from 'lucide-react-native';
import { useEvents } from '../store/eventStore';
import { EventCard } from '../components/EventCard';
import { ConfirmModal } from '../components/ConfirmModal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../store/themeStore';

export default function Home() {
  const router = useRouter();
  const { events, incrementEvent, decrementEvent, deleteEvent } = useEvents();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const handleDeleteRequest = (id: string) => {
    setSelectedEventId(id);
    setDeleteModalVisible(true);
  };

  const confirmDelete = async () => {
    if (selectedEventId) {
      await deleteEvent(selectedEventId);
      setDeleteModalVisible(false);
      setSelectedEventId(null);
    }
  };

  const cancelDelete = () => {
    setDeleteModalVisible(false);
    setSelectedEventId(null);
  };

  const selectedEvent = events.find(e => e.id === selectedEventId);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen options={{ title: 'My Events' }} />
      
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: insets.bottom + 80 }
        ]}
        renderItem={({ item }) => (
          <EventCard
            event={item}
            onIncrement={incrementEvent}
            onDecrement={decrementEvent}
            onDelete={handleDeleteRequest}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={[styles.emptyText, { color: colors.text }]}>No events yet</Text>
            <Text style={[styles.emptySubtext, { color: colors.textSecondary }]}>Tap + to add your first event</Text>
          </View>
        }
      />

      <Pressable 
        style={[styles.fab, { bottom: insets.bottom + 20, backgroundColor: colors.tint, shadowColor: colors.tint }]}
        onPress={() => router.push('/add')}
      >
        <Plus color="white" size={32} />
      </Pressable>

      <ConfirmModal
        visible={deleteModalVisible}
        title="Delete Event?"
        message={`Are you sure you want to delete '${selectedEvent?.name}'? This cannot be undone.`}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 16,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
  },
  fab: {
    position: 'absolute',
    right: 20,
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 999,
  },
});
