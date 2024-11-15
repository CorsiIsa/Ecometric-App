import React, { useState } from "react";
import { View, Text, TextInput, Alert, ScrollView, StyleSheet, Pressable} from "react-native";
import { getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import axios from "axios";
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


const CadastroScreen = ({navigation}) => {
  const [nomeEmpresa, setNomeEmpresa] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [inscricaoEstadual, setInscricaoEstadual] = useState('');
  const [razaoSocial, setRazaoSocial] = useState('');
  const [porte, setPorte] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');
  const [bairro, setBairro] = useState('');
  const [estado, setEstado] = useState('');
  const [contato, setContato] = useState('');
  const [newUser, setNewUser] = useState(null);
  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)

  
  const handleSubmit = async () => {

    try {
        const data = {
          nomeEmpresa: nomeEmpresa,
          nrCnpj: cnpj,
          incricaoEstadual: inscricaoEstadual,
          razaoSocial: razaoSocial,
          porte: porte,
          email : email,
          senha: senha,
          cep : cep,
          endereco : endereco,
          bairro : bairro,
          estado: estado,
          contato: contato,
        };
  

      const jsonData = JSON.stringify(data);

      const config = {
        baseURL: 'http://10.0.2.2:8080',
        url: '/cadastro',
        headers: { 'Content-Type': 'application/json' },
        timeout: 60000
      };

      const response = await axios.post(config.url, jsonData, config);

      console.log('Resposta recebida:', response.data);
      console.log('Status:', response.status);
      console.log('Status texto:', response.statusText);

      createUserWithEmailAndPassword(auth, email, senha)
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

  const resetForm = () => {
    setNomeEmpresa('');
    setCnpj('');
    setInscricaoEstadual('');
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
    <ScrollView >
      <View style={styles.container}>
        <Text style={styles.title} >CADASTRO EMPRESA</Text>
        <Text style={styles.text}>Nome da empresa</Text>
        <TextInput
          placeholder="nome da empresa"
          value={nomeEmpresa}
          onChangeText={setNomeEmpresa}
          style={styles.input}
        />
        <Text style={styles.text} >Número do CNPJ</Text>
        <TextInput
          placeholder="CNPJ"
          value={cnpj}
          onChangeText={setCnpj}
          style={styles.input}
        />
        <Text style={styles.text}>Inscrição estadual</Text>
        <TextInput
          placeholder="inscrição estadual"
          value={inscricaoEstadual}
          onChangeText={setInscricaoEstadual}
          style={styles.input}
        />
        <Text style={styles.text}>Razão Social</Text>
        <TextInput
          placeholder="razão social"
          value={razaoSocial}
          onChangeText={setRazaoSocial}
          style={styles.input}
        />
        <Text style={styles.text}>Porte</Text>
        <TextInput
          placeholder="porte (Grande/Média/Pequena)"
          value={porte}
          onChangeText={setPorte}
          style={styles.input}
        />
        <Text style={styles.text}>E-mail</Text>
        <TextInput
          placeholder="email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <Text style={styles.text}>Senha</Text>
        <TextInput
          secureTextEntry
          placeholder="senha"
          value={senha}
          onChangeText={setSenha}
          style={styles.input}
        />
        <Text style={styles.text}>CEP</Text>
        <TextInput
          placeholder="cep"
          value={cep}
          onChangeText={setCep}
          style={styles.input}
        />
        <Text style={styles.text}>Logradouro</Text>
        <TextInput
          placeholder="logradouro"
          value={endereco}
          onChangeText={setEndereco}
          style={styles.input}
        />
        <Text style={styles.text}>Bairro</Text>
        <TextInput
          placeholder="bairro"
          value={bairro}
          onChangeText={setBairro}
          style={styles.input}
        />
        <Text style={styles.text}>Estado</Text>
        <TextInput
          placeholder="estado"
          value={estado}
          onChangeText={setEstado}
          style={styles.input}
        />
        <Text style={styles.text}>Contato</Text>
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
            onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>CADASTRAR</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: pressed ? '#98E4FF' : '#687EFF' } 
            ]}
            onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.buttonText}>VOLTAR PARA O LOGIN</Text>
        </Pressable>
      </View>
    </ScrollView>
    
  );
};
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
    marginTop: 20, 
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
export default CadastroScreen;
