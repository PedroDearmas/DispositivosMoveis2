import * as React from "react";
import { Text, View, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Formulario from "./formulario";
import Login from "./login";
import Icon from "react-native-vector-icons/Ionicons";

function LoginScreen() {
  return <Login></Login>;
}

function FormScreen() {
  return <Formulario></Formulario>;
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Login"
          component={LoginScreen}
          options={{
            tabBarIcon: () => (
              <Icon name="enter-sharp" size={30} color={"#00bfff"} />
            ),
          }}
        />
        <Tab.Screen
          name="Cadastro Produto"
          component={FormScreen}
          options={{
            tabBarIcon: () => <Icon name="cart" size={30} color={"#00bfff"} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
