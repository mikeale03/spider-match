import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableNativeFeedback } from 'react-native';
import SMButton from '../components/custom/SMButton';
import { useDispatch } from 'react-redux';

export default function Match({route}) {
    const dispatch = useDispatch();
    const { matchItem } = route.params;
    const [result, setResult] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const onResultSelectHandler = (value) => {
        const res = {prev:result, next:value};
        dispatch({
             type:'UPDATE_SCORE',
             result:res,
        });
        //console.log(res);
        const newMatchItem = {...matchItem, result:value};
        dispatch({
            type:'UPDATE_MATCH',
            match:newMatchItem
        })
        setResult(value);
    }

    useEffect(() => {
        if(matchItem.result) {
            setResult(matchItem.result);
        }
        console.log(matchItem);
    },[matchItem])

    return (
        <View style={styles.container}>
            <View style={styles.matchContainer}>
                <View style={styles.matchImagesContainer}>
                    <View style={styles.imageContainer}>
                        <View style={styles.imageWrapper}>

                        </View>
                    </View>
                    <View style={styles.vsContainer}>
                        <Text style={{fontSize:30, fontWeight:'bold'}}>VS</Text>
                    </View>
                    <View style={styles.imageContainer}>
                        <View style={styles.imageWrapper}>

                        </View>
                    </View>
                </View>
                <View style={styles.matchDetailsContainer}>
                    <View style={styles.detailsWrapper}>
                        <Text>{matchItem.match[0].participantName}</Text>
                        <Text>Wt: {matchItem.match[0].weight}</Text>
                        <Text>{matchItem.match[0].otherDetails}</Text>
                    </View>
                    <View style={styles.detailsWrapper}>
                        <Text>{matchItem.match[1].participantName}</Text>
                        <Text>Wt: {matchItem.match[1].weight}</Text>
                        <Text>{matchItem.match[1].otherDetails}</Text>
                    </View>
                </View>
                <View style={{alignItems:'center'}}>
                    <SMButton title='Result:' onPress={() => setIsModalVisible(true)} />
                    { result !== null && (
                        <Text>{result === 'Draw' ? result : result.participantName+' wins'}</Text>
                    )}
                </View>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View style={{ flex: 1, backgroundColor: '#00000066', justifyContent: 'center', alignItems: 'center', padding: 60 }}>
                    <View style={{ backgroundColor: 'white', padding: 15, borderRadius: 10 }}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', alignSelf: 'stretch', textAlign: 'center', padding: 10 }}>Select Result</Text>
                        </View>
                            { matchItem.match.map((item) => (
                                <TouchableNativeFeedback
                                    onPress={() => onResultSelectHandler(item)}
                                    key={item.key}
                                >
                                    <View style={{ paddingVertical: 10, paddingHorizontal: 20, alignItems:'center' }}>
                                        <Text style={{ fontSize: 16 }} numberOfLines={1}>{item.participantName} wins</Text>
                                    </View>
                                </TouchableNativeFeedback>
                            ))}
                            <TouchableNativeFeedback
                                onPress={() => onResultSelectHandler('Draw')}
                            >
                                <View style={{ paddingVertical: 10, paddingHorizontal: 20, alignItems:'center' }}>
                                    <Text style={{ fontSize: 16 }} numberOfLines={1}>Draw</Text>
                                </View>
                            </TouchableNativeFeedback>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'stretch',
        justifyContent:'center'
    },
    matchContainer: {
        borderWidth:1,
    },
    matchImagesContainer: {
        flexDirection:'row',
        padding:15,
    },
    imageContainer: {
        justifyContent:'center',
        flex:1,
        flexDirection:'row'
    },
    imageWrapper: {
        backgroundColor:'#ccc',
        flexGrow:1,
        aspectRatio:1,
        maxWidth:200,
    },
    vsContainer: {
        justifyContent:'center',
        paddingHorizontal:15,
    },
    matchDetailsContainer: {
        flexDirection:'row',
    },
    detailsWrapper: {
        flex:1,
        alignItems:'center',
    }
});