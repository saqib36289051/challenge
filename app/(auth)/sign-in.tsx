import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import { useSignIn } from '@clerk/clerk-expo';
import { Button } from '@/components/Button';
import { useRouter } from 'expo-router';

const SignIn = () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace('/(tabs)');
      } else {
        console.log(JSON.stringify(signInAttempt, null, 2));
        Alert.alert('Error', 'Log in failed. Please try again.');
      }
    } catch (err: any) {
      console.log(JSON.stringify(err, null, 2));
      Alert.alert('Error', err.errors[0].longMessage);
    }
  }, [isLoaded, form]);

  return (
    <View>
      <Text>SignIn</Text>
      <TextInput
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.nativeEvent.text })}
        placeholder="Email"
      />
      <TextInput
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.nativeEvent.text })}
        placeholder="Password"
        secureTextEntry={true}
      />
      <Button title="sing-in" onPress={onSignInPress} />
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({});
