import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native"
import { useAuth } from "../context.js/AuthContext"
import { useEffect, useState } from "react";
import axios from "axios";
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

const PerfilScreen = ({ navigation }) => {
    const { user, setUser } = useAuth();
    const [empresa, setEmpresa] = useState([]);
    const app = initializeApp(firebaseConfig)
    const auth = getAuth(app)

    useEffect(() => {
        fetchEmpresas();
    }, []);

    const fetchEmpresas = async () => {
        try {
            const email = user.email
            const response = await axios.get(`http://10.0.2.2:8080/cadastro/${email}`);
            setEmpresa(response.data);

        } catch (error) {
            console.error('Erro ao carregar os dados da empresa:', error.message);
        }
    };

    if (!user) {
        navigation.navigate("Login");
        return null;
    }

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                setUser(null)
            })
            .catch(error => {
                console.log(error);
            })
    }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View>
                    <View>
                        <Text style={styles.title}>Olá, </Text>
                        <Text style={styles.title2}>{empresa.nomeEmpresa}</Text>
                    </View>

                    <Pressable
                        style={({ pressed }) => [
                            styles.button,
                            { backgroundColor: pressed ? '#98E4FF' : '#98E4FF' }
                        ]}
                        onPress={() => navigation.navigate("InfoPerfil")}
                    >
                        <Text style={styles.buttonText}>INFORMAÇÕES DO USUÁRIO</Text>
                        <Text style={styles.text}>Gerencie seu perfil</Text>
                    </Pressable>
                    <Pressable
                        style={({ pressed }) => [
                            styles.button2,
                            { backgroundColor: pressed ? '#98E4FF' : '#98E4FF' }
                        ]}
                        onPress={() => handleSelectedProjeto(item.id)}
                    >
                        <Text style={styles.buttonText}>SOBRE NÓS</Text>
                        <Text style={styles.text}>Saiba um pouco mais</Text>
                    </Pressable>

                    <Pressable
                        style={({ pressed }) => [
                            styles.button3,
                            { backgroundColor: pressed ? '#98E4FF' : '#98E4FF' }
                        ]}
                        onPress={handleSignOut}
                    >
                        <Text style={styles.buttonText2}>SAIR</Text>
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
        marginTop: 15,
        color: '#E4FBFF'
    },
    title2: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#E4FBFF'
    },
    button: {
        padding: 10,
        borderRadius: 5,
        height: 80,
        alignItems: 'center',
        marginTop: 150
    },
    button2: {
        padding: 10,
        borderRadius: 5,
        height: 80,
        alignItems: 'center',
        marginTop: 10
    },
    button3: {
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 170
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        marginTop: 9,
        fontWeight: 'bold',
    },
    text: {
        fontSize: 15,
        color: '#FFF',
    },
    buttonText2: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default PerfilScreen
