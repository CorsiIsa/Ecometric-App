import { FlatList, Text, View, StyleSheet, Pressable } from "react-native";
import axios from "axios";
import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import GraficoPizza from "../components/graficoPizza";



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
            setProjeto(response.data);
        } catch (error) {
            console.error('Erro ao carregar os Projetos:', error.message);
        }
    };

    const fetchMonitoramento = async () => {
        try {
            const response = await axios.get('http://10.0.2.2:8080/monitoramento');
            setMonitoramento(response.data);
        } catch (error) {
            console.error('Erro ao carregar os Projetos:', error.message);
        }
    };

    async function handleSelectedProjeto(idProjeto) {
        try {
            const projetoSelecionado = await axios.get(`http://10.0.2.2:8080/projetos/${idProjeto}`);
            
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
        <View style={styles.container}>
            <View style={styles.containerMonitoramento}>
                <View style={styles.containerTitulo}>
                    <Text style={styles.title}>Monitoramento</Text>
                </View>
                {monitoramento.map((item, index) => (
                    <View key={index}>
                        <Text>Melhoria Total:</Text>
                        <GraficoPizza item={item.porcentagemDiferenca}/>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.textoStatus}>Status do Monitoramento: {item.stMonitoramento}</Text>
                            <Text style={styles.textoData}>Data de Emissão: {item.dataEmissao}</Text>
                        </View>

                    </View>
                ))}
            </View>
            <Text style={styles.textMelhoria}>Sugestões de projetos que podem aumentar seu índice de melhoria:</Text>
            <FlatList 
                data={projeto}
                 renderItem={({ item }) => (
                    <View style={styles.containerProjetos}>
                        <View style={styles.containerTituloProjetos}>
                        <Text style={styles.titleProjetos}>{item.nome}</Text>
                        </View>
                        <Text style={styles.textProjetos}>Descrição:</Text>
                        <Text>{item.descricaoIdeia}</Text>
                        <Text style={styles.textProjetos}>Pontos Melhorias:</Text>
                        <Text>{item.pontosMelhorias}</Text>
                        <Text style={styles.textProjetos}>Porcentagem melhorias:</Text>
                        <Text>{item.porcentagemMelhoria}</Text>
                        <Pressable
                            style={({ pressed }) => [
                                styles.button,
                                { backgroundColor: pressed ? '#98E4FF' : '#071952' } 
                                ]}
                                onPress={() => handleSelectedProjeto(item.id)}
                            >
                            <Text style={styles.buttonText}>ADICIONAR</Text>
                        </Pressable>
                    </View>
                        
                )}
            />
            </View>
        
    );
};
const styles = StyleSheet.create({
    container: { 
      flex: 1, 
      justifyContent: 'center', 
      padding: 20, 
      backgroundColor: '#071952' 
    },
    containerMonitoramento: {
       backgroundColor: '#F6F6F6',
       borderColor: '#98E4FF',
       borderWidth: 3,
       borderRadius: 10, 
    },
    containerProjetos: {
        backgroundColor: '#F6F6F6',
        borderColor: '#98E4FF',
        borderWidth: 3,
        borderRadius: 10, 
        marginBottom: 15
     },
    containerTitulo: { 
        backgroundColor: '#98E4FF',
        color: '#7AB2D3'
    },
    containerTituloProjetos: { 
        backgroundColor: '#98E4FF',
        color: '#7AB2D3'
    },
    title: { 
      fontSize: 25, 
      fontWeight: 'bold', 
      backgroundColor: '#98E4FF',
      marginTop: 1,
      marginLeft: 2, 
      color: '#071952'
     },
    titleProjetos: { 
        fontSize: 15, 
        fontWeight: 'bold', 
        backgroundColor: '#98E4FF',
        marginTop: 1,
        marginLeft: 2, 
        color: '#071952',
        marginBottom: 5,
        textAlign: 'center'
    },
    textoData: {
        fontSize: 10, 
        textAlign: 'right',
        marginRight: 5,
        color: '#071952'
    },
    textoStatus: {
        fontSize: 10, 
        textAlign: 'left',
        marginLeft: 5,
        marginRight: 5,
        color: '#071952'
    },
    textMelhoria:{
        marginTop: 15, 
        color: '#98E4FF',
        fontSize: 25,
        marginBottom: 10
    },
    textProjetos: {
        color: '#071952'
    },
    button: {
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20
    },
      buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
  });
export default HomeScreen;
