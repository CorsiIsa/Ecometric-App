import { Button, FlatList, Text, View } from "react-native";
import axios from "axios";
import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { collection,deleteDoc, addDoc, getFirestore, doc, query, where,getDocs } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAuaTWUZkH4W0TlK0KMrSUThAXGu-TgNfc",
    authDomain: "ecometric-e1483.firebaseapp.com",
    projectId: "ecometric-e1483",
    storageBucket: "ecometric-e1483.firebasestorage.app",
    messagingSenderId: "973015950805",
    appId: "1:973015950805:web:266878f753d05d6928495c",
    measurementId: "G-Z7HBZ5V4FT"
  };


const HomeScreen = ({ navigation }) => {
    const [projeto, setProjeto] = useState([]);
    const [monitoramento, setMonitoramento] = useState([]);
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    useEffect(() => {
        fetchProjetos();
    }, []);
    useEffect(() => {
        fetchMonitoramento();
    }, []);

    const fetchProjetos = async () => {
        try {
            const response = await axios.get('http://10.0.2.2:8080/projetos');
            console.log('Resposta dos Projetos:', response.data);
            setProjeto(response.data);
        } catch (error) {
            console.error('Erro ao carregar os Projetos:', error.message);
        }
    };

    const fetchMonitoramento = async () => {
        try {
            const response = await axios.get('http://10.0.2.2:8080/monitoramento');
            console.log('Resposta monitoramento:', response.data);
            setMonitoramento(response.data);
        } catch (error) {
            console.error('Erro ao carregar os Projetos:', error.message);
        }
    };

    async function handleSelectedProjeto(idProjeto) {
        try {
            const projetoSelecionado = await axios.get(`http://10.0.2.2:8080/projetos/${idProjeto}`);
            console.log('Dados do projeto recebidos:', projetoSelecionado.data);
            
            await saveProjetoToFirebase(projetoSelecionado.data);
            
            setProjeto(projetos => 
                projetos.filter(p => p.id !== idProjeto)
            );
        } catch (error) {
            console.error("Erro ao salvar o projeto:", error);
        }
    }

      async function saveProjetoToFirebase(projeto) {
        try {
          const docRef = await addDoc(collection(db, "projetos"), {
            id: projeto.id,
            nome: projeto.nome,
            descricaoIdeia : projeto.descricaoIdeia,
            pontosMelhorias : projeto.pontosMelhorias,
            porcentagemMelhoria : projeto.porcentagemMelhoria
          });
          console.log("Documento criado com o id: ", docRef.id);
        } catch (error) {
          console.error("Erro ao adicionar o documento", error);
        }
      }
    return (
        <View>
            <Text>Monitoramentos:</Text>
            {monitoramento.map((item, index) => (
                <View key={index}>
                    <Text>Data de Emissão:</Text>
                    <Text>{item.dataEmissao}</Text>

                    <Text>Porcentagem de Diferença:</Text>
                    <Text>{item.porcentagemDiferenca}%</Text>

                    <Text>Melhoria Total:</Text>
                    <Text>{item.melhoriaTotal}</Text>

                    <Text>Status do Monitoramento:</Text>
                    <Text>{item.stMonitoramento}</Text>
                </View>
            ))}
            <FlatList 
                data={projeto}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.nome}</Text>
                        <Text>{item.descricaoIdeia}</Text>
                        <Text>{item.pontosMelhorias}</Text>
                        <Text>{item.porcentagemMelhoria}</Text>
                        <Button 
                            title="adicionar" 
                            onPress={() => handleSelectedProjeto(item.id)}
                            style={{marginLeft: 10}}
                        />
                    </View>
                    
                )}
            />
        </View>
    );
};

export default HomeScreen;
