import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import Constants from "expo-constants";
import { Feather } from "@expo/vector-icons";

import logo from "../../assets/logo.png";

export default function Header() {
    return (
        <View style={style.barra}>
            <Image source={logo} style={style.logo} />
        </View>
    );
}

const style = new StyleSheet.create({
    barra: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        paddingTop: Constants.statusBarHeight + 10,
        paddingBottom: 10,
        backgroundColor: "#000055"
    },
    titulo: {
        fontFamily: "MontserratBold",
        fontSize: 22,
        color: "#004455"
    },
    logo: {
        width: 155,
        height: 30
    }
});