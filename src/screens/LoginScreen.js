import { SafeAreaView, ScrollView, View, Text, TextInput, Button } from "react-native"
import { getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { useState } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyAuaTWUZkH4W0TlK0KMrSUThAXGu-TgNfc",
  authDomain: "ecometric-e1483.firebaseapp.com",
  projectId: "ecometric-e1483",
  storageBucket: "ecometric-e1483.firebasestorage.app",
  messagingSenderId: "973015950805",
  appId: "1:973015950805:web:266878f753d05d6928495c",
  measurementId: "G-Z7HBZ5V4FT"
};

const LoginScreen = ({navigation}) =>{
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [newUser, setNewUser] = useState(null);

    const handleLogin = () => {
      signInWithEmailAndPassword(auth, email, senha)
        .then(userCredential => {
          setNewUser(userCredential.user);
          setEmail('');
          setSenha('');
          navigation.navigate("Home")
        })
        .catch(error => {
          console.error('Erro ao fazer login:', error);
        });
    };
    return (
        <SafeAreaView>
            <ScrollView>
                <View>
                <TextInput
                  placeholder="Email"
                  value={email}
                  onChangeText={setEmail}
                />
                <TextInput
                  placeholder="Senha"
                  value={senha}
                  onChangeText={setSenha}
                />
                    <Button title="Login" onPress={handleLogin}/>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default LoginScreen