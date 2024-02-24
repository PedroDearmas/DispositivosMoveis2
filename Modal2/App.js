import React, { useState } from "react";
import Modal from "react-native-modal";
import { Button } from "react-native";
import { StyleSheet, Text, View } from "react-native";

function Modal2() {
  const [isModalVisible, setModalVisible] = useState(false);

  const switchModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <View style={styles.container}>
      <Button title="Clique Aqui" onPress={switchModal} />
      <Modal
        isVisible={isModalVisible}
        animationIn={"zoomInUp"}
        animationInTiming={2900}
      >
        <View style={styles.modalView}>
          <Button title="Clique Aqui Para Voltar" onPress={switchModal} />
        </View>
      </Modal>
    </View>
  );
}
export default Modal2;

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
