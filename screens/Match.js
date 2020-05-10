import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableNativeFeedback, Image } from 'react-native';
import SMButton from '../components/custom/SMButton';
import { useDispatch } from 'react-redux';
import * as actions from '../redux/actions';
import * as DB from '../custom-modules/database';
import { ScrollView } from 'react-native-gesture-handler';
import { FontAwesome5 } from '@expo/vector-icons';

export default function Match({route}) {
    const dispatch = useDispatch();
    const { matchItem } = route.params;
    const [result, setResult] = useState(null);
    const [winSpider, setWinSpider] = useState(null);
    const [prevScore, setPrevScore] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const onResultSelectHandler = async (value) => {
        const p1key = matchItem.spiders[0].isJoker ? 'null' : matchItem.spiders[0].parentKey;
        const p2key = matchItem.spiders[1].isJoker ? 'null' : matchItem.spiders[1].parentKey;
        const DRAW_SCORE = 0.5;
        const WIN_SCORE = 1;
        let score;
        try {
            if(value !== 'Draw') {
                score = value.isJoker ? 0 : WIN_SCORE;
                if(!value.isJoker) {
                    await DB.addParticipantScore(score, `key = ${value.parentKey}`);
                    await DB.updateTable('matches', {result:value.parentKey, score}, `key = ${matchItem.key}`);
                    dispatch(actions.addScore(score,[value.parentKey]));
                }
                setWinSpider(value);
                value = value.parentKey;
            } else {
                score = DRAW_SCORE;
                await DB.addParticipantScore(score, `key = ${p1key} OR key = ${p2key}`);
                await DB.updateTable('matches',
                    {result:value, score, participant1:p1key, participant2:p2key},
                    `key = ${matchItem.key}`
                );
                dispatch(actions.addScore(score,[p1key, p2key]));
            }
            if(result !== null && result === 'Draw') {
                await DB.addParticipantScore(-prevScore, `key = ${p1key} OR key = ${p2key}`);
                dispatch(actions.addScore(-prevScore,[p1key, p2key]))
            } else if (result !== null) {
                await DB.addParticipantScore(-prevScore, `key = ${result}`);
                dispatch(actions.addScore(-prevScore,[result]))
            }
            const newMatchItem = {...matchItem, result:value, score};
            dispatch({
                type:'UPDATE_MATCH',
                match:newMatchItem
            })
            setResult(value);
            setPrevScore(score);
            setIsModalVisible(false);
        } catch(error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if(matchItem.result) {
            setResult(matchItem.result);
            setPrevScore(matchItem.score);
            setWinSpider(matchItem.spiders.find((spider) => spider.parentKey === matchItem.result))
        }
        //console.log(matchItem);
    },[matchItem])

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent:'center'}}>
                <View style={styles.matchContainer}>
                    <View style={styles.matchImagesContainer}>
                        <View style={styles.imageContainer}>
                            { matchItem.spiders[0].image ? 
                                (<Image style={styles.imageWrapper} source={{uri:matchItem.spiders[0].image}}/>) :
                                (<View style={styles.imageWrapper}>
                                    <FontAwesome5 name='spider' size={60} color='#ccc'/>
                                </View>)
                            }
                        </View>
                        <View style={styles.vsContainer}>
                            <Text style={{fontSize:30, fontWeight:'bold'}}>VS</Text>
                        </View>
                        <View style={styles.imageContainer}>
                            { matchItem.spiders[1].image ? 
                                (<Image style={styles.imageWrapper} source={{uri:matchItem.spiders[1].image}}/>) :
                                (<View style={styles.imageWrapper}>
                                    <FontAwesome5 name='spider' size={60} color='#ccc'/>
                                </View>)
                            }
                        </View>
                    </View>
                    <View style={styles.matchDetailsContainer}>
                        <View style={styles.detailsWrapper}>
                            <Text style={[styles.participantName]} numberOfLines={2}>
                                {matchItem.spiders[0].participantName}
                            </Text>
                            <View style={{flexDirection:'row', alignItems:'center'}}>
                                <Text style={styles.text}>Wt: {matchItem.spiders[0].weight}  </Text>
                                <Text style={[styles.text,{color:'#A36023'}]}>
                                    {matchItem.spiders[0].isJoker && 'joker'}
                                </Text>
                            </View>
                            <Text style={styles.text}  numberOfLines={2}>
                                {matchItem.spiders[0].otherDetails}
                            </Text>
                        </View>
                        <View style={styles.detailsWrapper}>
                            <Text style={[styles.participantName]}>{matchItem.spiders[1].participantName}</Text>
                            <View style={{flexDirection:'row', alignItems:'center'}}>
                                <Text style={styles.text}>Wt: {matchItem.spiders[1].weight}  </Text>
                                <Text style={{color:'#A36023'}}>
                                    {matchItem.spiders[1].isJoker && 'joker'}
                                </Text>
                            </View>
                            <Text style={styles.text}>{matchItem.spiders[1].otherDetails}</Text>
                        </View>
                    </View>
                    <View style={{alignItems:'center', paddingTop:10}}>
                        <SMButton title='Result:' onPress={() => setIsModalVisible(true)} />
                        { result !== null && (
                            <Text style={[styles.participantName,{marginTop:10}]} numberOfLines={2}>
                                {result === 'Draw' ? result : winSpider.participantName+' wins'}
                            </Text>
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
                                { matchItem.spiders.map((item) => (
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
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 24,
        //alignItems:'stretch',
        //justifyContent:'center',
    },
    matchContainer: {
        paddingTop: 10,
    },
    scrollView: {
        flex: 1,
    },
    
    matchImagesContainer: {
        flexDirection:'row',
        paddingHorizontal:15,
        paddingBottom:15,
    },
    imageContainer: {
        justifyContent:'center',
        flex:1,
        flexDirection:'row'
    },
    imageWrapper: {
        backgroundColor:'gray',
        flexGrow:1,
        aspectRatio:1,
        maxWidth:200,
        borderRadius: 10,
        alignItems:'center',
        justifyContent:'center',
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
    },
    text: {
        fontSize:15,
        textAlign:'center',
    },
    participantName: {
        fontSize:18,
        fontWeight:'bold',
        textAlign:'center',
    }
});