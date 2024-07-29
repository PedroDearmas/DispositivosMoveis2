import React, { useState, useEffect } from "react";
import { ActivityIndicator, SafeAreaView, View, StyleSheet, FlatList, Text, Pressable } from "react-native";
import { auth, firestore } from "../firebase";
import meuestilo from "../meuestilo";
import { Compromisso } from "../model/Compromisso";

export const EscolheCompromisso = (props) => {
  const [loading, setLoading] = useState(true); // Set loading to true
  const [compromissos, setCompromissos] = useState<Compromisso[]>([]); // Initial empty array
  const [isRefreshing, setIsRefreshing] = useState(true);

  const compromissoRef = firestore.collection("Usuario").doc(auth.currentUser?.uid).collection("Compromisso");

  useEffect(() => {
    const subscriber = compromissoRef.onSnapshot((querySnapshot) => {
      const compromissosTmp = [];
      querySnapshot.forEach((documentSnapshot) => {
        compromissosTmp.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        });
      });
      setCompromissos(compromissosTmp);
      setLoading(false);
    });
    return () => subscriber();
  }, [compromissos]);

  if (loading) {
    return <ActivityIndicator />;
  }

  const closeModal = (bool, item) => {
    console.log(item);
    props.setModalCompromissoVisible(bool);
    props.setCompromisso(item);
  };

  const renderCompromisso = ({ item }: { item: Compromisso }) => {
    return (
      <View style={styles.itemCard} key={item.id}>
        <Pressable
          style={({ pressed }) => [{ backgroundColor: pressed ? "#f1f1f1" : "transparent" }, styles.listItem]}
          onLongPress={() => {
            closeModal(false, item);
          }}
          onPress={() => {
            closeModal(false, item);
          }}
        >
          <View>
            <Text>ID: {item.id}</Text>
            <Text>Compromisso: {item.descricao}</Text>
            <Text>Valor: {item.valor}</Text>
          </View>
        </Pressable>
      </View>
    );
  };

  return (
    <SafeAreaView style={meuestilo.containerlistar}>
      <FlatList data={compromissos} renderItem={renderCompromisso} keyExtractor={(item) => item.id} refreshing={isRefreshing} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  emptyList: {
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  itemCard: {
    backgroundColor: "#fff",
    shadowColor: "#222222",
    shadowOffset: { height: 1, width: 1 },
  },
  itemImage: {
    width: 64,
    height: 64,
    marginLeft: 10,
    marginRight: 15,
    backgroundColor: "#eee",
  },
});