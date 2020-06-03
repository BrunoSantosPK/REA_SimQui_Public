import React, { useState } from "react";
import { View, StyleSheet, Modal, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons"

import globals from "./globalStyles";

export default function ModalDecisao({ textoModal, callback }) {
    // Gerancia a abertura
    const [aberto, setAberto] = useState(false);
    function acaoSim() {
        setAberto(false);
        callback();
    }

    return (
        <View>
            <View style={globals.areaBotaoVoltar}>
                <TouchableOpacity style={globals.botaoVoltar} onPress={() => setAberto(true)}>
                    <Feather name="chevrons-left" size={16} color="#fff"></Feather>
                    <Text style={globals.textoBotaoVoltar}>Voltar</Text>
                </TouchableOpacity>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={aberto}
            >

                <View style={estilos.content}>

                    <View style={estilos.modalContent}>
                        <Text style={estilos.textoApresentacao}>{textoModal}</Text>

                        <View style={estilos.botoesContent}>

                            <TouchableOpacity style={estilos.botaoModal} onPress={acaoSim}>
                                <Text style={estilos.textoBotaoModal}>Sim</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={estilos.botaoModal} onPress={() => setAberto(false)}>
                                <Text style={estilos.textoBotaoModal}>Não</Text>
                            </TouchableOpacity>

                        </View>

                    </View>
                    
                </View>

            </Modal>
        </View>
    );
}

const estilos = StyleSheet.create({

    content: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },

    modalContent: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },

    textoApresentacao: {
        fontFamily: "Noto",
        fontSize: 18
    },

    botoesContent: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginTop: 15
    },

    botaoModal: {
        backgroundColor: "#2543a9",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        paddingVertical: 5,
        paddingHorizontal: 20
    },

    textoBotaoModal: {
        fontFamily: "MontserratBold",
        fontSize: 18,
        color: "#fff"
    }

});