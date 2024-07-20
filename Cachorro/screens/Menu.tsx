import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import CachorroManter from './CachorroManter';
import CachorroListar from './CachorroListar';
import RacaManter from './RacaManter';
import RacaListar from './RacaListar';
import HomeScreen from './HomeScreen';

function CachorroMantScreen({ navigation }) {
    return (
        <CachorroManter></CachorroManter>
    );
}
function CachorroListScreen({ navigation }) {
    return (
        <CachorroListar></CachorroListar>
    );
}

function RacaMantScreen({ navigation }) {
    return (
        <RacaManter></RacaManter>
    );
}
function RacaListScreen({ navigation }) {
    return (
        <RacaListar></RacaListar>
    );
}
function Logout({ navigation }){
    return (
        <HomeScreen></HomeScreen>
    );
}



const Drawer = createDrawerNavigator();

export default function Menu() {
    return (
        <Drawer.Navigator initialRouteName='Manter Cachorro'>
            <Drawer.Screen name="Manter Cachorro" component={CachorroMantScreen} />
            <Drawer.Screen name="Listar Cachorro" component={CachorroListScreen} />
            <Drawer.Screen name="Manter Raça" component={RacaMantScreen} />
            <Drawer.Screen name="Listar Raça" component={RacaListScreen} />   
            <Drawer.Screen name='Logout' component={Logout} />                     
        </Drawer.Navigator>
    );
}