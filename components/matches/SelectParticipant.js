import React, { useState } from 'react';
import { View, StyleSheet, } from "react-native";
import PickerSelect from 'react-native-picker-select';
import pickerSelectStyles from '../../utils/stylesheets/pickerSelectStyles';

export default function SelectParticipant({items, onSelectParticipant, onSelectSpider}) {

    const [participant, setParticipant] = useState(null);
    const [spider, setSpider] = useState({});
    const [spiderItems, setSpiderItems] = useState([]);
    
    const setSpiderHandler = (value) => {
        setSpider(value);
        onSelectSpider(value);
    }

    const setParticipantHandler = (value) => {
        setParticipant(value);
        onSelectParticipant(value);
        if(value) {
            const items = value.spiders.map((item) => ({
                label:'Wt: '+item.weight+'  '+item.otherDetails,
                value: item,
                key:item.key,
                color:'black'
            }));
            setSpiderItems(items);
        } else 
            setSpider(null);
    }

    return (
        <View style={styles.container}>
            <View style={styles.pickerWrapper}>
                <PickerSelect
                    style={pickerSelectStyles}
                    placeholder={{label:'Participant', value:null, color:'#9EA0A4'}}
                    value = {participant}
                    onValueChange={setParticipantHandler}
                    items={items}
                />
            </View>
            <View style={styles.pickerWrapper}>
                <PickerSelect
                    style={pickerSelectStyles}
                    placeholder={{label:'Spider', value:null, color:'#9EA0A4'}}
                    value = {spider}
                    onValueChange={setSpiderHandler}
                    items={spiderItems}
                    disabled={participant === null}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    pickerWrapper: {
        //flex:1,
        //flexDirection:'row',
    },
});