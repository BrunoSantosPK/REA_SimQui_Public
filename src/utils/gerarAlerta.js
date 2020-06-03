import { Alert } from "react-native"

export default function gerarAlerta(titulo, mensagem) {
    Alert.alert(titulo, mensagem, [
        {
            text: "OK",
            style: "cancel"
        }
    ]);
}