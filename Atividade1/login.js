import { useNavigation, useRoute } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

const Login = () => {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");

  const logar = () => {
    setLogin("");
    setSenha("");
  };

  return (
    <View style={styles.container}>
      <Text>Tela de Login</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Login"
          style={styles.input}
          value={login}
          onChangeText={(e) => {
            setLogin(e);
          }}
        />
        <TextInput
          placeholder="Senha"
          style={styles.input}
          value={senha}
          secureTextEntry={true}
          onChangeText={(e) => {
            setSenha(e);
          }}
        />
        <Button title="Entrar" onPress={logar} />
      </View>
    </View>
  );
};
export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00bfff",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 5,
  },
});
