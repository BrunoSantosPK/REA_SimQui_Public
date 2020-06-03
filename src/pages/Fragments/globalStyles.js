import { StyleSheet } from "react-native";

export default StyleSheet.create({

    body: {
        flex: 1
    },

    conteudo: {
        paddingHorizontal: 20,
        paddingTop: 25
    },

    telaPrimaria: {
        backgroundColor: "#fafafa"
    },

    textoGeral: {
        fontFamily: "Roboto",
        fontSize: 17,
        color: "#000000"
    },

    botao: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        borderRadius: 8,
        backgroundColor: "#2543a9"
    },

    textoBotao: {
        color: "#fff",
        fontFamily: "MontserratBold",
        fontSize: 17,
        lineHeight: 40
    },

    textoLabel: {
        fontFamily: "Noto",
        fontSize: 16
    },

    textoComentario: {
        fontFamily: "Noto",
        fontSize: 14,
        color: "#008000"
    },

    areaBotaoVoltar: {
        alignItems: "flex-end",
        marginBottom: 20
    },

    botaoVoltar: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#2543a9",
        borderRadius: 5,
        paddingHorizontal: 8,
        paddingVertical: 3
    },

    textoBotaoVoltar: {
        fontFamily: "RobotoBold",
        fontSize: 15,
        color: "#fff",
        paddingLeft: 3
    },

});