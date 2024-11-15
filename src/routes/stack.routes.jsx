import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '../screens/LoginScreen'
import CadastroScreen from '../screens/CadastroScreen'
import InfoPerfil from '../screens/InfoPerfil'
import DrawerNavigation from './drawer.routes'
import SobreNosScreen from '../screens/SobreNosScreen'


const Stack = createNativeStackNavigator()

export default function StackNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Cadastro' component={CadastroScreen}/>
      <Stack.Screen name='Home' component={DrawerNavigation} options={{ headerShown: false }}/>
      <Stack.Screen name='InfoPerfil' component={InfoPerfil}/>
      <Stack.Screen name='SobreNos' component={SobreNosScreen}/>
    </Stack.Navigator>
  )
}