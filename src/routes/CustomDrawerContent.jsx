import React from 'react';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { useAuth } from '../context.js/AuthContext';
import { getAuth, signOut } from 'firebase/auth';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAuaTWUZkH4W0TlK0KMrSUThAXGu-TgNfc",
    authDomain: "ecometric-e1483.firebaseapp.com",
    projectId: "ecometric-e1483",
    storageBucket: "ecometric-e1483.firebasestorage.app",
    messagingSenderId: "973015950805",
    appId: "1:973015950805:web:266878f753d05d6928495c",
    measurementId: "G-Z7HBZ5V4FT"
};

const CustomDrawerContent = (props) => {
    const { user, setUser } = useAuth();
    const app = initializeApp(firebaseConfig)
    const auth = getAuth(app)

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                setUser(null)
                props.navigation.navigate('Login');
            })
            .catch(error => {
                console.log(error);
            })
    }

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Sair"
        onPress={handleSignOut}
      />
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
