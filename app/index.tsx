import { useAuth } from '@clerk/clerk-expo';
import { Redirect } from 'expo-router';

const Page = () => {
  const { isSignedIn } = useAuth();

  if (isSignedIn) return <Redirect href="/(tabs)" />;

  return <Redirect href="/(auth)/sign-in" />;
};

export default Page;
