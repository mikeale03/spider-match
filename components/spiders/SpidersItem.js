import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

function Item({spider}) {
    let [input, setInput] = useState('');
    let [curItem, setCurItem] = useState( { ...spider, isInputVisible:false } );

    return (
        <View style={{ borderBottomWidth:1,borderColor:'#909396', flexDirection:'row', alignItems:'center' }}>
            <Text>Weight: </Text>
            <View style={{flex:1}} >
                { curItem.isInputVisible ?
                <TextInput value={input} onChangeText={setInput}
                    keyboardType='numeric'
                    autoFocus={true}
                    onBlur={() => {
                        setCurItem(Object.assign({},curItem,{weight:input,isInputVisible:false}))
                        
                    }} 
                /> :
                <Text style={{padding: 7}}>{curItem.weight}</Text>
                }
            </View> 
            <View style={{margin:5}}>   
                <Button title="Edit" onPress={ () => 
                    { setCurItem({...curItem, isInputVisible:true}) } 
                } />
            </View>
            <View style={{margin:5}}>
                <Button title="Delete" />
            </View>
        </View>
    )
}

export default Item;