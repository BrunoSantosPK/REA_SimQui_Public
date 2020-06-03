import React from "react";
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons"

// Estilos
import globals from "../Fragments/globalStyles";

// Componentes personalizados
import AdMob from "../Fragments/AdMob";
import Header from "../Fragments/Header";
import FinalMargin from "../Fragments/FinalMargin";

// Função de manipulação

// Render
export default function Sobre() {
    // Gerencia a navegação
    const navegacao = useNavigation();
    const callbackVoltar = () => {
        navegacao.goBack();
    };

    // Conteúdo
    const content = [
        "O SimQui foi feito para gerar baterias de questões de químicas, abordando diversos tópicos. Ainda somos pequenos, então utilizamos um banco de dados provisório. Por isso pedimos compreensão em relação a demora de conexão.\n",
        "Todavia, nosso objetivo é entregar sempre um conteúdo legal. Aqui você pode testar seus conhecimentos em química, podendo escolher uma bateria de questões aleatórias ou apenas de um tópico específico.\n",
        "As questões são formuladas em níveis de dificuldade crescente, sendo o nível 1 o mais fácil. Ainda não temos um nível máximo, mas quanto maior o número que aparecer na sua questão, mais ela te desafiará.\n",
        "No mais, espero que goste desse aplicativo. Dúvidas, sugestões e críticas, pode utilizar os meios de contato disponíveis na página de download."
    ];

    return (
        <SafeAreaView style={globals.body}>

            <Header />

            <ScrollView style={[globals.conteudo, globals.telaPrimaria]}>

                <View style={globals.areaBotaoVoltar}>
                    <TouchableOpacity style={globals.botaoVoltar} onPress={callbackVoltar}>
                        <Feather name="chevrons-left" size={16} color="#fff"></Feather>
                        <Text style={globals.textoBotaoVoltar}>Voltar</Text>
                    </TouchableOpacity>
                </View>

                {content.map(item => (
                    <Text style={globals.textoLabel}>{item}</Text>
                ))}

                <FinalMargin />

            </ScrollView>

            <AdMob />

        </SafeAreaView>
    );
}