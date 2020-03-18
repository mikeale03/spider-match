import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text, Switch , TouchableNativeFeedback} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SetSpiders({participant , setParticipant}) {
    
    const spiders = participant.spiders;
    const onAddHandler = () => {
        let spider = {
            key: Date.now().toString(),
            parentKey:participant.key,
            image:'',
            weight:null,
            otherDetails:'bag.o ni',
            isJoker:false,
            status:'No Match',
        };
        
        setParticipant({
            ...participant, 
            spiders:[...spiders,spider]
        })
    }

    const setSpiderWeightHandler = (val, index) => {
        let newSpiders = [...spiders];
        newSpiders[index].weight = Number(val);
       
        setParticipant({
            ...participant, 
            spiders:newSpiders
        });
    }

    const onDeleteHandler = () => {

    }
    
    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.titleText}>Spiders</Text>
            </View>
            { spiders.map((item, index) => (
                <View key={item.key} style={styles.listContainer}>
                    <View style={styles.imageContainer}>
                        <View style={styles.imageWrapper}>

                        </View>
                    </View>
                    <View style={styles.listInputContainer}>
                        <View style={styles.listInputWrapper}>
                            <TextInput placeholder='Enter weight' style={styles.input} 
                                value={item.weight && item.weight.toString()}
                                keyboardType='numeric'
                                onChangeText={(val) => setSpiderWeightHandler(val, index)}
                                autoFocus={true}
                            />
                        </View>
                        <View style={styles.listInputWrapper}>
                            <TextInput placeholder='Other details..' style={styles.input} value={item.otherDetails} 
                                //onChangeText={setOtherDetails}
                                />
                        </View>
                    </View>
                    <View style={styles.switchContainer}>
                        <Text>joker?</Text>
                        <Switch />
                    </View>
                    <View style={styles.remove}>
                        <Ionicons name='md-remove-circle-outline' size={25} color="#A36023" />
                    </View>
                </View>
            ))}
            
            <TouchableNativeFeedback onPress={onAddHandler}>
                <View style={{alignItems:'center'}}>
                    <Text>Add</Text>
                </View>
            </TouchableNativeFeedback>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {

    },
    input: {
        height: 40,
        // borderColor: 'gray',
        // borderWidth: 1,
        flex:1,
        fontSize: 15,
        borderRadius:10,
        backgroundColor:'#e3e3e3',
        paddingHorizontal: 10,
    },
    imageContainer: {
        justifyContent:'center',
        alignItems:'center',
    },
    imageWrapper: {
        height:65,
        width:65,
        borderRadius:10,
        backgroundColor:'gray'
    },
    listContainer: {
        flexDirection:'row',
        marginBottom: 10,
        alignItems:'center',
    },
    listInputContainer: {
        flex:1,
        justifyContent:'space-between',
        paddingHorizontal:5,
    },
    listInputWrapper: {
        flexDirection:'row',
    },
    title: {
        justifyContent:'center',
        alignItems:'center',
        padding: 10,
        marginHorizontal:5,

    },
    titleText: {
        fontSize: 20,
    },
    switchContainer: {
        alignItems:'center',
        justifyContent:'center',
    },
    input: {
        height: 30,
        borderColor: 'gray',
        borderWidth: 1,
        flex:1,
        borderRadius:10,
        paddingHorizontal:10,
    },
    remove: {
        position: 'absolute',
        right: -30,
        justifyContent:'center',
        alignItems:'center',
    },
});