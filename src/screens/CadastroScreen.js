import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, ScrollView } from "react-native";
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
      console.log(jsonData)

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
  };

  return (
    <ScrollView>
      <View>
        <Text>Cadastro de Empresa</Text>
        <TextInput
          placeholder="Nome da empresa"
          value={nomeEmpresa}
          onChangeText={setNomeEmpresa}
        />
        
        <TextInput
          placeholder="CNPJ"
          value={cnpj}
          onChangeText={setCnpj}
        />
        
        <TextInput
          placeholder="Inscrição Estadual"
          value={inscricaoEstadual}
          onChangeText={setInscricaoEstadual}
        />
        
        <TextInput
          placeholder="Razão Social"
          value={razaoSocial}
          onChangeText={setRazaoSocial}
        />
        
        <TextInput
          placeholder="Porte (Grande/Média/Pequena)"
          value={porte}
          onChangeText={setPorte}
        />
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
        <TextInput
          placeholder="cep"
          value={cep}
          onChangeText={setCep}
        />
        <TextInput
          placeholder="endereço"
          value={endereco}
          onChangeText={setEndereco}
        />
        <TextInput
          placeholder="bairro"
          value={bairro}
          onChangeText={setBairro}
        />
        <TextInput
          placeholder="estado"
          value={estado}
          onChangeText={setEstado}
        />
        <TextInput
          placeholder="contato"
          value={contato}
          onChangeText={setContato}
        />
        
        <Button title="Cadastrar" onPress={handleSubmit} />
      </View>
    </ScrollView>
    
  );
};

export default CadastroScreen;
