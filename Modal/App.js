import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Modal, Button, Image } from "react-native";

function ModalTeste() {
  const [isModalVisible, setModalVisible] = useState(false);

  const switchModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      <Button title="Clique Aqui" onPress={switchModal} />
      <Modal visible={isModalVisible} >  {/*TRANSPARENT serve para q o fundo fique transparente*/}
        <View style={styles.modalView}>
          <Button title="Sair do Modal" onPress={switchModal} />
        </View>
      </Modal>
    </View>
  );
}

export default ModalTeste;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "blue",
  },
  modalView: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "lightblue",
    margin: 80,
    marginTop: 150,
    marginBottom: 150,
    borderRadius: 50,
  },
});
