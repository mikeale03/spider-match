import React from 'react'
import { Modal } from 'react-native';
import ModalBody from '../custom/ModalBody';
import * as ImagePicker from 'expo-image-picker';

export default function SelectImageModal({onRequestClose, setting, onImagePick}) {
    const items = [{key:'1',name:'Camera'},{key:'2',name:'Gallery'}];

    const onSelectHandler = async (item) => {
        try {
            if(item.name === 'Camera') {
                const data = await ImagePicker.launchCameraAsync({allowsEditing:true, aspect:[1,1]});
                if(!data.cancelled) {
                    onImagePick(data.uri, setting.param);
                }

            } else {
                const data = await ImagePicker.launchImageLibraryAsync({          
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 1,
                });
                if(!data.cancelled) {
                    onImagePick(data.uri, setting.param);
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={setting.isVisible}
            onRequestClose={onRequestClose}
        >
            <ModalBody 
                headerText='Select image from:'
                items={items}
                onSelect={onSelectHandler}
            />
        </Modal>
    )
}
