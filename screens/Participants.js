import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Picker, TouchableNativeFeedback, AsyncStorage, Button } from 'react-native';
import List from '../components/participants/ParticipantsList';
import Header from '../components/custom/Header';
import { useSelector, useDispatch } from 'react-redux';
import { updateAllies, updateMatches, updateNotMatch, initParticipants, updateFetching } from '../redux/actions';

function Participants({navigation}) {

    const [isDoneFetching, setIsDoneFetching] = useState(false)
    const participants = useSelector( (state) => state.participants );
    const dispatch = useDispatch();
    const addHandler = () => {
      navigation.navigate('SetParticipant');
    }

    const  resetData = () => {
      dispatch({type: 'RESET_ALL'});
      alert('data remove!')
    }

    const clearStorage = async () => {
      try {
        await AsyncStorage.multiRemove(['participants', 'notMatch','matches', 'allies']);
      } catch (error) {
        alert(error);
      }
    }

    useEffect(() => {
      const getData = async () => {
        try{
            let data = {};
            const result = await AsyncStorage.multiGet(['participants', 'notMatch','matches', 'allies'])
            if(result !== null) {
                //dispatch(updateParticipants(JSON.parse(data)));
                result.map((item) => {
                  data[item[0]] = JSON.parse(item[1]);
                });
                data['participants'] !== null && dispatch(initParticipants(data['participants']));
                data['notMatch'] !== null && dispatch(updateNotMatch(data['notMatch']));
                data['matches'] !== null && dispatch(updateMatches(data['matches']));
                data['allies'] !== null && dispatch(updateAllies(data['allies']));
            }
            setIsDoneFetching(true);
            dispatch(updateFetching(true));
        } catch(e) {
          alert(e);
        }
      }

      getData();
    }, []);

    const setData = async () => {
      try{
        await AsyncStorage.setItem('participants', JSON.stringify(participants));
      } catch(e) {
        alert(e);
      }
    }

    useEffect(() => {
      if(isDoneFetching)
        setData();
    },[participants]);

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
              <Button title='reset' onPress={resetData}/>
              <Button title='clear' onPress={clearStorage}/>
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