import React , {useState} from 'react';
import {Alert ,SafeAreaView,Text,StyleSheet, Platform ,TextInput, TouchableOpacity, AsyncStorage} from 'react-native';

import api from '../services/api';

export default function Book({navigation}) {
    const id = navigation.getParam('id');

    const [date,setdate] = useState('');

    async function handleSubmit(){
        const user_id = await AsyncStorage.getItem('user');
        await api.post(`/spots/${id}/bookings`,{
            date
        },{
            headers:{user_id}
        });
        Alert.alert('Sua reserva foi realizada!');
        navigation.navigate('List');
    }
    function submitCancel(){
        navigation.navigate('List');
    }

    return(

    <SafeAreaView style={s.container}>
            <Text style = {s.label}>DATA DE INTERESSE *</Text>
            <TextInput 
                style={s.input}
                placeholder="Qual data você quer reservar"
                placeholderTextColor="#999"
                autoCapitalize="words"
                autoCorrect={false}
                value={date}
                onChangeText ={ setdate }
            />

            <TouchableOpacity onPress={handleSubmit} style={s.button}>
                <Text style={s.buttonText}>Solicitar reserva</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={submitCancel} style={[s.button,s.cancelButton]}>
                <Text style={s.buttonText}>Cancelar</Text>
            </TouchableOpacity>            


       
    </SafeAreaView>
        
    ) 
    
}


const s = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'android'?25:0,
        marginBottom:8,
        margin: 30,

    },

    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
        marginTop: 20,

    },
    input:{
        borderWidth: 1,
        borderColor: "#ddd",
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2,

    },

    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
    },
    cancelButton: {
        marginTop: 10,
        backgroundColor: '#ccc',
    },

    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});