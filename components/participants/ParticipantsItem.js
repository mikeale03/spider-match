import React from 'react';
import { View, TouchableNativeFeedback, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

import { useDispatch } from 'react-redux';
import { deleteParticipant } from '../../redux/actions';
import ErrorCatch from '../error-catch/ErrorBoundary';
import SMImage from '../custom/SMImage';

function Item({participant}) {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    
    const onPressHandler = () => {
        navigation.navigate('SetParticipant', {participant});
    };

    const deleteHandler = () => {
        dispatch(deleteParticipant(participant));
    }
    
    return (
        <ErrorCatch>
            <View style={{flexDirection:'row', alignItems:'center', paddingVertical:10}}>
                <TouchableNativeFeedback
                    onPress={onPressHandler}
                    background={TouchableNativeFeedback.SelectableBackground()}
                >

                    <View style={{flex:4, alignItems:'center', flexDirection:'row'}}>
                        <SMImage shape='circle' size={50} />
                        <Text style={{paddingStart: 10, fontSize:15}} numberOfLines={2}>{participant.name}</Text>
                    </View>

                </TouchableNativeFeedback>

                    <View style={{flex:2, alignItems:'center', justifyContent:'center', flexDirection:'row'}}>  
                        <Text>{participant.score}</Text>
                        <TouchableNativeFeedback
                            onPress={deleteHandler}
                            background={TouchableNativeFeedback.SelectableBackground()} 
                        >
                            <View style={{position:'absolute', borderWidth:1, height:30, width: 30, borderRadius:15, borderColor:'#d4d4d4', right:10, alignItems:'center', justifyContent:'center'}}>
                                <AntDesign name="delete" size={20} color="#A36023" />
                            </View>
                        </TouchableNativeFeedback>
                    </View>
            </View>
        </ErrorCatch>
    )
}

export default Item;

const styles = StyleSheet.create({
    text: {
        color:'green'
    }
});