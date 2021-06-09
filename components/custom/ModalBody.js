import React from 'react'
import { View, TouchableNativeFeedback, FlatList, Text } from 'react-native'

export default function ModalBody({headerText, items, onSelect}) {
    return (
        <View style={{ flex: 1, backgroundColor: '#00000066', justifyContent: 'center', alignItems: 'center', padding: 60 }}>
            <View style={{ backgroundColor: 'white', padding: 15, borderRadius: 10 }}>
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', alignSelf: 'stretch', textAlign: 'center', padding: 10 }}>{headerText}</Text>
                </View>
                <FlatList
                    style={{ flexGrow: 0 }}
                    contentContainerStyle={{ alignItems: 'center' }}
                    data={items}
                    renderItem={({ item }) => (
                        <TouchableNativeFeedback
                            onPress={onSelect.bind(null,item)}
                            background={TouchableNativeFeedback.SelectableBackground()} 
                        >
                            <View style={{ paddingVertical: 10, paddingHorizontal: 20, }}>
                                <Text style={{ fontSize: 16 }} numberOfLines={1}>{item.name}</Text>
                            </View>
                        </TouchableNativeFeedback>
                    )}
                />
            </View>
        </View>
    )
}
