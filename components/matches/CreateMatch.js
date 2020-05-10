import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, } from 'react-native';
import SelectParticipant from './SelectParticipant';
import SMButton from '../custom/SMButton';

export default function CreateMatch({notMatch, onCancel, onDone}) {
    
    const [items, setItems] = useState([]);
    const [participant1Items, setParticipant1Items] = useState([]);
    const [participant2Items, setParticipant2Items] = useState([]);
    const [spiders, setSpiders] = useState([null,null]);


    const onSelectParticipant1Handler = (value) => {
        if(value) {
            const newItems = items.filter((item) => {
                if (value.key === item.key) 
                    return false;
                else if (value.alliesKey !== null && item.value.alliesKey !== null)
                    return value.alliesKey === item.value.alliesKey ? false : true;
                else return true;
            });
            setParticipant2Items(newItems);
        } else 
        setParticipant2Items(items);
    }

    const onSelectParticipant2Handler = (value) => {
        if(value) {
            const newItems = items.filter((item) => {
                if (value.key === item.key) 
                    return false;
                else if (value.alliesKey !== null && item.value.alliesKey !== null)
                    return value.alliesKey === item.value.alliesKey ? false : true;
                else return true;
            });
            setParticipant1Items(newItems);
        } else 
        setParticipant1Items(items);
    }

    const onSelectSpider1Handler = (value) => {
        const newSpiders = [...spiders];
        newSpiders[0] = value;
        setSpiders(newSpiders);
    }

    const onSelectSpider2Handler = (value) => {
        const newSpiders = [...spiders];
        newSpiders[1] = value;
        setSpiders(newSpiders);
    }

    const onDoneHandler = () => {
        if(spiders[0] !== null && spiders[1] !== null)
            onDone(spiders);
    }

    useEffect(() => {
        const newItems = notMatch.map( (item) => 
            ({label:item.name, value: item, key:item.key, color:'black'})
        );
        setItems(newItems);
        setParticipant1Items(newItems);
        setParticipant2Items(newItems);
        
    }, [notMatch])

    return (
        <View style={styles.container}>
            <View style={styles.columnContainer}>

                <SelectParticipant 
                    items={participant1Items}
                    onSelectParticipant={onSelectParticipant1Handler}
                    onSelectSpider={onSelectSpider1Handler}
                />
                
                <View style={styles.vsWrapper}>
                    <Text>VS</Text>
                </View>

                <SelectParticipant
                    items={participant2Items}
                    onSelectParticipant={onSelectParticipant2Handler}
                    onSelectSpider={onSelectSpider2Handler}
                />
                
            </View>

            <View style={styles.buttonsContainer}>
                <View style={styles.buttonsWrapper}>
                    <SMButton theme="green"  title='Cancel' onPress={onCancel}/>
                </View>
                <View style={styles.buttonsWrapper}>
                    <SMButton theme="green" title='Done' onPress={onDoneHandler}/>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10
    },
    columnContainer: {
        flexDirection:'row',
    },
    column: {
        flex:1
    },
    pickerWrapper: {
        paddingVertical:10,
    },
    vsWrapper: {
        width:65,
        justifyContent:'center',
        alignItems:'center',
    },
    buttonsContainer: {
        justifyContent:'flex-end',
        flexDirection:'row',
        marginTop:20,
        marginBottom:10
    },
    buttonsWrapper: {
        marginHorizontal:5
    }
});


  