import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import axios from "axios";

const CadastroScreen = ({navigation}) => {
  const [nomeEmpresa, setNomeEmpresa] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [inscricaoEstadual, setInscricaoEstadual] = useState('');
  const [razaoSocial, setRazaoSocial] = useState('');
  const [porte, setPorte] = useState('');

  const handleSubmit = async () => {

    try {
        const data = {
          nomeEmpresa: nomeEmpresa,
          nrCnpj: cnpj,
          incricaoEstadual: inscricaoEstadual,
          razaoSocial: razaoSocial,
          porte: porte
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
  };

  return (
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
      
      <Button title="Cadastrar" onPress={handleSubmit} />
    </View>
  );
};

export default CadastroScreen;
