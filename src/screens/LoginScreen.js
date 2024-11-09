import { SafeAreaView, ScrollView, View, Text, TextInput, Button } from "react-native"
const LoginScreen = ({navigation}) =>{
    return (
        <SafeAreaView>
            <ScrollView>
                <View>
                    <Text>Nome da Empresa</Text>
                    <TextInput
                      placeholder="Nome da empresa"
                    />
                    <Text>Nº CNPJ</Text>
                    <TextInput
                      placeholder="Número CNPJ"
                    />
                    <Text>Inscrição Estadual</Text>
                    <TextInput
                      placeholder="Inscrição Estadual"
                    />
                    <Text>Razão Social</Text>
                    <TextInput
                      placeholder="Razão Social"
                    />
                    <Text>Porte</Text>
                    <TextInput
                      placeholder="Porte Grande/Média/Pequena"
                    />
                    <Button title="Login" onPress={() => navigation.navigate("Cadastro")}/>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default LoginScreen