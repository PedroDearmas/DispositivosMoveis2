import { useNavigation } from "@react-navigation/native";
import React, {useEffect, useState} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, 
         TextInput, TouchableOpacity, View } from "react-native";

import { auth, firestore} from '../firebase';
import meuestilo from "../meuestilo";

const ManterCachorro = () =>{
    const [formCachorro, formCachorro]=
    useState<Partial<Cachorro>>({})

    const navigation = useNavigation();

    const refCachorro=firestore.collection("Usuario").doc(auth.currentUser?.uid)
    .collection("Cachorro")

    const canselar = () =>{
        setFormCachorro({});
    }

    const salvar = () =>{

    }

    return(
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput 
                    placeholder="Nome"
                    value={formCachorro.nome}
                    onChangeText={nome => setFormCachorro({
                        ...formCachorro,
                        nome: nome
                    })}
                    style={styles.input}
                />
                <TextInput 
                    placeholder="Sexo"
                    value={formCachorro.nome}
                    onChangeText={nome => setFormCachorro({
                        ...formCachorro,
                        nome: nome
                    })}
                    style={styles.input}
                />
                <TextInput 
                    placeholder="Nome"
                    value={formCachorro.nome}
                    onChangeText={nome => setFormCachorro({
                        ...formCachorro,
                        nome: nome
                    })}
                    style={styles.input}
                />
                <TextInput 
                    placeholder="Nome"
                    value={formCachorro.nome}
                    onChangeText={nome => setFormCachorro({
                        ...formCachorro,
                        nome: nome
                    })}
                    style={styles.input}
                />
            </View>
        </KeyboardAvoidingView> 
    )
}