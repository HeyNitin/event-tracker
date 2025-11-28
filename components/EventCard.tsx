import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withSequence } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { Trash2, Minus } from 'lucide-react-native';
import { Event } from '../store/eventStore';
import { useTheme } from '../store/themeStore';

interface EventCardProps {
  event: Event;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onDelete: (id: string) => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const EventCard: React.FC<EventCardProps> = ({ event, onIncrement, onDecrement, onDelete }) => {
  const { colors } = useTheme();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePress = () => {
    scale.value = withSequence(
      withSpring(0.95, { damping: 10 }),
      withSpring(1, { damping: 10 })
    );
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onIncrement(event.id);
  };

  const handleDecrement = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onDecrement(event.id);
  };

  const handleDelete = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    onDelete(event.id);
  };

  return (
    <AnimatedPressable 
      style={[styles.card, animatedStyle, { backgroundColor: colors.card }]} 
      onPress={handlePress}
    >
      <View style={styles.content}>
        <Text style={[styles.name, { color: colors.text }]}>{event.name}</Text>
        <Text style={[styles.count, { color: colors.tint }]}>{event.count}</Text>
      </View>
      
      <View style={styles.actions}>
        <Pressable 
          onPress={handleDecrement} 
          style={[styles.actionButton, { backgroundColor: colors.inputBackground }]} 
          hitSlop={10}
        >
          <Minus size={20} color={colors.textSecondary} />
        </Pressable>
        <Pressable 
          onPress={handleDelete} 
          style={[styles.actionButton, { backgroundColor: colors.danger + '20' }]} 
          hitSlop={10}
        >
          <Trash2 size={20} color={colors.danger} />
        </Pressable>
      </View>
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  count: {
    fontSize: 32,
    fontWeight: '700',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  actionButton: {
    padding: 8,
    borderRadius: 20,
  },
});
