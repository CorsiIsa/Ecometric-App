import { SafeAreaView, ScrollView, View, Text, TextInput, StyleSheet, Pressable, Alert } from "react-native"
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
          Alert.alert('Erro', 'E-mail ou senha invalidos.');
          console.error('Erro ao fazer login:', error);
        });
    };
    
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
              <Text style={styles.title}>LOGIN</Text>
              <View >
                <Text style={styles.text}>E-mail</Text>
                <TextInput
                  placeholder="Email"
                  value={email}
                  onChangeText={setEmail}
                  style={styles.input}
                />
                <Text style={styles.text}>Senha</Text>
                <TextInput
                  secureTextEntry
                  placeholder="Senha"
                  value={senha}
                  onChangeText={setSenha}
                  style={styles.input}
                />
                <Pressable
                    style={({ pressed }) => [
                        styles.button,
                        { backgroundColor: pressed ? '#98E4FF' : '#687EFF' } 
                    ]}
                    onPress={handleLogin}
                >
                    <Text style={styles.buttonText}>LOGIN</Text>
                </Pressable>
                <Pressable
                    style={({ pressed }) => [
                        styles.button2,
                        { backgroundColor: pressed ? '#98E4FF' : '#687EFF' } 
                    ]}
                    onPress={() => navigation.navigate("Cadastro")}
                >
                    <Text style={styles.buttonText}>CADASTRO</Text>
                </Pressable>
              </View>
            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    padding: 20, 
    backgroundColor: '#071952' 
  },
  title: { 
    fontSize: 25, 
    fontWeight: 'bold', 
    textAlign: 'center',
    marginBottom: 20, 
    marginTop: 150, 
    color: '#E4FBFF'
   },
  text: { 
    fontSize: 15, 
    color: '#98E4FF' 
  },
  input: {
    height: 40,
    borderColor: '#0D92F4', 
    borderWidth: 1,
    marginBottom: 12,
    padding: 10,
    borderRadius: 5,
    color: '#021526', 
    backgroundColor: '#B7E0FF'
  },
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 20
  },
  button2: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
},
});
export default LoginScreen