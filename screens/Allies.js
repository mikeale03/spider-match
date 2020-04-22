import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, AsyncStorage } from 'react-native';
import SMButton from '../components/custom/SMButton';
import Header from '../components/custom/Header';
import AlliesItem from '../components/allies/AlliesItem';
import  AlliesModal from '../components/allies/AlliesModal';
import { paddings, } from '../utils/stylesheets/spacing';
import ErrorBoundary from '../components/error-catch/ErrorBoundary'
import { useSelector, useDispatch } from 'react-redux';
import { updateAllies, updateParticipants, updateParticipant } from '../redux/actions';

export default function Allies({navigation, route}) {

    const [items, setItems] = useState([]);
    const [modal, setModal] = useState({isVisible:false, alliesIndex:null,});
    const participants = useSelector( state => state.participants );
    const allies = useSelector( state => state.allies );
    const fetchingDone = useSelector( state => state.fetchingDone );
    const dispatch = useDispatch();
    
    useEffect(() => {
        navigation.setOptions = {
            tabBarVisible:false,
        }
    },[]);

    useEffect(() => {
        const newItems = updateItems(participants);
        setItems(newItems);
    }, [participants]);

    const setData = async () => {
        try{
            await AsyncStorage.setItem('allies', JSON.stringify(allies));
        } catch(e) {
            alert(e);
        }
    }

    useEffect(() => {
        fetchingDone && setData();
    },[allies]);

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
        return newItems;
    }

    const updateParticipantsAlliesKey = (participant, alliesKey, newParticipants = participants) => {
        newParticipants = newParticipants.map((item) => {
            return item.key === participant.key ? {...item, alliesKey} : item
        });
        return newParticipants;
    }

    const onSelectHandler = (participant, alliesIndex) => {
        const newAllies = [...allies];
        const alliesKey = newAllies[alliesIndex].key;
        newAllies[alliesIndex].participants.push(participant);
        const newParticipants = updateParticipantsAlliesKey(participant, alliesKey);
        dispatch(updateParticipants(newParticipants));
        dispatch(updateAllies(newAllies));
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
        const newAllies = [...allies]
        newAllies[alliesIndex].participants = newAllies[alliesIndex].participants.filter((item) => {
            return item.key === participant.key ? false : true ;
        });
        
        const newParticipants = updateParticipantsAlliesKey(participant, null);
        dispatch(updateParticipants(newParticipants));
        dispatch(updateAllies(newAllies));
    }

    const onAddNewGroupHandler = () => {
        let ctr = allies.length+1;
        if(ctr>1 && allies[allies.length-1].participants.length < 1) {
            return
        }
        dispatch(updateAllies([...allies, { 
            key:Date.now().toString(),
            groupName:'Group '+ctr,
            participants:[],
        }]));
    }

    const onDeleteGroupHandler = (alliesIndex) => {
        let newAllies = [...allies];
        let alliesParticipants = newAllies[alliesIndex].participants;
        const length = alliesParticipants.length;
        let newParticipants;
        if(length)
            newParticipants = updateParticipantsAlliesKey(alliesParticipants[0], null);
        if(length>1)
            for(let i=1;i<length;i++) {
                newParticipants = updateParticipantsAlliesKey(alliesParticipants[i], null, newParticipants);
            }
        if(newParticipants) {
            dispatch(updateParticipants(newParticipants));
        }
        newAllies.splice(alliesIndex,1);
        dispatch(updateAllies(newAllies));
    }

    return (
        <View style={[styles.container, paddings.paddingHeader]}>
            <ErrorBoundary>
                <View style={{paddingHorizontal:10, flex:1,}}>
                    <FlatList
                        data={allies}
                        renderItem={({ item, index }) => (
                            <AlliesItem 
                                item={item}
                                onAddParticipant={() => onAddParticipantHandler(index)}
                                onDeleteParticipant={(participant) => onDeleteParticipantHandler(participant,index)}
                                onDeleteGroup={() => {onDeleteGroupHandler(index)}}
                            />
                        )}
                    />
                </View>
                <View style={{alignItems:'center', paddingVertical:15, borderTopColor:'#ccc', borderTopWidth:1}}>
                    <SMButton title='Add New Group' onPress={onAddNewGroupHandler} />
                </View>
                <Header title='Set Allies' onClose={() => navigation.goBack()} />
                <AlliesModal 
                    onSelect={onSelectHandler}
                    onRequestClose={()=> setModal({isVisible:false, alliesIndex:null})}
                    setting={modal}
                    items={items}
                />
            </ErrorBoundary>
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

