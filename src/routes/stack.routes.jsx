import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TabNavigation from './tabs.routes'
import LoginScreen from '../screens/LoginScreen'
import CadastroScreen from '../screens/CadastroScreen'
import InfoPerfil from '../screens/InfoPerfil'


const Stack = createNativeStackNavigator()

export default function StackNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Login' component={LoginScreen}/>
      <Stack.Screen name='Cadastro' component={CadastroScreen}/>
      <Stack.Screen name='Home' component={TabNavigation}/>
      <Stack.Screen name='InfoPerfil' component={InfoPerfil}/>
    </Stack.Navigator>
  )
}