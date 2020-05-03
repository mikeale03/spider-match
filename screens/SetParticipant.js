import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';
import { useDispatch } from "react-redux";
import * as actions /*{ actions.addParticipant, updateParticipant, addNotMatch }*/ from '../redux/actions';
import * as DB from "../custom-modules/database";
import Header from '../components/custom/Header';
import Spiders from '../components/set-participant/SetSpiders';
import ErrorBoundary from  '../components/error-catch/ErrorBoundary';
import SMTextInput from '../components/custom/SMTextInput';
import SMImage from '../components/custom/SMImage';
import { participants } from '../components/TempData';

export default function SetParticipant({route, navigation}) {
    const dispatch = useDispatch();
    const [participant, setParticipant] = useState({});
    const [name, setName] = useState('');
    const [spiders, setSpiders] = useState([]);

    useEffect(() => {
        const p = route.params?.participant ? 
            route.params.participant : { key:Date.now().toString(), name:'', image:'', alliesKey: null, score:0, spiders: [] }
        setParticipant(p);
        setName(p.name);
        setSpiders(p.spiders);
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

    const addParticipant = async (participant) => {
        const spiders = JSON.stringify(participant.spiders);
        const participantData = {...participant, spiders};
        try {
            const res = await DB.insertIntoTable('participants', participantData);
            dispatch(actions.addParticipant(participant));
            console.log(res);
            //dispatch(addNotMatch(newParticipant));
            
        } catch(error) {
            console.log(error);
        }
    }

    const updateParticipant = async (participant) => {
        const spiders = JSON.stringify(participant.spiders);
        const participantData = {...participant, spiders};
        try {
            const res = await DB.updateTable('participants', participantData, `key = ${participant.key}`);
            dispatch(actions.updateParticipant(participant));
            console.log(res);
        } catch(error) {
            console.log(error);
        }
    }

    const submitParticipant = () => {
        const length = spiders.length;
        let missingWeight = false;
        for(let i=0; i<length;i++) {
            if(!spiders[i].weight) {
                missingWeight = true;
                break;
            }
        }
        if(length === 0) {
            Alert.alert(
                'Missing field!',
                "Participant's spiders is required.",
                [
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false},
              );
        } else if(missingWeight) {
            Alert.alert(
                'Missing field!',
                "Spider's weight is required.",
                [
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false},
              );
        } else {
            let newSpiders = spiders.map( (item) => ({...item,participantName:name}) );
            newSpiders.sort((a,b) => a.weight - b.weight );
            const newParticipant = { ...participant, name, spiders:newSpiders };
            
            if(route.params) {
                updateParticipant(newParticipant);
            }
            else {
                addParticipant(newParticipant);
            }
            navigation.goBack();
        }
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
                onDone={submitParticipant} onClose={onCloseHandler}/>
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