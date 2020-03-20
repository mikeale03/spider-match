import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text, Switch , TouchableNativeFeedback} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SetSpiders({spiders , onEdit, onAdd, onDelete}) {
    
    const addSpiderHandler = () => {
        const len = spiders.length;
        let spider = {
            key: Date.now().toString(),
            image:'',
            weight:'',
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

    const setOtherDetailsHandler = (val, index) => {
        const spider = {...spiders[index], otherDetails:val}
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
                                onChangeText={(val) => setOtherDetailsHandler(val, index)}
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
        flex: 2
    },
    imageWrapper: {
        height:70,
        width:70,
        borderRadius:10,
        backgroundColor:'gray'
    },
    listContainer: {
        flexDirection:'row',
        marginBottom: 10,
        flex: 1,
    },
    listInputContainer: {
        flex:5,
        paddingHorizontal:10,
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
        textAlign:'center',
        flex: 1
    },
    input: {
        height: 30,
        borderColor: 'gray',
        borderWidth: 1,
        flex:1,
        borderRadius:10,
        paddingHorizontal:10,
        marginBottom: 5
    },
    remove: {
        flex: 1,
        justifyContent:'center',
        alignItems:'flex-end',
    },
});