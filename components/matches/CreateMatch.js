import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, } from 'react-native';
import SelectParticipant from './SelectParticipant';
import SMButton from '../custom/SMButton';

export default function CreateMatch({notMatch, onCancel, onDone}) {
    
    const [items, setItems] = useState([]);
    const [participant1Items, setParticipant1Items] = useState([]);
    const [participant2Items, setParticipant2Items] = useState([]);
    const [match, setMatch] = useState([null,null]);


    const onSelectParticipant1Handler = (value) => {
        if(value) {
            const newItems = items.filter((item) => (value.key !== item.key && value.alliesKey !== item.value.alliesKey));
            setParticipant2Items(newItems);
        } else 
        setParticipant2Items(items);
    }

    const onSelectParticipant2Handler = (value) => {
        if(value) {
            const newItems = items.filter((item) => (value.key !== item.key && value.alliesKey !== item.value.alliesKey));
            setParticipant1Items(newItems);
        } else 
        setParticipant1Items(items);
    }

    const onSelectSpider1Handler = (value) => {
        const newMatch = [...match];
        newMatch[0] = value;
        setMatch(newMatch);
    }

    const onSelectSpider2Handler = (value) => {
        const newMatch = [...match];
        newMatch[1] = value;
        setMatch(newMatch);
    }

    const onDoneHandler = () => {
        if(match[0] !== null && match[1] !== null)
            onDone(match);
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


  