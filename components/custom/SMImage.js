import React from 'react';
import { View, Image } from 'react-native';

const SMImage = ({
    shape = 'circle',
    size = 100,
    uri,
    fallbackRender = () => null,
}) => {

    return (
        <View style={{
            backgroundColor:'gray',
            width: size,
            height: size,
            borderRadius: shape == 'circle' ? size/2 : 10,
            justifyContent:'center',
            alignItems:'center',
        }}>
            { 
                uri ? <Image style={{height:size,width:size, borderRadius:shape == 'circle' ? size/2 : 10}} source={{uri}}/> : 
                fallbackRender()
            }
        </View>
    )
}

export default SMImage;