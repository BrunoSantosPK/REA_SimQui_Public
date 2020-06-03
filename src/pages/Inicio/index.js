import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, AsyncStorage } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Spinner from 'react-native-loading-spinner-overlay';

// Estilos
import globals from "../Fragments/globalStyles";
import styles from "./styles";

// Componentes personalizados
import AdMob from "../Fragments/AdMob";
import Header from "../Fragments/Header";
import FinalMargin from "../Fragments/FinalMargin";

// API
import api from "../../services/api";

// Função de manipulação
import gerarAlerta from "../../utils/gerarAlerta";

// Render
export default function Inicio() {
    // Gerencia o loader
    const [loading, setLoading] = useState(false);
    const [erroConexao, setErroConexao] = useState(false);

    // Informações do banco de dados
    const [topicos, setTopicos] = useState([]);
    const [quantidades, setQuantidades] = useState([]);
    const [total, setTotal] = useState(0);

    // Gerencia a navegação
    const nav = useNavigation();

    // Função de inicialização
    async function init() {
        try {
            setLoading(true);
            const res = await api.get("/quimica/topicos");

            if(res.data.statusCode == 200) {
                const novosTopicos = [];
                const novasQuantidades = [];
                let soma = 0;

                res.data.cadastros.forEach(item => {
                    novosTopicos.push(item.topico);
                    novasQuantidades.push(item.quantidade);
                    soma += item.quantidade;
                });

                setTopicos(novosTopicos);
                setQuantidades(novasQuantidades);
                setTotal(soma);

                await AsyncStorage.setItem("cadastros", JSON.stringify(res.data.cadastros));
            } else {
                gerarAlerta("Erro de conexão", "Opa, sinto muito, mas parece que ocorreu um erro de conexão ao nosso banco de dados. Por favor, tente novamente.");
                setErroConexao(true);
            }
        } catch(erro) {
            gerarAlerta("Erro de conexão", "Opa, sinto muito, mas parece que ocorreu um erro de conexão ao nosso banco de dados. Por favor, tente novamente.");
            setErroConexao(true);
        }

        setLoading(false);
    }

    // Executa a inicialização
    useEffect(() => {
        init();
    }, []);

    // Leva para a página de configuração de simulado
    function novoSimulado() {
        if(erroConexao) {
            gerarAlerta("Erro de conexão", "Sinto muito, houve um erro de conexão com o banco de dados. Feche o aplicativo e abra novamente, para reestabelecer uma conexão.")
        } else {
            nav.navigate("NovoSimulado");
            /*nav.reset({
                index: 0,
                routes: [{ name: "NovoSimulado" }]
            });*/
        }
    }

    // Leva para a página de informações
    function sobre() {
        nav.navigate("Sobre");
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

                <View style={styles.secaoAtualizacoes}>
                    <Text style={styles.textoTitulo}>Olá, bem-vindo(a) ao SimQui.{"\n"}</Text>
                    <Text style={styles.textoConteudo}>Atualmente, nosso banco de questões conta com {total} questões ao todo, divididas nos seguintes tópicos:</Text>
                    {topicos.map((topico, indc) => (
                        <Text style={styles.textoConteudo}>{topico}: {quantidades[indc]} questões.</Text>
                    ))}
                </View>

                <TouchableOpacity style={globals.botao} onPress={novoSimulado}>
                    <Text style={globals.textoBotao}>Realizar um Simulado</Text>
                </TouchableOpacity>

                <TouchableOpacity style={globals.botao} onPress={sobre}>
                    <Text style={globals.textoBotao}>Sobre o Aplicativo</Text>
                </TouchableOpacity>

                <FinalMargin />

            </ScrollView>

            <AdMob />

        </SafeAreaView>
    );
}