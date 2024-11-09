import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CadastroScreen from './src/screens/CadastroScreen';
import LoginScreen from './src/screens/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator()

const AppStack = () => {
  return(
    <Stack.Navigator>
      <Stack.Screen name='Cadastro' component={CadastroScreen}/>
      <Stack.Screen name='Login' component={LoginScreen}/>
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <AppStack/>
    </NavigationContainer>
  );
}