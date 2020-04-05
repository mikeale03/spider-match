import React from 'react'
import { View, StyleSheet, Text, CheckBox, TouchableNativeFeedback } from 'react-native'

export default function MatchItem({item, onMark, onLongPress, showCheckBox}) {

    const onMarkHandler = () => {
        onMark(item);
    }

    return (
        <TouchableNativeFeedback
                onLongPress={onLongPress}
        >
            <View style={styles.matchContainer}>
                <View style={styles.spiderContainer}>
                    <View>
                        <Text style={styles.participantNameText}>{item.match[0].participantName}</Text>
                    </View>
                    <View>
                        <Text>Wt: {item.match[0].weight.toString()}</Text>
                    </View>
                </View>

                <View style={styles.vsContainer}>
                    <Text>VS</Text>
                </View>

                <View style={styles.spiderContainer}>
                    <View>
                        <Text style={styles.participantNameText}>{item.match[1].participantName}</Text>
                    </View>
                    <View>
                        <Text>Wt: {item.match[1].weight.toString()}</Text>
                    </View>
                </View>
                { showCheckBox && (
                        <View style={styles.checkBoxContainer}>
                            <CheckBox 
                                value={item.isMarked}
                                onValueChange={onMarkHandler}
                            />
                        </View>
                )}
            </View>
        </TouchableNativeFeedback>
    );
}

const styles = StyleSheet.create({
    matchContainer: {
        flexDirection:'row',
        borderBottomColor: '#ccc',
        borderBottomWidth: .75,
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