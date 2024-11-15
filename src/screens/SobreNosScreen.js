import { Image, SafeAreaView, ScrollView, StyleSheet, Text } from "react-native";

const SobreNosScreen = ({ navigation }) => {

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Text style={styles.title}>IDÉIA DO PROJETO:</Text>
                <Text style={styles.text}>O EcoMetric é um sistema de análise e monitoramento energético que ajuda pequenas e médias empresas a identificar disperdícios e reduzir custos.</Text>
                <Text style={styles.text}>A plataforma fornece um mapeamento detalhado  sobre o cunsumo de energia por meio de um gráfico, e recomenda possíveis projetos a serem implementados para a melhora da eficiência energética.</Text>
                <Text style={styles.text}>Com foco na sustentabilidade, e EcoMetric apoia as empresas na implementação de práticas mais econômicas e ambientalmente responsáveis.</Text>
                <Text style={styles.title}>INTEGRANTES:</Text>
                <Image source={{ uri: "https://media.licdn.com/dms/image/v2/D4D22AQGwmsY-OcHx5w/feedshare-shrink_1280/feedshare-shrink_1280/0/1695944699774?e=1734566400&v=beta&t=4SknxExkyLvm7ZUwsInw2CSdcuLE3yf0tFt3Ue7h0pg" }} style={styles.fotoIntegrantes} />
                <Text style={styles.text}>BRUNO CICCIO -RM 99097</Text>
                <Text style={styles.text}>ISABELLE CORSI-RM97751</Text>
                <Text style={styles.text}>JOSÉ LUIZ DUARTE-RM99488</Text>
                <Text style={styles.text}>MARINA CUCCO-RM551569</Text>
                <Text style={styles.text}>THALITA DE ALENCAR-RM99292</Text>
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
        marginTop: 20,
        color: '#E4FBFF'
    },
    fotoIntegrantes: {
        width: '100%',
        height: 350,
        marginTop: 20,
        marginBottom: 20,
    },
    text :{
        fontSize: 20,
        marginBottom: 20,
        color: '#E4FBFF'
    }
})

export default SobreNosScreen