import React from 'react';
import { FlatList } from 'react-native';
import Item from './SpidersItem';

function List({spiders}) {
    return (
        <FlatList
            data={spiders}
            renderItem={({ item }) => (
                <Item spider={item} />
            )}
       />
    );
}

export default List;