import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';
import { useDispatch } from "react-redux";
import { addParticipant, updateParticipant, addNotMatch } from '../redux/actions';
import Header from '../components/custom/Header';
import Spiders from '../components/set-participant/SetSpiders';
import ErrorBoundary from  '../components/error-catch/ErrorBoundary';
import SMTextInput from '../components/custom/SMTextInput';
import SMImage from '../components/custom/SMImage';

export default function SetParticipant({route, navigation}) {
    const dispatch = useDispatch();
    
    const participant = route.params?.participant ? 
        route.params.participant : { key:Date.now().toString(), name:'', spiders: [] }

    const [name, setName] = useState(participant.name);
    const [spiders, setSpiders] = useState(participant.spiders);

    useEffect(() => {
        setName(participant.name);
        setSpiders(participant.spiders);
    }, [route.params]); 

    const onEditSpider = (spider) => {
        const newSpiders = spiders.map((item) => 
            item.key === spider.key ? spider : item 
        );
        setSpiders(newSpiders);
    }

    const onAddSpider = (spider) => {
        spider.parentKey = participant.key;
        setSpiders([...spiders,spider]);
    }

    const onDeleteSpider = (spider) => {
        setSpiders(spiders.filter((item) => 
            item.key !== spider.key 
        ));
    }

    const setParticipant = () => {
        let newSpiders = spiders.map( (item) => ({...item,participantName:name}) );
        newSpiders.sort((a,b) => a.weight - b.weight );
        const newParticipant = { ...participant, name, spiders:newSpiders };
        
        if(route.params) {
            dispatch(updateParticipant(newParticipant));
        }
        else {
            dispatch(addParticipant(newParticipant));
            dispatch(addNotMatch(newParticipant));
        }

        navigation.goBack();
    }

    const onCloseHandler= () => {
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <ErrorBoundary>
                <ScrollView keyboardShouldPersistTaps='always'>
                    <View style={styles.innerContainer}>
                        <View style={styles.profilePicContainer}>
                            <SMImage shape={'circle'} />
                        </View>
                        <View style={styles.inputWrapper}>
                            <SMTextInput
                                value={name}
                                onChangeText={setName}
                                autoFocus={true}
                                />
                        </View>
                        <KeyboardAvoidingView behavior="margin" enabled>
                            <Spiders spiders={spiders} 
                                onEdit={onEditSpider} 
                                onAdd={onAddSpider} 
                                onDelete={onDeleteSpider} />
                        </KeyboardAvoidingView>
                    </View>
                </ScrollView>
            </ErrorBoundary>
            <Header title="Set Participant" editMode="true"
                onDone={setParticipant} onClose={onCloseHandler}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    innerContainer: {
        flex:1,
        paddingHorizontal:15
    },
    profilePicContainer: {
        marginTop:84,
        height:150,
        justifyContent:'center',
        alignItems:'center',
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
        borderRadius:10,
        paddingHorizontal:10
    },
});