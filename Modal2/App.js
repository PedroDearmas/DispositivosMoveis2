import React, { useState } from "react";
import Modal from "react-native-modal";
import { Button } from "react-native";
import { StyleSheet, Text, View, Image } from "react-native";

function Modal2() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisibleSucesso, setModalVisibleSucesso] = useState(false);
  const [isModalVisibleAtencao, setModalVisibleAtencao] = useState(false);
  const [isModalVisibleAdvertencia, setModalVisibleAdvertencia] =
    useState(false);

  const switchModal = () => {
    setModalVisible(!isModalVisible);
  };
  const switchModalSucesso = () => {
    setModalVisibleSucesso(!isModalVisibleSucesso);
  };
  const switchModalAtencao = () => {
    setModalVisibleAtencao(!isModalVisibleAtencao);
  };
  const switchModalAdvertencia = () => {
    setModalVisibleAdvertencia(!isModalVisibleAdvertencia);
  };

  return (
    <View style={styles.container}>
      <Button title="Ninja Go" onPress={switchModal} />
      <Modal
        isVisible={isModalVisible}
        animationIn={"fadeInRight"}
        animationInTiming={1000}
        animationOut={"fadeOutLeft"}
        animationOutTiming={1000}
      >
        <View style={styles.modalView}>
          <Image
            source={require("./assets/ninja.gif")}
            style={{ width: 180, height: 180 }}
          />
          <Button title="Good Bye Ninja" onPress={switchModal} />
        </View>
      </Modal>

      <Button title="Sucesso" onPress={switchModalSucesso} />

      <Modal
        isVisible={isModalVisibleSucesso}
        animationIn={"zoomIn"}
        animationInTiming={1000}
        animationOut={"zoomOut"}
        animationOutTiming={1000}
      >
        <View style={styles.modalView}>
          <Image
            source={require("./assets/mark2.gif")}
            style={{ width: 180, height: 180 }}
          />
          <Button title="Voltar" onPress={switchModalSucesso} />
        </View>
      </Modal>

      <Button title="Atencao" onPress={switchModalAtencao} />

      <Modal
        isVisible={isModalVisibleAtencao}
        animationIn={"zoomIn"}
        animationInTiming={1000}
        animationOut={"zoomOut"}
        animationOutTiming={1000}
      >
        <View style={styles.modalView}>
          <Image
            source={require("./assets/atencao.gif")}
            style={{ width: 180, height: 180 }}
          />
          <Button title="Voltar" onPress={switchModalAtencao} />
        </View>
      </Modal>

      <Button title="Advertencia" onPress={switchModalAdvertencia} />

      <Modal
        isVisible={isModalVisibleAdvertencia}
        animationIn={"zoomIn"}
        animationInTiming={1000}
        animationOut={"zoomOut"}
        animationOutTiming={1000}
      >
        <View style={styles.modalView}>
          <Image
            source={require("./assets/x.gif")}
            style={{ width: 180, height: 180 }}
          />
          <Button title="Voltar" onPress={switchModalAdvertencia} />
        </View>
      </Modal>
    </View>
  );
}
export default Modal2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
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
    margin: 50,
    marginTop: 120,
    marginBottom: 120,
    borderRadius: 50,
  },
});
