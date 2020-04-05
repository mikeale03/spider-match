import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Picker, BackHandler } from 'react-native';
import Header from '../components/custom/Header';
import CreateMatch from '../components/matches/CreateMatch';
import ErrorBoundary from '../components/error-catch/ErrorBoundary'
import MatchItem from '../components/matches/MatchItem';
import { useSelector, useDispatch } from 'react-redux';
import { FlatList, TouchableNativeFeedback } from 'react-native-gesture-handler';
import { updateMatches, updateNotMatch } from "../redux/actions";
import SMButton from '../components/custom/SMButton';
import { matchAllParticipantsSpiders, getSingleMatchWithLeastDif } from '../custom-modules/matchMaker';
import { matchResetMark, deleteMarked } from '../custom-modules/matchModifier';
import { addNotMatchArr } from '../custom-modules/notMatchUpdater';
import { AntDesign } from '@expo/vector-icons';


function Matches({navigation}) {
  
  const dispatch = useDispatch();
  let notMatch = useSelector((state) => state.notMatch);
  let matches = useSelector((state) => state.matches);
  const [isCreate, setIsCreate] = useState(false);
  const [isShowCheckBox, setIsShowCheckBox] = useState(false);

  const onDoneHandler = (match) => {
    const newMatch = {
      key:Date.now().toString(),
      isMarked: false,
      match
    };
    const newMatches = [newMatch, ...matches];
    const newNotMatch = notMatch.reduce((acc, item) => {
      if(item.key === match[0].parentKey) {
        const newSpiders = item.spiders.filter((val) => val.key !== match[0].key );
        acc.push({...item, spiders:newSpiders});

      } else if (item.key === match[1].parentKey) {
        const newSpiders = item.spiders.filter((val) => val.key !== match[1].key );
        acc.push({...item, spiders:newSpiders});

      } else
        acc.push(item);
      return acc;
    },[]);
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
    if(result.match !== null) {
      dispatch(updateMatches([result.match, ...matches]));
      dispatch(updateNotMatch(result.notMatch));
    }
  }

  const onMark = (match) => {
    const newMatches = matches.map((item) => {
      return (
        item.key === match.key ? {...item, isMarked: !match.isMarked} : item
      )
    });
    dispatch(updateMatches(newMatches));
  }

  const matchItemLongPressHandler = () => {
    setIsShowCheckBox(!isShowCheckBox);
  }
  
  const resetMark = () => {
    const newMatches = matchResetMark(matches);
    dispatch(updateMatches(newMatches));
    setIsShowCheckBox(false);
  }

  const deleteMarkedHandler = () => {
    const result = deleteMarked(matches);
    console.log(result.markedItem);
    const newNotMatch = addNotMatchArr(notMatch, result.markedItem);
    console.log(result.matches);
    dispatch(updateMatches(result.matches));
    dispatch(updateNotMatch(newNotMatch));
  }

  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
    const unsubscribe = navigation.addListener('blur', () => {
      setIsCreate(false);
    });
    BackHandler.addEventListener("hardwareBackPress", () => {
      setIsCreate(false);
      resetMark();
      return true;
    });

    return () => {
      unsubscribe;
      BackHandler.removeEventListener("hardwareBackPress");
    }
  }, []);

  

  return (
      <View style={styles.container}>
        <ErrorBoundary>
          <Header title='Matches'/>
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
            <TouchableNativeFeedback
              onPress={deleteMarkedHandler}
            >
              <View style={{justifyContent:'center', alignItems:'center', width:50, height:50, borde}}>
                <AntDesign name='delete' size={20} color="#A36023" />
                <Text>Delete</Text>
              </View>
            </TouchableNativeFeedback>

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
    padding:20,
  },
  matchContainer: {
    flexDirection:'row',
    borderBottomColor: '#ccc',
    borderBottomWidth: .75,
  },
  matchButtonContainer: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginBottom:20,
  },
  participantNameText: {
    textAlign:'center',
    fontWeight:'bold',
  },
  spiderContainer: {
    flex:5,
    height:70,
    justifyContent:'center',
    alignItems:'center'
  },
  vsContainer: {
    flex:2,
    justifyContent:'center',
    alignItems:'center'
  },
  button: {
    color: '#23A32F',
    backgroundColor: '#333332'
  }
});