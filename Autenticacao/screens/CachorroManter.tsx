import { useNavigation } from "@react-navigation/native";
import React, {useEffect, useState} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, FlatList, 
         TextInput, TouchableOpacity, View, Alert, Pressable, Image } from "react-native";
import { auth, firestore, storage} from "../firebase";
import meuestilo from "../meuestilo";
import { Cachorro } from "../model/Cachorro";
import * as ImagePicker from "expo-image-picker";
import  { uploadBytes } from "firebase/storage"; 
import { ScrollView } from "react-native-gesture-handler";


const CachorroManter = () => {
    const [formCachorro,setFormCachorro] = useState<Partial<Cachorro>>({})
    const[cachorros,setCachorros] = useState<Cachorro[]>([]);
    const[loading,setLoading] = useState(true);

    const navigation = useNavigation();

    const [pickerImagePath, setPickerImagePath] = useState('');

    const cachorroRef = firestore.collection('Usuario').doc(auth.currentUser?.uid)
    .collection('Cachorro')

    const cancelar = () => {
        setFormCachorro({})
        setPickerImagePath("")
    }

    const salvar = async() => {
        const cachorro = new Cachorro(formCachorro);

        if(cachorro.id === undefined){
            const cachorroRefComId = cachorroRef.doc();
            cachorro.id = cachorroRefComId.id;

            cachorroRefComId.set(cachorro.toFirestore()).then(() => {
                alert("Cachorro adicionado com sucesso!");
                cancelar();
            })
        }else{
            const cachorroRefComId = cachorroRef.doc(cachorro.id);
            cachorroRefComId.update(cachorro.toFirestore()).then(() => {
                alert("Cachorro atualizado com sucesso!");
                setLoading(true);
                cancelar();
            });
        }
    }

        

    const escolheFoto = () => {
        Alert.alert(
            "Seletor de Fotos",
            "Escolha uma alternativa",
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
        if (permissionResult.granted === false){
            alert("Permissão recusada!");
            return;
        }

        const result = await ImagePicker.launchCameraAsync();
        enviarImagem(result);
    }

    const showImagePicker = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false){
            alert("Permissão de acesso a galeria recusada!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
            aspect: [4,3]
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
            setFormCachorro({... formCachorro, urlfoto: Download});

        }
    }

    useEffect(() => {
        if(loading){
            const subscriber = cachorroRef
            .onSnapshot((querySnapshot) => {
                const cachorros = [];
                querySnapshot.forEach((documentSnapshot) => {
                    cachorros.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id
                    });
                });
                setCachorros(cachorros);
                setRefresh(false);
            })
            return () => subscriber();
    }, [cachorros])

    const editCAchorro = async(cachorro : Cachorro) => {
        const result = firestore.collection('Usuario').doc(auth.currentUser?.uid)
        .collection('Cachorro').doc(cachorro.id)
            .onSnapshot(documentSnapshot => {
                const cachorro = new Cachorro(documentSnapshot.data());
                setFormCachorro(cachorro);
                setPickerImagePath(cachorro.urlfoto);
            })
        return () => result();
    }
    const deletCAchorro = async(cachorro : Cachorro) => {
        const result = await cachorroRef.doc(cachorro.id).delete()
        .then(()=>{
            alert('Cachorro excluido!');
            cancelar();
            setRefresh(true);
        });
    }

    const Item = ({ item }) => (
        <View style={meuestilo.item}>
            <Pressable 
                onPress={ () => editCAchorro(item)} 
                onLongPress={ () => alert("Excluir") }
            >
                <View style={meuestilo.alinhamentoLinha}>
                    <Image  style={{ height: 80, width: 80, borderRadius: 10}} 
                            source={{ uri: item.urlfoto}} />
                            
                    <View style={meuestilo.alinhamentoColuna}>
                        <Text style={meuestilo.title}>Nome: {item.nome}</Text>
                        <Text style={meuestilo.title}>Raca: {item.raca}</Text>
                        <Text style={meuestilo.title}>Sexo: {item.sexo}</Text>
                        <Text style={meuestilo.title}>Data Nasc: {item.datanasc}</Text>
                    </View>
                </View>
            </Pressable>
        </View>
    );

    const renderItem = ({ item }) => <Item item={item}/>


    return(
        <ScrollView>
            <KeyboardAvoidingView style={meuestilo.container}>
                <Pressable onPress={() => escolheFoto()}>
                    {pickerImagePath === "" && (
                        <Image source={ require("../assets/camera.png") } 
                            style={meuestilo.imagem} />
                    )}
                    {pickerImagePath !== "" && (
                        <Image source={{ uri: pickerImagePath }} 
                            style={meuestilo.imagem} />
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

                <FlatList 
                    data={cachorros}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                    refreshing = {loading}
                />



            </KeyboardAvoidingView>
        </ScrollView>
    )

}

export default CachorroManter;