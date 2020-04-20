import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Picker, BackHandler, AsyncStorage } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Header from '../components/custom/Header';
import CreateMatch from '../components/matches/CreateMatch';
import ErrorBoundary from '../components/error-catch/ErrorBoundary'
import MatchItem from '../components/matches/MatchItem';
import { useSelector, useDispatch } from 'react-redux';
import { FlatList, TouchableNativeFeedback } from 'react-native-gesture-handler';
import { updateMatches, updateNotMatch } from "../redux/actions";
import SMButton from '../components/custom/SMButton';
import { matchAllParticipantsSpiders, getSingleMatchWithLeastDif } from '../custom-modules/autoMatchMaker';
import * as MatchesUpdater from '../custom-modules/matchesUpdater';
import { addNotMatchArr, removeNotMatch } from '../custom-modules/notMatchUpdater';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';


function Matches({navigation}) {
  
  const dispatch = useDispatch();
  let notMatch = useSelector((state) => state.notMatch);
  let matches = useSelector((state) => state.matches);
  const [isCreate, setIsCreate] = useState(false);
  const [isShowCheckBox, setIsShowCheckBox] = useState(false);
  const fetchingDone = useSelector( state => state.fetchingDone );
  
  const onDoneHandler = (match) => {
    const newMatch = {
      key:Date.now().toString(),
      isMarked: false,
      match
    };
    const newMatches = [newMatch, ...matches];
    const newNotMatch = removeNotMatch(notMatch, match);
    dispatch(updateMatches(newMatches));
    dispatch(updateNotMatch(newNotMatch));
    setIsCreate(false);
  }

  const onCancelHandler = () => {
    setIsCreate(false);
  }

  const autoMatchAll = () => {
    const result = matchAllParticipantsSpiders(notMatch);
    dispatch(updateMatches(matches.concat(result.matches)));
    dispatch(updateNotMatch(result.notMatch));
  }

  const autoMatch = () => {
    const result = getSingleMatchWithLeastDif(notMatch);
    console.log(result);
    if(result.match !== null) {
      dispatch(updateMatches([result.match, ...matches]));
      dispatch(updateNotMatch(result.notMatch));
    }
  }

  const onMark = (matchItem) => {
    const newMatches = matches.map((item) => {
      return (
        item.key === matchItem.key ? {...item, isMarked: !matchItem.isMarked} : item
      )
    });
    dispatch(updateMatches(newMatches));
  }

  const matchItemLongPressHandler = (matchItem) => {
    onMark(matchItem);
    setIsShowCheckBox(true);
  }
  
  const resetMark = () => {
    const newMatches = MatchesUpdater.matchResetMark(matches);
    dispatch(updateMatches(newMatches));
    setIsShowCheckBox(false);
  }

  const deleteMarkedHandler = () => {
    const {newMatches, markedItem} = MatchesUpdater.deleteMarked(matches);
    const newNotMatch = addNotMatchArr(notMatch, markedItem);
    setIsShowCheckBox(false);
    dispatch(updateMatches(newMatches));
    dispatch(updateNotMatch(newNotMatch));
  }

  const markAllHandler = () => {
    const newMatches = MatchesUpdater.markAll(matches);
    dispatch(updateMatches(newMatches));
  }

  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
  }, []);

  const setData = async () => {
    try{
      await AsyncStorage.setItem('matches', JSON.stringify(matches));
      await AsyncStorage.setItem('notMatch', JSON.stringify(notMatch));
    } catch(e) {
      alert(e);
    }
  }

  useEffect(() => {
    fetchingDone && setData();
  },[matches,notMatch]);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if(isCreate || isShowCheckBox) {
          setIsCreate(false);
          setIsShowCheckBox(false);
          resetMark();
          return true;
        } else {
          return false;
        }
      }
      BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);

    }, [isCreate, isShowCheckBox, resetMark])
  );

  return (
      <View style={styles.container}>
        <ErrorBoundary>
          <Header title='Matches' onClose={() => navigation.goBack()} />
          <View style={styles.innerContainer}>
            <View style={styles.filterContainer}>
              <View style={{flexDirection:'row', alignItems:'center'}}>
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
              { isShowCheckBox && (
                <View style={styles.onCheckButtonsContainer}>

                  <TouchableNativeFeedback
                    onPress={deleteMarkedHandler}
                  >
                    <View style={styles.onCheckButtons}>
                      <AntDesign name='delete' size={20} color="#A36023" />
                      <Text style={{fontSize:10}}>Delete</Text>
                    </View>
                  </TouchableNativeFeedback>
                  <TouchableNativeFeedback
                    onPress={markAllHandler}
                  >
                    <View style={styles.onCheckButtons}>
                      <FontAwesome5 name='check-double' size={20} color="#A36023" />
                      <Text style={{fontSize:10}}>Check all</Text>
                    </View>
                  </TouchableNativeFeedback>

                </View>
              )}
            </View>
            <View style={styles.matchButtonContainer}>

              <View >
                <SMButton title="Create match" onPress={() => {setIsCreate(!isCreate)}} />
              </View>
              <View>
                <SMButton title="Auto match" onPress={autoMatch}/>
              </View>
              <View>
                <SMButton title="Auto match all" onPress={autoMatchAll}/>
              </View>
            </View>

            { isCreate && <CreateMatch notMatch={notMatch} onDone={onDoneHandler} onCancel={onCancelHandler}/> }

            <FlatList
              data={matches}
              renderItem={({ item }) => (
                <MatchItem 
                  item={item}
                  onMark={onMark}
                  onLongPress={matchItemLongPressHandler}
                  showCheckBox={isShowCheckBox}/>
              )}
            />

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
    marginBottom: 150,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingVertical:20,
  },
  matchButtonContainer: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginBottom:20,
  },
  button: {
    color: '#23A32F',
    backgroundColor: '#333332'
  },
  onCheckButtons: {
    justifyContent:'center',
    alignItems:'center',
    width:50,
    height:50,
    borderRadius:10,
    borderWidth:1,
    marginStart:10,
    borderColor:'#d4d4d4',
  },
  onCheckButtonsContainer: {
    flexDirection:'row',
    alignItems:'center',
  }
});