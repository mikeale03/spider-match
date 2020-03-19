import React from 'react';
import { View, StyleSheet, Text, TouchableNativeFeedback } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';


export default function Header({title, onClose, onDone, editMode, hideArrowBack}) {
    
    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                { !hideArrowBack && (
                <TouchableNativeFeedback onPress={onClose}>
                    <View style={styles.close}>
                        { editMode ?
                            <AntDesign name='close' size={25} color="#23A32F" /> :
                            <MaterialIcons name='arrow-back' size={25} color="#23A32F" />
                        }
                    </View>
                </TouchableNativeFeedback> )
                }
                <View style={styles.title}>
                    <Text style={styles.titleText}>{title}</Text>
                </View>
                { editMode && (
                    <TouchableNativeFeedback onPress={onDone}>
                        <View style={styles.check}>
                            <AntDesign name='check' size={25} color="#23A32F" />
                        </View>
                    </TouchableNativeFeedback>
                    )
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        paddingTop:24,
        backgroundColor:'#1c1c1c',
        flexDirection:'row',
        top: 0,
        left:0,
    },
    wrapper: {
        flex:1,
        height:60,
        flexDirection:'row',
        alignItems:'center'
    },
    close: {
        padding:13,
    },
    title: {
        flex: 1,
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:10
    },
    titleText: {
        color:'#23A32F',
        fontSize: 20,
    },
    check: {
        padding:13
    }
});
