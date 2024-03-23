import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, TextInput, Image } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import Modal from "react-native-modal";

const Formulario = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [validade, setvalidade] = useState("");
  const [produto, setProduto] = useState("");
  const [codigoBarra, setCodigoBarra] = useState("");
  const [isModalVisibleSucesso, setModalVisibleSucesso] = useState(false);

  const salvar = () => {
    setvalidade("");
    setProduto("");
    setCodigoBarra("");
    setModalVisibleSucesso(!isModalVisibleSucesso);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setvalidade(date.toLocaleString());
    hideDatePicker();
  };

  const getDataMin = () => {
    var data = new Date();
    data.setDate(data.getDate());
    return data;
  };

  return (
    <View style={styles.container}>
      <Text>Cadastro de Produto</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Produto"
          style={styles.input}
          value={produto}
          onChangeText={(e) => {
            setProduto(e);
          }}
        />
        <TextInput
          placeholder="Codigo de barras"
          style={styles.input}
          value={codigoBarra}
          onChangeText={(e) => {
            setCodigoBarra(e);
          }}
        />
        <TextInput
          placeholder="Data de validade"
          style={styles.input}
          value={validade}
        />

        <Button title="Selecionar data" onPress={showDatePicker} />
        <Button title="Salvar" onPress={salvar} />
        <DateTimePicker
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          minimumDate={getDataMin()}
        />
        <Modal
          isVisible={isModalVisibleSucesso}
          animationIn={"zoomIn"}
          animationInTiming={1000}
          animationOut={"zoomOut"}
          animationOutTiming={1000}
        >
          <View style={styles.modalView}>
            <Image
              source={require("./assets/verified.gif")}
              style={{ width: 180, height: 180 }}
            />
            <Button
              title="COnfirmar"
              onPress={() => setModalVisibleSucesso(!isModalVisibleSucesso)}
            />
          </View>
        </Modal>
      </View>
    </View>
  );
};
export default Formulario;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00bfff",
  },
  inputContainer: {
    width: "80%",
    gap: 5,
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  modalView: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    margin: 50,
    marginTop: 120,
    marginBottom: 120,
    borderRadius: 50,
  },
});
