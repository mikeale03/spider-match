import React from 'react';
import { View, StyleSheet, Text, Picker, Button } from 'react-native';

export default function CreateMatch(props) {
    return (
        <View style={styles.container}>
            <View style={styles.columnContainer}>
                <View style={styles.column}>
                    <View style={styles.pickerWrapper}>
                        <Picker 
                            style={{height:30, color:'#23A32F',  }}
                        >
                            <Picker.Item label='Select Participant' value='0' />
                            <Picker.Item label="Unfinished" value="name" />
                            <Picker.Item label="Cancelled" value="name" />
                        </Picker>
                    </View>
                    
                    <View style={styles.pickerWrapper}>
                        <Picker 
                            style={{height:30, color:'#23A32F', }}
                        >
                            <Picker.Item label="Finished" value="score" />
                            <Picker.Item label="Unfinished" value="name" />
                            <Picker.Item label="Cancelled" value="name" />
                        </Picker>
                    </View>
                </View>
                <View style={styles.vsWrapper}>
                    <Text>VS</Text>
                </View>
                <View style={styles.column}>
                    <View style={styles.pickerWrapper}>
                        <Picker 
                            style={{height:30, color:'#23A32F',  }}
                        >
                            <Picker.Item label="Finished" value="score" />
                            <Picker.Item label="Unfinished" value="name" />
                            <Picker.Item label="Cancelled" value="name" />
                        </Picker>
                    </View>
                    <View style={styles.pickerWrapper}>
                        <Picker 
                            style={{height:30, color:'#23A32F',  }}
                        >
                            <Picker.Item label="Finished" value="score" />
                            <Picker.Item label="Unfinished" value="name" />
                            <Picker.Item label="Cancelled" value="name" />
                        </Picker>
                    </View>
                </View>
            </View>
            <View style={styles.buttonsContainer}>
                <View style={styles.buttonsWrapper}>
                    <Button title='Cancel' />
                </View>
                <View style={styles.buttonsWrapper}>
                    <Button title='Done' />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    columnContainer: {
        flexDirection:'row',
        borderWidth:1,
        borderColor:'black'
    },
    column: {
        flex:1
    },
    pickerWrapper: {
        paddingVertical:10,
        borderColor:'red',
        borderWidth:1,
        //flex:1,
        //flexDirection:'row',
    },
    vsWrapper: {
        width:65,
        justifyContent:'center',
        alignItems:'center',
    },
    buttonsContainer: {
        justifyContent:'center',
        flexDirection:'row',
        marginVertical:15,
    },
    buttonsWrapper: {
        marginHorizontal:30
    }
});
