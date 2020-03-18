import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'
import TabScreen from './screens/TabScreen';
import SetParticipant from './screens/SetParticipant';
import Matches from './screens/Matches';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { participantsReducer } from './redux/reducers';

const store = createStore(participantsReducer);

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Home' component={TabScreen} 
            options={{
              title: 'Participants',
              headerStyle: {
                backgroundColor: '#1c1c1c',
              },
              headerTintColor: '#23A32F',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen name='SetParticipant' component={SetParticipant} 
            options={{
              headerShown: false,
            }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

//<Tab.Navigator tabBarOptions={{keyboardHidesTabBar:true}} >
//  <Tab.Screen name="ParticipantsRoot" component={Participants} 
//    options={ ({route}) => {
//     return route.state?.routes?.length > 1 ? {tabBarVisible:false} : {tabBarVisible:true}
//      }
//    }
//   />
//  <Tab.Screen name="Matches" component={Matches} />
//</Tab.Navigator>