import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View, Alert } from "react-native"
import { useAuth } from "../context.js/AuthContext"
import { useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import { initializeApp } from "firebase/app";
import axios from "axios";

const firebaseConfig = {
    apiKey: "AIzaSyAuaTWUZkH4W0TlK0KMrSUThAXGu-TgNfc",
    authDomain: "ecometric-e1483.firebaseapp.com",
    projectId: "ecometric-e1483",
    storageBucket: "ecometric-e1483.firebasestorage.app",
    messagingSenderId: "973015950805",
    appId: "1:973015950805:web:266878f753d05d6928495c",
    measurementId: "G-Z7HBZ5V4FT"
  };

const InfoPerfil = ({navigation}) => {
    const { user } = useAuth();
    const [ empresa, setEmpresa] = useState([]);
    const [nomeEmpresa, setNomeEmpresa] = useState('');
    const [razaoSocial, setRazaoSocial] = useState('');
    const [porte, setPorte] = useState('');
    const [emailAtualizado, setEmail] = useState('');
    const [senhaAtualizada, setSenha] = useState('');
    const [cep, setCep] = useState('');
    const [endereco, setEndereco] = useState('');
    const [bairro, setBairro] = useState('');
    const [estado, setEstado] = useState('');
    const [contato, setContato] = useState('');
    const [newUser, setNewUser] = useState(null);
    const app = initializeApp(firebaseConfig)
    const auth = getAuth(app)

    useEffect(() => {
        fetchEmpresas();
    }, []);
    
    const fetchEmpresas = async () => {
        try {
            const emailuser = user.email
            const response = await axios.get(`http://10.0.2.2:8080/cadastro/${emailuser}`);
            setEmpresa(response.data);
            
        } catch (error) {
            console.error('Erro ao carregar os dados da empresa:', error.message);
        }
    };

    if (!user) {
        navigation.navigate("Login");
        return null;
    }

    const handleAtualizar = async () => {

        try {

            id = empresa.id
            const data = {
              nomeEmpresa: nomeEmpresa,
              razaoSocial: razaoSocial,
              porte: porte,
              email : emailAtualizado,
              senha: senhaAtualizada,
              cep : cep,
              endereco : endereco,
              bairro : bairro,
              estado: estado,
              contato: contato,
            };
      
    
          const jsonData = JSON.stringify(data);
    
          const config = {
            headers: { 'Content-Type': 'application/json' },
            timeout: 60000
          };
          
          const response = await axios.put(`http://10.0.2.2:8080/cadastro/${id}`, jsonData, config);
    
          console.log('Resposta recebida:', response.data);
          console.log('Status:', response.status);
          console.log('Status texto:', response.statusText);
    
          createUserWithEmailAndPassword(auth, emailAtualizado, senhaAtualizada)
          .then(userCredential => {
            setNewUser(userCredential.user);
          })
          .catch(error => {
            console.error('Erro ao criar usuário:', error);
          });
    
          Alert.alert('Sucesso', 'Dados cadastrados com sucesso!');
          resetForm();
          navigation.navigate("Login")
    
        } catch (error) {
          console.error('Erro ao enviar dados:', error.message);
        }
      };

      const handleApagar = async () => {

        try {

            id = empresa.id
      
          const config = {
            headers: { 'Content-Type': 'application/json' },
            timeout: 60000
          };
          
          const response = await axios.delete(`http://10.0.2.2:8080/cadastro/${id}`, config);
    
          console.log('Resposta recebida:', response.data);
          console.log('Status:', response.status);
          console.log('Status texto:', response.statusText);

          Alert.alert('Sucesso', 'Conta apagada!');
          resetForm();
          navigation.navigate("Login")
    
        } catch (error) {
          console.error('Erro ao enviar dados:', error.message);
        }
      };
    
      const resetForm = () => {
        setNomeEmpresa('');
        setRazaoSocial('');
        setPorte('');
        setEmail('');
        setSenha('');
        setCep('');
        setEndereco('');
        setBairro('');
        setEstado('');
        setEstado('');
        setContato('');
      };
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>
                <   View>
                        <Text style={styles.title1}>Olá, </Text>
                        <Text style={styles.title2}>{empresa.nomeEmpresa}</Text>  
                        <Text style={styles.title3}>ATUALIZE SEUS DADOS CADASTRAIS</Text> 
                    </View>
                    <Text style={styles.text1}>Nome Atual da Empresa: {empresa.nomeEmpresa}</Text>
                    <Text style={styles.text}>Novo nome da empresa</Text>
                    <TextInput
                    placeholder="nome da empresa"
                    value={nomeEmpresa}
                    onChangeText={setNomeEmpresa}
                    style={styles.input}
                    />
                    <Text style={styles.text1}>Razão Social Atual da Empresa: {empresa.razaoSocial}</Text>
                    <Text style={styles.text}>Nova razão Social</Text>
                    <TextInput
                    placeholder="razão social"
                    value={razaoSocial}
                    onChangeText={setRazaoSocial}
                    style={styles.input}
                    />
                    <Text style={styles.text1}>Porte Atual da Empresa: {empresa.porte}</Text>
                    <Text style={styles.text}>Novo porte</Text>
                    <TextInput
                    placeholder="porte (Grande/Média/Pequena)"
                    value={porte}
                    onChangeText={setPorte}
                    style={styles.input}
                    />
                    <Text style={styles.text1}>E-mail Atual da Empresa: {empresa.email}</Text>
                    <Text style={styles.text}>Novo e-mail</Text>
                    <TextInput
                    placeholder="email"
                    value={emailAtualizado}
                    onChangeText={setEmail}
                    style={styles.input}
                    />
                    <Text style={styles.text3}>Nova Senha</Text>
                    <TextInput
                    secureTextEntry
                    placeholder="senha"
                    value={senhaAtualizada}
                    onChangeText={setSenha}
                    style={styles.input}
                    />
                    <Text style={styles.text1}>CEP Atual da Empresa: {empresa.cep}</Text>
                    <Text style={styles.text}>Novo CEP</Text>
                    <TextInput
                    placeholder="cep"
                    value={cep}
                    onChangeText={setCep}
                    style={styles.input}
                    />
                    <Text style={styles.text1}>Logradouro Atual da Empresa: {empresa.endereco}</Text>
                    <Text style={styles.text}>Novo logradouro</Text>
                    <TextInput
                    placeholder="logradouro"
                    value={endereco}
                    onChangeText={setEndereco}
                    style={styles.input}
                    />
                    <Text style={styles.text1}>Bairro Atual da Empresa: {empresa.bairro}</Text>
                    <Text style={styles.text}>Novo bairro</Text>
                    <TextInput
                    placeholder="bairro"
                    value={bairro}
                    onChangeText={setBairro}
                    style={styles.input}
                    />
                    <Text style={styles.text1}>Estado Atual da Empresa: {empresa.estado}</Text>
                    <Text style={styles.text}>Novo estado</Text>
                    <TextInput 
                    placeholder="estado"
                    value={estado}
                    onChangeText={setEstado}
                    style={styles.input}
                    />
                    <Text style={styles.text1}>Contato Atual da Empresa: {empresa.contato}</Text>
                    <Text style={styles.text}>Novo contato</Text>
                    <TextInput
                    placeholder="contato"
                    value={contato}
                    onChangeText={setContato}
                    style={styles.input}
                    />

                    <Pressable
                    style={({ pressed }) => [
                        styles.button2,
                        { backgroundColor: pressed ? '#98E4FF' : '#687EFF' } 
                        ]}
                        onPress={handleAtualizar}
                    >
                    <Text style={styles.buttonText}>ATUALIZAR</Text>
                    </Pressable>
                    <Pressable
                    style={({ pressed }) => [
                        styles.button2,
                        { backgroundColor: pressed ? '#98E4FF' : '#687EFF' } 
                        ]}
                        onPress={handleApagar}
                    >
                    <Text style={styles.buttonText}>APAGAR CONTA</Text>
                    </Pressable>

                    <Pressable
                    style={({ pressed }) => [
                        styles.button,
                        { backgroundColor: pressed ? '#98E4FF' : '#687EFF' } 
                        ]}
                        onPress={() => navigation.navigate("Perfil")}
                    >
                    <Text style={styles.buttonText}>VOLTAR PARA O PERFIL</Text>
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
    title1: { 
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
    title3: { 
        fontSize: 25, 
        fontWeight: 'bold', 
        marginBottom: 20, 
        color: '#E4FBFF',
        textAlign:'center'
    },
    text: { 
      fontSize: 15, 
      color: '#98E4FF' 
    },
    text1: { 
        fontSize: 15, 
        color: '#98E4FF',
        marginBottom: 15,
        marginTop: 15
      },
      text3: { 
        fontSize: 15, 
        color: '#98E4FF',
        marginBottom: 15,
        marginTop: 30
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
    button2: {
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      marginTop: 20
    },
    button: {
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      marginBottom: 20,
      marginTop: 20
    },
    buttonText: {
      color: '#FFF',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

export default InfoPerfil