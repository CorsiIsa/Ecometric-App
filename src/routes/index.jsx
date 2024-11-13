import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './stack.routes';
import { AuthProvider } from '../context.js/AuthContext';

export default function Routes() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    </AuthProvider>
  );
}