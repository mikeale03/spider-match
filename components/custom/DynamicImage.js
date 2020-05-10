import React from 'react';
import { View, Image } from 'react-native';

const image = ({
    maxSize = 200,
    uri,
    fallbackRender = () => null,
}) => {

    return (
        <View style={{
            backgroundColor:'#ccc',
            //flexGrow:1,
            //aspectRatio:1,
            //maxWidth:maxSize,
            //borderRadius: 10,
            justifyContent:'center',
            //alignItems:'center',
            flex:1,
            flexDirection:'row'
        }}>
            { 
                uri ? <Image style={{
                    flexGrow:1,
                    aspectRatio:1,
                    maxWidth:maxSize,
                    borderRadius: 10,
                }} source={{uri}}/> : 
                fallbackRender()
            }
        </View>
    )
}

export default image;