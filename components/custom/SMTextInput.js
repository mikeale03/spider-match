import React from 'react';
import { TextInput } from 'react-native';

const SMTextInput = ({
    size,
    ...rest
}) => {

    var inputSize = 40;
    if (size == 'sm')
        inputSize = 30;
    else if (size == 'lg')
        inputSize = 50;
    
    return (
        <TextInput
        {...rest}
        style={{
            height: inputSize,
            borderColor:'gray',
            borderWidth:1,
            flex:1,
            borderRadius:10,
            paddingHorizontal:10
        }}
        />
    )
}

export default SMTextInput;