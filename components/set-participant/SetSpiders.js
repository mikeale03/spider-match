import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text, Switch , TouchableNativeFeedback} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SetSpiders({spiders , onEdit, onAdd, onDelete}) {
    
    //const spiders = participant.spiders;
    const addSpiderHandler = () => {
        const len = spiders.length;
        let spider = {
            key: Date.now().toString(),
            image:'',
            weight:null,
            otherDetails:'',
            isJoker:false,
            status:'No Match',
        };
        if (len === 0)
            onAdd(spider);
        else if ( spiders[len-1].weight ) 
            onAdd(spider);
    }

    const setWeightHandler = (val, index) => {
        val = Number(val);
        const spider = {...spiders[index], weight:val}
        onEdit(spider);
    }

    const deleteHandler = (spider) => {
        onDelete(spider);
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.titleText}>Spiders</Text>
            </View>
            { spiders && spiders.map((item, index) => (
                <View key={item.key} style={styles.listContainer}>
                    <View style={styles.imageContainer}>
                        <View style={styles.imageWrapper}>

                        </View>
                    </View>
                    <View style={styles.listInputContainer}>
                        <View style={styles.listInputWrapper}>
                            <TextInput placeholder='Enter weight' 
                                style={styles.input} 
                                value={item.weight ? item.weight.toString() : null}
                                keyboardType='numeric'
                                onChangeText={(val) => setWeightHandler(val, index)}
                                autoFocus={true}
                                blurOnSubmit={false}
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
                    <TouchableNativeFeedback onPress={() => deleteHandler(item)}>
                        <View style={styles.remove}>
                            <Ionicons name='md-remove-circle-outline' size={25} color="#A36023" />
                        </View>
                    </TouchableNativeFeedback>
                </View>
            ))}
            
            <TouchableNativeFeedback onPress={addSpiderHandler}>
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