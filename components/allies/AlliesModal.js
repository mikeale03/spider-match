import React from 'react'
import { View, Modal, FlatList, Text, TouchableNativeFeedback } from 'react-native';
import ModalBody from '../custom/ModalBody';

export default function AlliesModal({onSelect, onRequestClose, setting, items}) {
    const onSelectHandler = (item) => {
        onSelect(item, setting.alliesIndex);
    }
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={setting.isVisible}
            onRequestClose={onRequestClose}
        >
            <ModalBody 
                headerText='Select Participants'
                items={items}
                onSelect={onSelectHandler}
            />
        </Modal>
    );
}