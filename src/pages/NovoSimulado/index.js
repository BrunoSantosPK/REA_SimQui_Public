import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, Picker, AsyncStorage } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Spinner from 'react-native-loading-spinner-overlay';
import { Feather } from "@expo/vector-icons"

// Estilos
import globals from "../Fragments/globalStyles";
import styles from "./styles";

// Componentes personalizados
import AdMob from "../Fragments/AdMob";
import Header from "../Fragments/Header";
import FinalMargin from "../Fragments/FinalMargin";
import ModalDecisao from "../Fragments/ModalDecisao";

// Função de manipulação

// Render
export default function NovoSimulado() {
    // Gerencia o loader
    const [loading, setLoading] = useState(false);

    // Inicialização da página
    const [topicos, setTopicos] = useState([]);
    async function init() {
        setLoading(true);
        let cadastros = await AsyncStorage.getItem("cadastros");
        cadastros = JSON.parse(cadastros);

        // Preenche o select
        const novosTopicos = [];
        cadastros.forEach(item => {
            novosTopicos.push(item.topico);
        });
        setTopicos(novosTopicos);

        setLoading(false);
    }
    useEffect(() => {
        init();
    }, []);

    // Gerencia a navegação
    const nav = useNavigation();
    const callbackVoltar = () => {
        nav.reset({
            index: 0,
            routes: [{ name: "Inicio" }]
        });
    };

    // Gerencia a opção de tópicos
    const [selTopico, setSelTopico] = useState("todos");
    const [selNum, setSelNum] = useState(3);

    // Envia para simulado
    async function criarSimulado() {
        // Salva preferências
        const params = { topico: selTopico, total: selNum };
        await AsyncStorage.setItem("params", JSON.stringify(params));

        // Muda de tela
        nav.reset({
            index: 0,
            routes: [{ name: "Simulado" }]
        });
    }

    return (
        <SafeAreaView style={globals.body}>

            <Header />

            <ScrollView style={[globals.conteudo, globals.telaPrimaria]}>

                <Spinner
                    visible={loading}
                    textContent={"Carregando..."}
                    textStyle={globals.spinnerTextStyle}
                />

                <View style={globals.areaBotaoVoltar}>
                    <TouchableOpacity style={globals.botaoVoltar} onPress={callbackVoltar}>
                        <Feather name="chevrons-left" size={16} color="#fff"></Feather>
                        <Text style={globals.textoBotaoVoltar}>Voltar</Text>
                    </TouchableOpacity>
                </View>

                <Text style={globals.textoLabel}>Selecione o tipo de simulado</Text>
                <Picker
                    selectedValue={selTopico}
                    onValueChange={value => setSelTopico(value)}
                >
                    <Picker.Item label="Aleatório" value="todos" />
                    {topicos.map(topico => (
                        <Picker.Item label={topico} value={topico} />
                    ))}
                </Picker>
                <View style={styles.separador}></View>

                <Text style={globals.textoLabel}>Selecione a quantidade de questões</Text>
                <Picker
                    selectedValue={selNum}
                    onValueChange={value => setSelNum(value)}
                >
                    <Picker.Item label="3 Questões" value="3" />
                    <Picker.Item label="4 Questões" value="4" />
                    <Picker.Item label="5 Questões" value="5" />
                </Picker>
                <View style={styles.separador}></View>

                <TouchableOpacity style={globals.botao} onPress={criarSimulado}>
                    <Text style={globals.textoBotao}>Criar Simulado</Text>
                </TouchableOpacity>

                <FinalMargin />

            </ScrollView>

            <AdMob />

        </SafeAreaView>
    );
}