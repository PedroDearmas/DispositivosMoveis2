import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";

const Exemplo = () => {
  const [isDatePickerVisible, setDatePickerVisiblity] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisiblity(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisiblity(false);
  };
  const handleConfirm = (date) => {
    console.warn("A data é: ", date.toLocaleString());
    hideDatePicker();
  };
  const getDataAtual = () => {
    var data = new Date();
    data.setDate(data.getDate() + 1);
    return data;
  };

  return (
    <View style={styles.container}>
      <Button title="Selecionar Data e Hora" onPress={showDatePicker} />
      <DateTimePicker
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        minimumDate={getDataAtual()}
      />
    </View>
  );
};

export default Exemplo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#black",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
});
