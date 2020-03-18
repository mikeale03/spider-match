import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';
import Header from '../components/custom/Header';
import Spiders from '../components/set-participant/SetSpiders';
import ErrorBoundary from  '../components/error-catch/ErrorBoundary';

export default function SetParticipant({route, navigation}) {
    
    const participant = route.params?.participant ? 
        route.params.participant :
        {
            key:Date.now().toString(),
            name:'Gwapo',
            spiders: []
        } 
    const [name, setName] = useState(participant.name);
    const [spiders, setSpiders] = useState(participant.spiders);

    useEffect(() => {
        setName(participant.name);
        setSpiders(participant.spiders);
        console.log(name);
      }, [route.params]); 

    const setParticipantName = (val) => {
        setParticipant({...participant, name:val});
    }

    const onEditSpider = (spider) => {
        const newSpiders = spiders.map((item) => 
            item.key === spider.key ? spider : item 
        );
        setSpiders(newSpiders);
    }

    const onAddSpider = (spider) => {
        setSpiders([...spiders,spider]);
    }

    const onDeleteSpider = (spider) => {
        setSpiders(spiders.filter((item) => 
            item.key !== spider.key 
        ));
    }
    
    return (
        <View style={styles.container}>
            
            <ErrorBoundary>
                <KeyboardAvoidingView behavior="padding" enabled>
                <ScrollView keyboardShouldPersistTaps='always'>
                    <View style={styles.innerContainer}>
                        <View style={styles.profilePicContainer}>
                            <View style={styles.picWrapper}>

                            </View>
                        </View>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.input}
                                value = {name}
                                onChangeText={setName}
                                />
                        </View>
                        <Spiders spiders={spiders} 
                            onEdit={onEditSpider} 
                            onAdd={onAddSpider} 
                            onDelete={onDeleteSpider} />
                    </View>
                </ScrollView>
                </KeyboardAvoidingView>
            </ErrorBoundary>
            <Header title="Set Participant" editMode="true"/>
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