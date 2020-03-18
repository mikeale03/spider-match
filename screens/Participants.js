import React from 'react';
import { Button, StyleSheet, View, Text, Picker, TouchableNativeFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import List from '../components/participants/ParticipantsList';
import { useSelector, useDispatch } from 'react-redux';
import { addParticipant } from '../redux/actions';

function Participants({navigation}) {

    const [input, setInput] = React.useState('');
    const participants = useSelector( (state) => state );
    const dispatch = useDispatch();
    //const navigation = useNavigation();

    const addHandler = () => {
      // if (input.trim().length) {
      //   const participant = {
      //     key: Date.now().toString(),
      //     name: input,
      //     spiders:[]
      //   }
      //   dispatch(addParticipant(participant));
      //   navigation.navigate('Spiders', {participant});
      // }
      navigation.navigate('SetParticipant');
    }

    return (
        <View style={styles.container}>
          <View style={{flexDirection:'row', paddingVertical:15, alignItems:'center', justifyContent:'space-between'}}> 
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
                <Text style={{color:'#23A32F'}}>Add Participant</Text>
              </View>
            </TouchableNativeFeedback>
          </View>

          <View style={{flexDirection:'row', alignItems:'center', paddingVertical:15, marginTop:5}}> 
            <View style={{flex:4, alignItems:'center'}}>          
              <Text>Participant</Text>
            </View>
            <View style={{flex:2, alignItems:'center'}}>    
              <Text>Score</Text>
            </View>
          </View>

          <List participants={participants} />
        </View>
    );
}



export default Participants;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor:'white'
  },
}); 