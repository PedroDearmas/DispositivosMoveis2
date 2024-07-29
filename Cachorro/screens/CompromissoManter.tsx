import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Text, Pressable, Modal, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Image, Alert } from "react-native";
import { auth, firestore, storage } from "../firebase";
import meuestilo from "../meuestilo";
import { FlatList } from "react-native-gesture-handler";
import { Compromisso } from "../model/Compromisso";

const ManterCompromisso = (props) => {
  const [formCompromisso, setFormCompromisso] = useState<Partial<Compromisso>>({});
  const navigation = useNavigation();
  const [compromissos, setCompromissos] = useState<Compromisso[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(true);

  const compromissoRef = firestore.collection("Usuario").doc(auth.currentUser?.uid).collection("Compromisso");

  const limparFormulario = () => {
    setFormCompromisso({});
  };

  const cancelar = () => {
    setFormCompromisso({});
  };

  const salvar = async () => {
    const compromisso = new Compromisso(formCompromisso);

    console.log(compromisso.id);

    if (compromisso.id === undefined) {
      const compromissoRefComId = compromissoRef.doc();
      compromisso.id = compromissoRefComId.id;

      compromissoRefComId.set(compromisso.toFirestore()).then(() => {
        alert("Compromisso " + compromisso.descricao + " adicionado!");
        limparFormulario();
      });
    } else {
      const compromissoRefComId = compromissoRef.doc(compromisso.id);
      compromissoRefComId.update(compromisso.toFirestore()).then(() => {
        alert("Compromisso " + compromisso.descricao + " atualizado!");
        limparFormulario();
      });
    }
  };

  useEffect(() => {
    if (loading) {
      const subscriber = compromissoRef.onSnapshot((querySnapshot) => {
        const compromissos = [];
        querySnapshot.forEach((documentSnapshot) => {
          compromissos.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setCompromissos(compromissos);
        setLoading(false);
        setIsRefreshing(false);
      });
      return () => subscriber();
    }
  }, [compromissos]);

  const editCompromisso = async (compromisso: Compromisso) => {
    const result = firestore
      .collection("Usuario")
      .doc(auth.currentUser?.uid)
      .collection("Compromisso")
      .doc(compromisso.id)
      .onSnapshot((documentSnapshot) => {
        const compromisso = new Compromisso(documentSnapshot.data());
        setFormCompromisso(compromisso);
        console.log(compromisso);
      });
    return () => result();
  };

  const deleteCompromisso = async (compromisso: Compromisso) => {
    Alert.alert(`Apagar compromisso "${compromisso.descricao}?" `, "Essa ação não pode ser desfeita!", [
      {
        text: "Cancelar",
      },
      {
        text: "Excluir",
        onPress: async () => {
          const res = await compromissoRef
            .doc(compromisso.id)
            .delete()
            .then(() => {
              alert("Compromisso " + compromisso.descricao + " excluído!");
              limparFormulario();
              setIsRefreshing(true);
            });
        },
      },
    ]);
  };

  const renderCompromissos = ({ item }: { item: Compromisso }) => {
    return (
      <View style={meuestilo.item} key={item.id}>
        <Pressable onLongPress={() => deleteCompromisso(item)} onPress={() => editCompromisso(item)}>
          <View style={meuestilo.alinhamentoLinha}>
            <View style={meuestilo.alinhamentoColuna}>
              <Text style={meuestilo.title}>Compromisso: {item.descricao}</Text>
              <Text style={meuestilo.title}>Valor: {item.valor}</Text>
              <Text style={meuestilo.title}>Local: {item.local}</Text>
            </View>
          </View>
        </Pressable>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView style={meuestilo.container}>
      <View style={meuestilo.inputContainer}>
        <TextInput
          placeholder="Compromisso"
          style={meuestilo.input}
          value={formCompromisso.descricao}
          onChangeText={(compromisso) =>
            setFormCompromisso({
              ...formCompromisso,
              descricao: compromisso,
            })
          }
        />
        <TextInput
          placeholder="Valor"
          keyboardType="numeric"
          style={meuestilo.input}
          value={formCompromisso.valor}
          onChangeText={(valor) =>
            setFormCompromisso({
              ...formCompromisso,
              valor: valor.toString(),
            })
          }
        />
        <TextInput
          placeholder="Local"
          style={meuestilo.input}
          value={formCompromisso.local}
          onChangeText={(compromisso) =>
            setFormCompromisso({
              ...formCompromisso,
              local: compromisso,
            })
          }
        />
      </View>

      <View style={meuestilo.buttonContainer}>
        <TouchableOpacity onPress={cancelar} style={meuestilo.button}>
          <Text style={meuestilo.buttonText}>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={salvar} style={[meuestilo.button, meuestilo.buttonOutline]}>
          <Text style={meuestilo.buttonOutlineText}>Salvar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={compromissos}
        renderItem={renderCompromissos}
        keyExtractor={(item) => item.id.toString()}
        refreshing={isRefreshing}
      />
    </KeyboardAvoidingView>
  );
};

export default ManterCompromisso;