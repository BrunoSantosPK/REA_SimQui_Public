import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, AsyncStorage } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Spinner from 'react-native-loading-spinner-overlay';
import RadioGroup from "../Fragments/RadioGroup";

// Estilos
import globals from "../Fragments/globalStyles";
import styles from "./styles";

// Componentes personalizados
import AdMob from "../Fragments/AdMob";
import Header from "../Fragments/Header";
import FinalMargin from "../Fragments/FinalMargin";
import ModalDecisao from "../Fragments/ModalDecisao";

// Função de manipulação
import gerarAlerta from "../../utils/gerarAlerta";
import embaralharOpcoes from "../../utils/embaralharOpcoes";

// API
import api from "../../services/api";

// Render
export default function Simulado() {
    // Gerencia o loader
    const [loading, setLoading] = useState(false);

    // Gerencia a navegação
    const navegacao = useNavigation();
    const callbackVoltar = () => {
        navegacao.reset({
            index: 0,
            routes: [{ name: "NovoSimulado" }]
        });
    };

    // Gerencia as questões
    const [questoes, setQuestoes] = useState([]);
    const [respostas, setRespostas] = useState([]);
    const [comentarios, setComentarios] = useState([]);

    // Gerencia os radios
    const callbackRadio = (indc, valor) => {
        const novasRespostas = [];
        respostas.forEach((res, j) => {
            if(j != indc)
                novasRespostas.push(res);
            else
                novasRespostas.push(valor);
        });
        setRespostas(novasRespostas);
    };

    // Função de inicialização
    async function init() {
        // Recupera preferências
        let params = await AsyncStorage.getItem("params");
        params = JSON.parse(params);

        setLoading(true);
        try {
            const res = await api.get("/quimica/bateria", { params });

            if(res.data.statusCode == 200) {
                // Inicializa o array de respostas e embaralha as opções
                const resOpc = [];
                const coments = [];
                const novasQuestoes = [];
                res.data.questoes.map(item => {
                    resOpc.push("");
                    coments.push("");

                    let embaralhamento = embaralharOpcoes(
                        [item.opcao_1, item.opcao_2, item.opcao_3, item.opcao_4],
                        ["opcao_1", "opcao_2", "opcao_3", "opcao_4"]
                    );

                    item.opcoes = embaralhamento;
                    novasQuestoes.push(item);
                });

                setQuestoes(novasQuestoes);
                setRespostas(resOpc);
                setComentarios(coments);
            }
        } catch(erro) {
            console.log(erro);
            gerarAlerta("Erro de conexão", "É embaraçoso, mas ocorreu um erro de conexão com o banco de dados. Verifique a sua internet e tente outra vez.");
        }

        setLoading(false);
    }

    useEffect(() => {
        init();
    }, []);

    // Gerencia as respostas
    function verificarRespostas() {
        let mensagem = "";
        let todasMarcadas = true;

        // Verifica respostas em branco
        respostas.forEach((resposta, indc) => {
            if(resposta == "") {
                mensagem += `A questão ${indc + 1} não foi respondida.\n`;
                todasMarcadas = false;
            }
        });
        if(!todasMarcadas) {
            gerarAlerta("Correção", mensagem);
            return;
        }

        // Faz a correção
        const novosComentarios = []
        questoes.forEach((questao, indc) => {
            if(questao.resposta == respostas[indc]) {
                mensagem += `Parabéns, você acertou a questão ${indc + 1}.\n\n`;
                novosComentarios.push(questao.comentario);
            } else {
                mensagem += `Opa, a resposta da questão ${indc + 1} não é essa. Tente outra vez!\n\n`;
                novosComentarios.push("Tente outra vez, você consegue!");
            }
        });
        gerarAlerta("Correção", mensagem);
        setComentarios(novosComentarios);
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

                <ModalDecisao
                    textoModal="Deseja realmente abandonar este simulado e voltar?"
                    callback={callbackVoltar}
                />

                <View style={styles.secaoQuestoes}>
                    
                    {questoes.map((questao, indc) => (
                        <View style={styles.areaQuestao} key={questao._id}>
                            <Text style={[globals.textoLabel, styles.negrito]}>Questão {indc + 1}</Text>
                            <Text style={globals.textoLabel}>{questao.topico} (Nível de dificulade: {questao.dificuldade}){"\n"}</Text>
                            <Text style={globals.textoLabel}>{questao.descricao}</Text>

                            <RadioGroup
                                options={questao.opcoes.labels}
                                values={questao.opcoes.values}
                                index={indc}
                                callback={callbackRadio}
                            />

                            <Text style={globals.textoComentario}>{comentarios[indc]}</Text>

                        </View>
                    ))}

                </View>

                <TouchableOpacity style={globals.botao} onPress={verificarRespostas}>
                    <Text style={globals.textoBotao}>Verificar</Text>
                </TouchableOpacity>

                <FinalMargin />

            </ScrollView>

            <AdMob />

        </SafeAreaView>
    );
}