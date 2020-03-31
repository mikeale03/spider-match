import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Picker, Button } from 'react-native';
import { useSelector } from "react-redux";
import PickerSelect from 'react-native-picker-select';
import SelectParticipant from './SelectParticipant';

export default function CreateMatch({notMatch, onCancel, onDone}) {
    
    const [items, setItems] = useState([]);
    const [participant1Items, setParticipant1Items] = useState([]);
    const [participant2Items, setParticipant2Items] = useState([]);
    const [match, setMatch] = useState([null,null]);


    const onSelectParticipant1Handler = (value) => {
        if(value) {
            const newItems = items.filter((item) => value.key !== item.key);
            setParticipant2Items(newItems);
        } else 
        setParticipant2Items(items);
    }

    const onSelectParticipant2Handler = (value) => {
        if(value) {
            const newItems = items.filter((item) => value.key !== item.key);
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
                    <Button title='Cancel' 
                        onPress={onCancel}
                    />
                </View>
                <View style={styles.buttonsWrapper}>
                    <Button title='Done' 
                        onPress={onDoneHandler}
                    />
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

const pickerSelectStyles = StyleSheet.create({
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
});
  