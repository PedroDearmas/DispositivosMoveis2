import { useNavigation } from "@react-navigation/native";
import React, {useEffect, useState} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, 
         TextInput, TouchableOpacity, View } from "react-native";

import { auth, firestore} from '../firebase';
import { Cachorro } from "../model/Cachorro";
import meuestilo from "../meuestilo";

const CachorroManter = () =>{
    const [formCachorro, setFormCachorro]=
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
        <KeyboardAvoidingView style={meuestilo.container}>
            <View style={meuestilo.inputContainer}>
                <TextInput 
                    placeholder="Nome"
                    value={formCachorro.nome}
                    onChangeText={nome => setFormCachorro({
                        ...formCachorro,
                        nome: nome
                    })}
                    style={meuestilo.input}
                />
                <TextInput 
                    placeholder="Sexo"
                    value={formCachorro.nome}
                    onChangeText={nome => setFormCachorro({
                        ...formCachorro,
                        nome: nome
                    })}
                    style={meuestilo.input}
                />
                <TextInput 
                    placeholder="Nome"
                    value={formCachorro.nome}
                    onChangeText={nome => setFormCachorro({
                        ...formCachorro,
                        nome: nome
                    })}
                    style={meuestilo.input}
                />
                <TextInput 
                    placeholder="Nome"
                    value={formCachorro.nome}
                    onChangeText={nome => setFormCachorro({
                        ...formCachorro,
                        nome: nome
                    })}
                    style={meuestilo.input}
                />
            </View>
        </KeyboardAvoidingView> 
    )
}
export default CachorroManter;