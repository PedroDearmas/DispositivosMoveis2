import React, {useState} from 'react';
import { StyleSheet, FlatList, TouchableOpacity, Text, SafeAreaView } from 'react-native';

const DATA = [
    { id: '4301602', title: 'Bagé' },
    { id: '4304358', title: 'Candiota' },
    { id: '4300034', title: 'Aceguá' },
    { id: '4300035', title: 'Aceguá' },
    { id: '4300036', title: 'Aceguá' },
    { id: '4300037', title: 'Aceguá' },
    { id: '4300038', title: 'Aceguá' },
    { id: '4300039', title: 'Aceguá' },
    { id: '4300040', title: 'Aceguá' },
    { id: '4300041', title: 'Aceguá' }
]


const Item = ({ item, onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.item}>
        <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
);

const Lista = (props) => {
    const [selectedId, setSelectedId] = useState('');

    const closeModal=(bool, item) => {
        props.setModalListaVisible(bool);
        props.setItemLista(item);
    }

    const renderItem = ({item}) => {
        return (
            <Item
                item = {item}
                onPress={ () => closeModal(false,item) }            
            />
        )
    };

    return (
        <SafeAreaView>        
            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id} //Pega o ID do item
                extraData={selectedId} //Pega os dados além do ID
            />
        </SafeAreaView>
    )

};

export default Lista;

const styles = StyleSheet.create({
    item: {
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: 'gray'
    },
    title: {
      fontSize: 20
    }
  });




