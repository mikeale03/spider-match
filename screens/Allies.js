import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList,} from 'react-native';
import SMButton from '../components/custom/SMButton';
import Header from '../components/custom/Header';
import AlliesItem from '../components/allies/AlliesItem';
import  AlliesModal from '../components/allies/AlliesModal';
import { paddings, } from '../utils/stylesheets/spacing';
import ErrorBoundary from '../components/error-catch/ErrorBoundary'
import { useSelector, useDispatch } from 'react-redux';
import { updateAllies } from '../redux/actions';

export default function Allies(params) {

    const [items, setItems] = useState([]);
    const [modal, setModal] = useState({isVisible:false, alliesIndex:null,});
    const [alliesCopy, setAlliesCopy] = useState([]);
    const [participantsCopy, setParticipantsCopy] = useState([]);
    const participants = useSelector( state => state.participants );
    const allies = useSelector( state => state.allies );

    useEffect(() => {
        const newItems = participants.reduce((acc, item) => {
            const { key, name, } = item;
            if(item.alliesKey === null) {
                acc.push({ 
                    key,
                    name,
                })
            }
            return acc;
        },[]);
        setItems(newItems);
        setParticipantsCopy(participants);
    },[participants]);

    useEffect(() => {
        setAlliesCopy([...allies]);
    }, [allies])
    
    const updateItems = (newParticipants) => {
        const newItems = newParticipants.reduce((acc, item) => {
            const { key, name, } = item;
            if(item.alliesKey === null) {
                acc.push({ 
                    key,
                    name,
                })
            }
            return acc;
        },[]);
        setItems(newItems);
    }

    const updateParticipantsCopy = (participant, alliesKey) => {
        const newParticipants = participantsCopy.map((item) => {
            return item.key === participant.key ? {...item, alliesKey} : item
        });
        setParticipantsCopy(newParticipants);
        updateItems(newParticipants);
    }

    const onSelectHandler = (participant, alliesIndex) => {
        const newAllies = [...alliesCopy];
        const alliesKey = newAllies[alliesIndex].key;
        newAllies[alliesIndex].participants.push(participant);
        setAlliesCopy(newAllies);
        updateParticipantsCopy(participant, alliesKey);
        setModal({
            isVisible:false,
            alliesIndex:null,
        })
        
    }

    const onAddParticipantHandler = (alliesIndex) => {
        setModal({
            isVisible:true,
            alliesIndex,
        })
    }

    const onDeleteParticipantHandler = (participant, alliesIndex) => {
        const newAllies = [...alliesCopy];
        newAllies[alliesIndex].participants = newAllies[alliesIndex].participants.filter((item) => {
            return item.key === participant.key ? false : true ;
        });
        setAlliesCopy(newAllies);
        updateParticipantsCopy(participant, null);
    }

    return (
        <View style={[styles.container, paddings.paddingHeader]}>
            <View style={{paddingHorizontal:10}}>
                <FlatList
                    data={alliesCopy}
                    renderItem={({ item, index }) => (
                        <AlliesItem 
                            item={item}
                            onAddParticipant={() => onAddParticipantHandler(index)}
                            onDeleteParticipant={(participant) => onDeleteParticipantHandler(participant,index)}
                        />
                    )}
                />
                <View style={{alignItems:'center', marginTop:15}}>
                    <SMButton title='Add New Group' />
                </View>
            </View>
            <Header title='Set Allies' editMode={true}/>
            <AlliesModal 
                onSelect={onSelectHandler}
                onRequestClose={()=> setModal({isVisible:false, alliesIndex:null})}
                setting={modal}
                items={items}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    
    pickerContainer: {
        borderColor:'#d4d4d4',
        borderWidth:1,
        borderRadius:5,
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputAndroid: {
        color: 'black',
    },
});