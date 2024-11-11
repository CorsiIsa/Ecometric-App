import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Feather } from '@expo/vector-icons'
import HomeScreen from '../screens/HomeScreen'
import PerfilScreen from '../screens/PerfilScreen'
import ProjetosFavScreen from '../screens/ProjetosFavScreen'

const TabNavigator = createBottomTabNavigator()

export default function TabNavigation() {
  return (
    <TabNavigator.Navigator>
      <TabNavigator.Screen name='HomeInitial' component={HomeScreen} options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => <Feather name='home' size={size} color={color} />
      }} />
      <TabNavigator.Screen name='ProjetosFav' component={ProjetosFavScreen} options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => <Feather name='book' size={size} color={color} />
      }} />
      <TabNavigator.Screen name='Perfil' component={PerfilScreen} options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => <Feather name='user' size={size} color={color} />
      }} />
      
    </TabNavigator.Navigator>
  )
}