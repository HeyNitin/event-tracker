import { View, TextInput, StyleSheet, Pressable, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useEvents } from '../store/eventStore';
import { useTheme } from '../store/themeStore';

export default function AddEvent() {
  const [name, setName] = useState('');
  const router = useRouter();
  const { addEvent } = useEvents();
  const { colors } = useTheme();

  const handleSave = async () => {
    if (!name.trim()) return;
    await addEvent(name.trim());
    router.back();
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.content}>
        <Text style={[styles.label, { color: colors.text }]}>Event Name</Text>
        <TextInput
          style={[styles.input, { 
            backgroundColor: colors.inputBackground, 
            borderColor: colors.inputBorder,
            color: colors.text
          }]}
          placeholder="e.g., Drink Water, Exercise"
          placeholderTextColor={colors.textSecondary}
          value={name}
          onChangeText={setName}
          autoFocus
          returnKeyType="done"
          onSubmitEditing={handleSave}
        />
        
        <Pressable 
          style={[
            styles.button, 
            { backgroundColor: colors.tint },
            !name.trim() && { backgroundColor: colors.border }
          ]} 
          onPress={handleSave}
          disabled={!name.trim()}
        >
          <Text style={[styles.buttonText, !name.trim() && { color: colors.textSecondary }]}>Create Event</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    gap: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    fontSize: 18,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  button: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
