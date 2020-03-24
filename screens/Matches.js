import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Picker, Button} from 'react-native';
import Header from '../components/custom/Header';
import CreateMatch from '../components/matches/CreateMatch';
import ErrorBoundary from '../components/error-catch/ErrorBoundary'

function Matches({route, navigation}) {
    
  const [isCreate, setIsCreate] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
  }, []);

  return (
      <View style={styles.container}>
        <ErrorBoundary>
          <Header title='Matches'/>
          <View style={styles.innerContainer}>
            <View style={styles.filterContainer}>
              <Text>Filter:</Text>
              <Picker 
                  style={{height:30, width: 130, color:'#23A32F', }}
                  mode='dropdown'
                >
                  <Picker.Item label="Finished" value="score" />
                  <Picker.Item label="Unfinished" value="name" />
                  <Picker.Item label="Cancelled" value="name" />
              </Picker>
            </View>
            <View style={styles.matchButtonContainer}>
              <View >
                <Button title="Create match"
                  onPress={() => {setIsCreate(!isCreate)}}
                />
              </View>
              <View>
                <Button title="Auto match"/>
              </View>
              <View>
                <Button title="Auto match all"/>
              </View>
            </View>

            { isCreate && <CreateMatch /> }

            <View style={styles.matchContainer}>
              <View style={styles.spiderContainer}>
                  <View>
                    <Text>Molave ZDS</Text>
                  </View>
                  <View>
                    <Text>Wt: 506</Text>
                  </View>
              </View>

              <View style={styles.vsContainer}>
                  <Text>VS</Text>
              </View>

              <View style={styles.spiderContainer}>
                <View>
                  <Text>Pagadian ZDS</Text>
                </View>
                <View>
                  <Text>Wt: 506</Text>
                </View>
              </View>
            </View>
          </View>
          
        </ErrorBoundary>
      </View>
  );
}

export default Matches;

const styles = StyleSheet.create({
  container: {
    flex:1
  },
  innerContainer: {
    paddingTop:84,
    paddingHorizontal:20,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems:'center',
    padding:20,
  },
  matchContainer: {
    flexDirection:'row',
  },
  matchButtonContainer: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginBottom:20,
  },
  spiderContainer: {
    flex:5,
    height:100,
    borderColor:'green',
    borderWidth:1,
    justifyContent:'center',
    alignItems:'center'
  },
  vsContainer: {
    flex:2,
    justifyContent:'center',
    alignItems:'center'
  }
});