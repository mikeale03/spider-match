import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, } from 'react-native';
import SMButton from '../components/custom/SMButton';
import Header from '../components/custom/Header';
import AlliesItem from '../components/allies/AlliesItem';
import  AlliesModal from '../components/allies/AlliesModal';
import { paddings, } from '../utils/stylesheets/spacing';
import ErrorBoundary from '../components/error-catch/ErrorBoundary'
import { useSelector, useDispatch } from 'react-redux';
import { updateAllies, updateParticipants, updateParticipant } from '../redux/actions';
import * as DB from "../custom-modules/database";

export default function Allies({navigation, route}) {

    const [items, setItems] = useState([]);
    const [modal, setModal] = useState({isVisible:false, alliesIndex:null,});
    const participants = useSelector( state => state.participants );
    const allies = useSelector( state => state.allies );
    const [isReady, setIsReady] = useState(false);
    const dispatch = useDispatch();
    
    useEffect(() => {
        navigation.setOptions = {
            tabBarVisible:false,
        }
        const fetchData = async () => {
            try {
                //const r = await DB.dropTable('allies');
                //console.log(r);
                const newAllies = await DB.initAllies();
                //console.info('allies: ', newAllies);
                dispatch(updateAllies(newAllies));
            } catch (error) {
                console.log(error);
            }
            setIsReady(true);
        }
        fetchData();
    },[]);

    useEffect(() => {
        const newItems = updateItems(participants);
        setItems(newItems);
    }, [participants]);

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

    const onSelectHandler = async (participant, alliesIndex) => {
        if(isReady) {
            try {
                const newAllies = [...allies];
                const alliesKey = newAllies[alliesIndex].key;
               
                newAllies[alliesIndex].participants.push(participant);
                const newParticipants = updateParticipantsAlliesKey(participant, alliesKey);
                await DB.updateTable('participants',{alliesKey}, `key = ${participant.key}`);
                await DB.updateTable(
                    'allies',
                    { participants:JSON.stringify(newAllies[alliesIndex].participants) },
                    `key = ${alliesKey}`
                );
                dispatch(updateParticipants(newParticipants));
                dispatch(updateAllies(newAllies));
                setModal({
                    isVisible:false,
                    alliesIndex:null,
                })
            } catch (error) {
                console.error(error);
            }
            setIsReady(true);
        }
        
    }

    const onAddParticipantHandler = (alliesIndex) => {
        setModal({
            isVisible:true,
            alliesIndex,
        })
    }

    const onDeleteParticipantHandler = async (participant, alliesIndex) => {
        if(isReady) {
            try {
                const newAllies = [...allies]
                newAllies[alliesIndex].participants = newAllies[alliesIndex].participants.filter((item) => {
                    return item.key === participant.key ? false : true ;
                });
                const newParticipants = updateParticipantsAlliesKey(participant, null);
                await DB.updateTable('participants', {alliesKey:null}, `key = ${participant.key}`);
                await DB.updateTable(
                    'allies',
                    { participants:JSON.stringify(newAllies[alliesIndex].participants) },
                    `key = ${allies[alliesIndex].key}`
                );
                dispatch(updateParticipants(newParticipants));
                dispatch(updateAllies(newAllies));
            } catch(error) {
                console.error(error);
            }
            setIsReady(true);
        }
    }

    const onAddNewGroupHandler = async () => {
        if(isReady) {
            try {
                let ctr = allies.length+1;
                if(ctr>1 && allies[allies.length-1].participants.length < 1) {
                    return
                }
                const newAllies = { 
                    key:Date.now().toString(),
                    groupName:'Group '+ctr,
                    participants:[],
                };
                await DB.insertIntoTable('allies', {...newAllies,participants:''})
                dispatch(updateAllies([...allies, newAllies]));
            } catch (error) {
                console.error(error);
            }
            setIsReady(true);
        }
    }

    const onDeleteGroupHandler = async (alliesIndex) => {
        if(isReady) {
            try {
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
                await DB.deleteFromTable('allies',`key = ${allies[alliesIndex].key}`)
                newAllies.splice(alliesIndex,1);
                dispatch(updateAllies(newAllies));
            } catch (error) {
                console.error(error);
            }
            setIsReady(true);
        }
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

