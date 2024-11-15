import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer'
import { Feather } from '@expo/vector-icons'
import TabNavigation from './tabs.routes'
import CustomDrawerContent from './CustomDrawerContent'

const DrawerNavigator = createDrawerNavigator()

export default function DrawerNavigation() {
    

    return (
        <DrawerNavigator.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}>
            <DrawerNavigator.Screen name='Home' component={TabNavigation} options={{
                drawerIcon: ({ color, size }) => <Feather name='home' size={size} color={color} />
            }} />
        </DrawerNavigator.Navigator>
        
    )
}
