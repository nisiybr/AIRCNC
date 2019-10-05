import React , {useState, useEffect } from 'react';
import {SafeAreaView,ScrollView, Text,AsyncStorage,Image,StyleSheet,Platform} from 'react-native';

import SpotList from '../components/SpotList';


import logo from '../assets/logo.png';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function List({navigation}) {
    
    const [techs,setTechs] = useState([]);
    async function logout(){
        await AsyncStorage.removeItem('user')
        navigation.navigate('Login');
    }
   

    useEffect(() => {
        AsyncStorage.getItem('techs').then(storagedTechs => {
           const techsArray = storagedTechs.split(',').map(tech => tech.trim());
            
           setTechs(techsArray);
           console.log(techsArray);

        })
    } , [])

    return (
    <SafeAreaView style={styles.container}>

        <Image source={logo} style={styles.logo}/>
        <TouchableOpacity onPress={logout} style={styles.exitButton}>
            <Text style={styles.exitButtonText}>Sair</Text>
        </TouchableOpacity>              
        <ScrollView style={styles.scrollView}>
            {techs.map(tech => <SpotList key={tech} tech={tech} /> )}
        </ScrollView>
    </SafeAreaView>
    
    
    )
}



const styles    = StyleSheet.create({
    container:{
        paddingTop: Platform.OS === 'android' ? 25:0,
        flex:1,
    },
    logo: {
        height: 32,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 10,

    },
    exitButton: {
        height: 30,
        width: 100,
        alignSelf: 'flex-end',
        marginRight:20,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginTop: 15,
        marginBottom:10,
    },
    exitButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
    },
    scrollView: {
        marginBottom:10,
    },
});

