import { useOAuth } from '@clerk/clerk-expo';
import { router } from 'expo-router';
import { Alert, LogBox, Text, View } from 'react-native';
import { googleOAuth } from '@/lib/auth';
import { Button } from './Button';

const OAuth = () => {
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });

  const handleGoogleSignIn = async () => {
    const result = await googleOAuth(startOAuthFlow);

    if (result.code === 'session_exists') {
      Alert.alert('Success', 'Session exists. Redirecting to home screen.');
      router.replace('/(tabs)');
    }

    Alert.alert(result.success ? 'Success' : 'Error', result.message);
  };

  LogBox.ignoreLogs(["Clerk:"]);

  return (
    <View>
      <View className="mt-4 flex flex-row items-center justify-center gap-x-3">
        <View className="bg-general-100 h-[1px] flex-1" />
        <Text className="text-lg">Or</Text>
        <View className="bg-general-100 h-[1px] flex-1" />
      </View>

      <Button title="Log In with Google" onPress={handleGoogleSignIn} />
    </View>
  );
};

export default OAuth;
