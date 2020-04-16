import React from 'react'
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native'
import { margins, } from '../../utils/stylesheets/spacing';
import { Ionicons } from '@expo/vector-icons';
import SMButton from '../../components/custom/SMButton';
import { AntDesign } from '@expo/vector-icons';

export default function AlliesItem({item, onAddParticipant, onDeleteParticipant, onDeleteGroup}) {

    const onAddParticipantHandler = () => {
        onAddParticipant(item);
    }

    return (
        <View style={[styles.card, margins.my1]}>
            <View style={[styles.cardHeader,margins.my2]}>
                <Text style={styles.cardTitleText} numberOfLines={1}>
                    {item.groupName}
                </Text>
                <TouchableNativeFeedback
                    onPress={onDeleteGroup}
                    background={TouchableNativeFeedback.SelectableBackground()} 
                >
                    <View style={{position:'absolute', borderWidth:1, height:30, width: 30, borderRadius:5, borderColor:'#d4d4d4', right:-10, top:-15, alignItems:'center', justifyContent:'center'}}>
                        <AntDesign name="close" size={20} color="#A36023" />
                    </View>
                </TouchableNativeFeedback>
            </View>
            <View style={styles.cardBody}>
                <View style={[styles.pickerContainer, margins.mt1]}>
                    { item.participants.map((item, index) => (
                        <View style={styles.itemContainer}
                            key={item.key}
                        >    
                            <View style={{flex:1}}>
                                <Text style={{fontSize:15}} numberOfLines={1}>
                                    {item.name}
                                </Text>
                            </View>
                            <TouchableNativeFeedback
                                onPress={() => onDeleteParticipant(item)}
                                background={TouchableNativeFeedback.SelectableBackground()} 
                            >
                                <Ionicons name='md-remove-circle-outline' size={25} color="#A36023" />
                            </TouchableNativeFeedback>
                        </View>
                    ))}
                </View>
                <View style={{...margins.my2,alignItems:'center'}}>
                    <SMButton title='Add Participant' theme='green' onPress={onAddParticipantHandler} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        borderWidth:1,
        borderRadius:10,
        paddingHorizontal:10,
        borderColor:'#d4d4d4',
    },
    cardHeader: {
        padding:10,
        alignItems:'center',
    },
    cardTitleText: {
        fontSize:15,
        fontWeight:'bold',
    },
    itemContainer: {
        paddingHorizontal:15,
        paddingVertical:10,
        flexDirection:'row',
        alignItems:'center',
        borderTopColor:'#ccc',
        borderBottomColor:'#ccc',
        borderTopWidth:0.5,
        borderBottomWidth:0.5,
    },
    cardBody: {
        
    },
});