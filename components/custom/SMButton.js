import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

const SMButton = ({
    theme = 'primary',
    title,
    onPress
}) => {

    // Set Theme Color
    var bgColor = '#333332';
    var textColor = '#23A32F';
    if (theme != 'primary') {
        if (theme == 'white') {
            bgColor = '#fff';
            textColor = '#333';
        } else if (theme == 'green') {
            bgColor = '#23A32F';
            textColor = '#fff';
        }
        else {
            // other theme styles here
        }
    }

    
    return (
        <TouchableOpacity
            onPress={onPress}
        >
            <View style={{backgroundColor: bgColor, padding:10, borderRadius:5}}>
                <Text style={{color:textColor}}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default SMButton;