import React from 'react'
import { View, StyleSheet, Text, CheckBox, TouchableNativeFeedback } from 'react-native'

export default function MatchItem({item, onLongPress, onPress}) {

    const onLongPressHandler = () => {
        onLongPress(item);
    }

    const onPressHandler = () => {
        onPress(item);
    }

    return (
        <TouchableNativeFeedback
                onLongPress={onLongPressHandler}
                onPress={onPressHandler}
        >
            <View style={styles.matchContainer}>
                <View style={styles.spiderContainer}>
                    <View>
                        <Text style={styles.participantNameText}>{item.spiders[0].participantName}</Text>
                    </View>
                    <View>
                        <Text>Wt: {item.spiders[0].weight.toString()}</Text>
                    </View>
                </View>

                <View style={styles.vsContainer}>
                    <Text>VS</Text>
                </View>

                <View style={styles.spiderContainer}>
                    <View>
                        <Text style={styles.participantNameText}>{item.spiders[1].participantName}</Text>
                    </View>
                    <View>
                        <Text>Wt: {item.spiders[1].weight.toString()}</Text>
                    </View>
                </View>
            </View>
        </TouchableNativeFeedback>
    );
}

const styles = StyleSheet.create({
    matchContainer: {
        flexDirection:'row',
        borderBottomColor: '#ccc',
        borderBottomWidth: .75,
        flex:1,
    },
    spiderContainer: {
        flex:5,
        height:70,
        justifyContent:'center',
        alignItems:'center'
    },
    participantNameText: {
        textAlign:'center',
        fontWeight:'bold',
    },
    vsContainer: {
        flex:2,
        justifyContent:'center',
        alignItems:'center'
    },
    checkBoxContainer: {
        justifyContent:'center',
        alignItems:'center'
    }
});