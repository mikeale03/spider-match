import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text, Switch,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SMTextInput from '../custom/SMTextInput';
import SMButton from '../custom/SMButton';
import { margins } from '../../utils/stylesheets/spacing';
import SMImage from '../custom/SMImage';
import { FontAwesome5 } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

export default function SetSpiders({spiders , onEdit, onAdd, onDelete, onImageSelect}) {
    
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
    
    const isJokerSwitch = (index) => {
        const spider = {...spiders[index], isJoker:!spiders[index].isJoker}
        onEdit(spider);
    }

    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.titleText}>Spiders</Text>
            </View>
            { spiders && spiders.map((item, index) => (
                <View key={item.key} style={styles.listContainer}>
                    <View style={styles.imageContainer}>
                        <TouchableNativeFeedback onPress={onImageSelect.bind(null,item)}>
                            <SMImage shape='square' size={70} uri={item.image}
                                fallbackRender={() => (<FontAwesome5 name='spider' size={50*.6} color='#ccc'/>)}
                            />
                        </TouchableNativeFeedback>
                    </View>
                    <View style={styles.listInputContainer}>
                        <View style={[styles.listInputWrapper, margins.mb1,]}>
                            <SMTextInput
                                size='sm'
                                placeholder='Enter weight' 
                                value={item.weight ? item.weight.toString() : null}
                                keyboardType='numeric'
                                onChangeText={(val) => setWeightHandler(val, index)}
                                style={!item.weight && {borderColor:'red'}}
                            />
                        </View>
                        <View style={styles.listInputWrapper}>
                            <SMTextInput
                                size={'sm'}
                                placeholder='Other details..' 
                                value={item.otherDetails} 
                                onChangeText={(val) => setOtherDetailsHandler(val, index)}
                            />  
                        </View>
                    </View>
                    <View style={styles.switchContainer}>
                        <Text>joker?</Text>
                        <Switch
                            onValueChange={() => isJokerSwitch(index)}
                            value={item.isJoker}
                        />
                    </View>
                    <TouchableNativeFeedback onPress={() => deleteHandler(item)}>
                        <View style={styles.remove}>
                            <Ionicons name='md-remove-circle-outline' size={25} color="#A36023" />
                        </View>
                    </TouchableNativeFeedback>
                </View>
            ))}

            <View style={{alignItems:'center', padding:15}}>
                <SMButton title='Add spider' onPress={addSpiderHandler}/>
            </View>
            
        </View>
    ); 
};

const styles = StyleSheet.create({
    container: {

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
        padding: 15,
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
    remove: {
        flex: 1,
        justifyContent:'center',
        alignItems:'flex-end',
    },
});