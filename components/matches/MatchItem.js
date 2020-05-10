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
            <View style={[
                styles.matchContainer,
                item.result === 'Draw' && {
                    borderWidth:.75, borderColor:'orange', borderBottomColor: 'orange', borderBottomWidth: .75,
                }
            ]}>
                <View style={[
                    styles.spiderContainer,
                    item.result === item.spiders[0].parentKey && {borderWidth:.74, borderColor:'green'}
                ]}>
                    <View>
                        <Text style={styles.participantNameText} numberOfLines={2}>
                            {item.spiders[0].participantName}
                        </Text>
                    </View>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Text>Wt: {item.spiders[0].weight.toString()}  </Text>
                        <Text style={{color:'#A36023'}}>
                                {item.spiders[0].isJoker && 'joker'}
                        </Text>
                    </View>
                </View>

                <View style={styles.vsContainer}>
                    <Text>VS</Text>
                </View>

                <View style={[
                    styles.spiderContainer,
                    item.result === item.spiders[1].parentKey && {borderWidth:.74, borderColor:'green'}
                ]}>
                    <View>
                        <Text style={styles.participantNameText} numberOfLines={2}>
                            {item.spiders[1].participantName}
                        </Text>
                    </View>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Text>Wt: {item.spiders[1].weight.toString()}  </Text>
                        <Text style={{color:'#A36023'}}>
                                {item.spiders[1].isJoker && 'joker'}
                        </Text>
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
        marginBottom: 5,
    },
    spiderContainer: {
        flex:5,
        height:70,
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal:5,
    },
    participantNameText: {
        textAlign:'center',
        fontWeight:'bold',
    },
    vsContainer: {
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    checkBoxContainer: {
        justifyContent:'center',
        alignItems:'center'
    }
});