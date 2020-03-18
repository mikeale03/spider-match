import React from 'react';
import { FlatList } from 'react-native';
import Item from './ParticipantsItem';

function List(props) {
    return (
        <FlatList
            data={props.participants}
            renderItem={({ item }) => (
                <Item participant={item} />
            )}
       />
    );
}

export default List;