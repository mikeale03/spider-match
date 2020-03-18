import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text, KeyboardAvoidingView } from 'react-native';
import Header from '../components/custom/Header';
import Spiders from '../components/set-participant/SetSpiders';
import ErrorBoundary from  '../components/error-catch/ErrorBoundary';

export default function SetParticipant({route, navigation}) {

    const init = route.params?.participant ? 
        route.params?.participant :
        {
            key:Date.now().toString(),
            name:'Gwapo',
            spiders: []
        } 
    const [participant, setParticipant] = useState(init);
    
    //useEffect(() => {
        
        console.log(participant);
        //setParticipant(participant);
    //});

    const setParticipantName = (val) => {
        setParticipant({...participant,name:val});
    }
    
    return (
        <View style={styles.container}>
            <Header title="Set Participant" editMode="true"/>
            <ErrorBoundary>
                <View style={styles.innerContainer}>
                    <View style={styles.profilePicContainer}>
                        <View style={styles.picWrapper}>

                        </View>
                    </View>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.input}
                            value = {participant.name}
                            onChangeText={setParticipantName}
                            />
                    </View>
                    <Spiders participant={participant} 
                        setParticipant={setParticipant}
                    />
                </View>
            </ErrorBoundary>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    innerContainer: {
        flex:1,
        paddingHorizontal:45
    },
    profilePicContainer: {
        marginTop:84,
        height:150,
        justifyContent:'center',
        alignItems:'center',
    },
    picWrapper: {
        backgroundColor:'gray',
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    inputWrapper: {
        flexDirection:'row',
        paddingVertical: 5
    },
    input: {
        height: 40,
        borderColor:'gray',
        borderWidth:1,
        flex:1,
        borderRadius:10
    },
});