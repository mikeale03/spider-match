import React from 'react'
import { View, Modal, FlatList, Text, TouchableNativeFeedback } from 'react-native'

export default function AlliesModal({onSelect, onRequestClose, setting, items}) {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={setting.isVisible}
            onRequestClose={onRequestClose}
        >
            <View style={{ flex: 1, backgroundColor: '#00000066', justifyContent: 'center', alignItems: 'center', padding: 60 }}>
                <View style={{ backgroundColor: 'white', padding: 15, borderRadius: 10 }}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', alignSelf: 'stretch', textAlign: 'center', padding: 10 }}>Select participants</Text>
                    </View>
                    <FlatList
                        style={{ flexGrow: 0 }}
                        contentContainerStyle={{ alignItems: 'center' }}
                        data={items}
                        renderItem={({ item }) => (
                            <TouchableNativeFeedback
                                onPress={() => onSelect(item, setting.alliesIndex)}
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
        </Modal>
    );
}