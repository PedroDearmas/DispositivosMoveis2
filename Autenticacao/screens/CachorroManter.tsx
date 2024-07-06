import { useNavigation } from "@react-navigation/native";
import React, {useEffect, useState} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, 
         TextInput, TouchableOpacity, View, Alert, 
         Pressable, Image} from "react-native";
import { auth, firestore, storage} from "../firebase";
import meuestilo from "../meuestilo";
import { Cachorro } from "../model/Cachorro";
import * as ImagePicker from "expo-image-picker"
import {uploadBytes} from "firebase/storage";

const CachorroManter = () => {
    const [formCachorro,setFormCachorro] = useState<Partial<Cachorro>>({})
    const navigation = useNavigation();

    const [pickerImagePath, setPickerImagePath] = useState('');

    const cachorroRef = firestore.collection('Usuario').doc(auth.currentUser?.uid)
    .collection('Cachorro')

    const cancelar = () => {
        setFormCachorro({})
        setPickerImagePath("")
    }

    const salvar = async() => {
        const cachorroRefComId = cachorroRef.doc();
        const cachorro = new Cachorro(formCachorro);
        cachorro.id = cachorroRefComId.id;

        cachorroRefComId.set(cachorro.toFirestore()).then(() => {
            alert("Cachorro adicionado com sucesso!");
            cancelar();
        })
    }

    const escolherFoto = () => {
        Alert.alert(
            "Seletor de foto",
            "Selecione a foto do animal!!",
            [
                {
                    text: "Abrir câmera",
                    onPress: () => abrirCamera()
                },
                {
                    text: "Abrir galeria",
                    onPress: () => showImagePicker()
                }
            ]
        )
    }

    const abrirCamera = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
       if(permissionResult.granted === false){
        alert("Permissão recusada");
        return;
        }

        const result = await ImagePicker.launchCameraAsync();
        enviarImagem(result);
    }

    const showImagePicker = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if(permissionResult.granted === false){
            alert("Permissão de acesso a galeria recusado!!");
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
            aspect: [4,3], 
        }); 
        enviarImagem(result);
    }

    const enviarImagem = async(result) =>{
        if (!result.canceled){
            setPickerImagePath(result.assets[0].uri);

            const uploadUri = result.assets[0].uri;
            let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
            const extension = filename.split('.').pop();
            const name = filename.split('.').slice(0, -1).join('.');

            const ref = storage.ref(`imagens/${name}.${extension}`);

            const img = await fetch(uploadUri);
            const bytes = await img.blob();
            const fbResult = await uploadBytes(ref, bytes);

            const Download = await storage.ref(fbResult.metadata.fullPath).getDownloadURL();
            console.log(fbResult);
            setFormCachorro({... formCachorro, urlfoto: Download});
        }
    }

    return(
        <KeyboardAvoidingView style={meuestilo.container}>
             <Pressable onPress={() => escolherFoto()}>
                    {pickerImagePath === "" && (
                        <Image style={meuestilo.imagemescolher} source={require('../assets/camera.png')}/>
                    )}
                    {pickerImagePath !== "" && (
                        <Image style={meuestilo.imagemescolher} source={{uri: pickerImagePath}}/>
                    )}
                </Pressable>
            <View style={meuestilo.inputContainer}>
                <TextInput
                    placeholder="Nome"
                    value={formCachorro.nome}
                    onChangeText={nome => setFormCachorro({ ...formCachorro, nome: nome})}
                    style={meuestilo.input}
                />
                <TextInput
                    placeholder="Sexo"
                    value={formCachorro.sexo}
                    onChangeText={sexo => setFormCachorro({ ...formCachorro, sexo: sexo})}
                    style={meuestilo.input}
                />
                <TextInput
                    placeholder="Data Nascimento"
                    value={formCachorro.datanasc}
                    onChangeText={datanasc => setFormCachorro({ ...formCachorro, datanasc: datanasc})}
                    style={meuestilo.input}
                />
                <TextInput
                    placeholder="Raça"
                    value={formCachorro.raca}
                    onChangeText={raca => setFormCachorro({ ...formCachorro, raca: raca})}
                    style={meuestilo.input}
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
        </KeyboardAvoidingView>
    )

}

export default CachorroManter;