import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Picker, TouchableNativeFeedback, Button } from 'react-native';
import * as DB from '../custom-modules/database';
import List from '../components/participants/ParticipantsList';
import Header from '../components/custom/Header';
import { useSelector, useDispatch } from 'react-redux';
import { updateAllies, updateMatches, updateNotMatch, initParticipants, updateFetching } from '../redux/actions';

function Participants({navigation}) {

    const [isDoneFetching, setIsDoneFetching] = useState(false)
    const [sortBy, setSortBy] = useState('name');
    let participants = useSelector( (state) => state.participants );
    const dispatch = useDispatch();

    const addHandler = () => {
      navigation.navigate('SetParticipant');
    }

    useEffect(() => {
      const fetchData = async () => {
        try {
          await DB.createParticipantsTable();
          console.log('created');
          const {_array} = await DB.getAllParticipants();
          const p = _array.map((item) => ({
            ...item, score:Number(item.score), spiders:JSON.parse(item.spiders)
          }));
          console.log(p);
        } catch (error) {
          console.log(error);
        }
      }
      fetchData();
    }, []);

    useEffect(() => {
      participants = participants.map((item) => {
        const spiders = item.spiders.map((spider) => ({...spider}));
        return {...item, spiders};
      });
      participants.sort((a, b) => {
        if(a.name.toLowerCase() < b.name.toLowerCase())
          return -1;
        else if (a.name.toLowerCase() > b.name.toLowerCase())
          return 1;
        else
          return 0;
      });
      //console.log(participants);
    },[sortBy]);

    return (
        <View style={styles.container}>
          <Header title="Participant" hideArrowBack={true} />
          <View style={styles.innerContainer}>
            <View style={{flexDirection:'row', paddingVertical:20, alignItems:'center', justifyContent:'space-between'}}> 
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <Text>sort by: </Text>
                <View style={{borderWidth:1, borderColor:'#d4d4d4', borderRadius:15}}>
                  <Picker 
                    style={{height:30, width: 115, color:'#23A32F', }}
                    mode='dropdown'
                  >
                    <Picker.Item label="Score" value="score" />
                    <Picker.Item label="Name" value="name" />
                  </Picker>
                </View>
              </View>
              <TouchableNativeFeedback
                onPress={addHandler}
                background={TouchableNativeFeedback.SelectableBackground()}>
                <View style={{backgroundColor: '#333332', padding:10, borderRadius:5}}>
                  <Text style={{color:'#23A32F',}}>Add Participant</Text>
                </View>
              </TouchableNativeFeedback>
              
            </View>

            <View style={{flexDirection:'row', alignItems:'center', paddingVertical:15, marginTop:5}}>
              <View style={{flex:4, alignItems:'center'}}>
                <Text style={{fontWeight:'bold', fontSize:15}}>Participant</Text>
              </View>
              <View style={{flex:2, alignItems:'center'}}>
                <Text style={{fontWeight:'bold', fontSize:15}}>Score</Text>
              </View>
            </View>
            <List participants={participants} />
          </View>
        </View>
    );
}

export default Participants;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  },
  innerContainer: {
    paddingTop: 84,
    paddingHorizontal:15,
    paddingBottom:150,
  }
}); 