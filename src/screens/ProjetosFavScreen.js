import { Button, FlatList, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native"
import { initializeApp } from "firebase/app";
import { collection, deleteDoc, addDoc, getFirestore, doc, query, where, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyAuaTWUZkH4W0TlK0KMrSUThAXGu-TgNfc",
  authDomain: "ecometric-e1483.firebaseapp.com",
  projectId: "ecometric-e1483",
  storageBucket: "ecometric-e1483.firebasestorage.app",
  messagingSenderId: "973015950805",
  appId: "1:973015950805:web:266878f753d05d6928495c",
  measurementId: "G-Z7HBZ5V4FT"
};

const ProjetosFavScreen = ({ navigation }) => {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const loadDocuments = async () => {
      try {

        const docRef = await getDocs(collection(db, "projetos"));
        const docs = docRef.docs.map(doc => doc.data());
        setDocuments(docs);
      } catch (error) {
        console.error('Erro ao carregar documentos:', error);
      }
    };

    loadDocuments();
  }, [documents]);

  async function removeSelectedCharacter(IdProjeto) {
    try {
      await removeCharacterFromFirebase(IdProjeto);
    } catch (error) {
      console.error("Erro ao remover o projeto:", error);
    }
  }
  async function removeCharacterFromFirebase(IdProjeto) {
    try {
      const projetoCollection = collection(db, "projetos");
      const docProjeto = query(projetoCollection, where("id", "==", IdProjeto));

      const querySnapshot = await getDocs(docProjeto);
      querySnapshot.forEach((projeto) => {
        console.log(projeto.id, " => ", projeto.data());
        deleteDoc(doc(db, "projetos", projeto.id));
      });

      console.log(`Projeto removido com sucesso: ${IdProjeto}`);
    } catch (error) {
      console.error("Erro ao remover o documento:", error);
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.titleCentral}>PROJETOS FAVORITOS:</Text>
      <FlatList
        data={documents}
        renderItem={({ item }) => (
          <View style={styles.containerProjetos}>
            <View style={styles.containerTituloProjetos}>
              <Text style={styles.titleProjetos}>{JSON.stringify(item.nome)}</Text>
            </View>
            <Text style={styles.textProjetos}>Descrição:</Text>
            <Text>{JSON.stringify(item.descricaoIdeia)}</Text>
            <Text style={styles.textProjetos}>Pontos Melhorias:</Text>
            <Text>{JSON.stringify(item.pontosMelhorias)}</Text>
            <Text style={styles.textProjetos}>Porcentagem melhorias:</Text>
            <Text>{JSON.stringify(item.porcentagemMelhoria)}</Text>
            <Pressable
              style={({ pressed }) => [
                styles.button,
                { backgroundColor: pressed ? '#98E4FF' : '#071952' }
              ]}
              onPress={() => removeSelectedCharacter(item.id)}
            >
              <Text style={styles.buttonText}>REMOVER</Text>
            </Pressable>
          </View>

        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  )
}

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
  titleCentral: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 5,
    color: '#E4FBFF'
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
  textMelhoria: {
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
export default ProjetosFavScreen