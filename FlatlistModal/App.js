import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Pressable } from 'react-native';
import Lista from './Lista';
import Modal from 'react-native-modal'

export default function App() {
  const [modalListaVisible, setModalListaVisible] = useState(false);
  const [itemLista, setItemLista]= useState({...itemLista,id:"",title:""})

  return (
    <View style={styles.centralizado}>
      <Modal                        // MODAL DA LISTA
        isVisible={modalListaVisible}
        animationIn={"bounceInUp"}
        animationInTiming={1000}
        backdropColor="black"
        onRequestClose={() => {
          setModalListaVisible(!modalListaVisible)
        }}
      >
        <View style={styles.modalView}>
          <Lista 
            setModalListaVisible={setModalListaVisible}
            setItemLista={setItemLista}
          >
          </Lista>
        </View>
      </Modal>

      <Text style={styles.itens}>ID: {itemLista.id}</Text>
      <Text style={styles.itens}>Cidade: {itemLista.title}</Text>

      <Pressable onPress={ () => setModalListaVisible(true)} style={styles.botao}>
        <Text style={styles.botaotexto}>Abrir Lista</Text>
      </Pressable>
      
    </View>
  )
}

const styles = StyleSheet.create({
  centralizado: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: '#d2bbfa'
  },
  modalView: {
    margin: 50,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
  },
  itens: {
    fontSize: 25,
  },
  botao: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    backgroundColor: "#65829c",
    padding: 10,
    borderRadius: 10,
    minWidth: 100,
    marginTop: 10
  },
  botaotexto: {
    color: "white",
    fontSize: 20
  },
});
