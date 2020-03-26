import React from 'react';
import { View } from 'react-native';

const SMImage = ({
    shape = 'circle',
    size = 100,
}) => {

    return (
        <View style={{
                backgroundColor:'gray',
                width: size,
                height: size,
                borderRadius: shape == 'circle' ? size/2 : 10,
            }}>
        </View>
    )
}

export default SMImage;