import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const AppStack = createStackNavigator();

import Inicio from "./pages/Inicio";
import NovoSimulado from "./pages/NovoSimulado";
import Simulado from "./pages/Simulado";
import Sobre from "./pages/Sobre";

export default function Routes() {
    return (
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{ headerShown: false }}>
                <AppStack.Screen name="Inicio" component={Inicio} />
                <AppStack.Screen name="NovoSimulado" component={NovoSimulado} />
                <AppStack.Screen name="Simulado" component={Simulado} />
                <AppStack.Screen name="Sobre" component={Sobre} />
            </AppStack.Navigator>
        </NavigationContainer>
    );
}