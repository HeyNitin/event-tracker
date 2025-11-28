import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Sun, Moon } from 'lucide-react-native';
import { useTheme } from '../store/themeStore';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withSequence } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const ThemeToggle = () => {
  const { isDarkMode, toggleTheme, colors } = useTheme();
  const scale = useSharedValue(1);
  const rotation = useSharedValue(270);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { rotate: `${rotation.value}deg` }
      ],
    };
  });

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    scale.value = withSequence(
      withSpring(0.8, { damping: 10 }),
      withSpring(1, { damping: 10 })
    );
    rotation.value = withSpring(rotation.value + 360);
    toggleTheme();
  };

  return (
    <AnimatedPressable onPress={handlePress} style={[styles.container, animatedStyle]}>
      {isDarkMode ? (
        <Moon size={24} color={colors.text} />
      ) : (
        <Sun size={24} color={colors.text} />
      )}
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
});
