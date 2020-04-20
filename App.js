import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'
import TabScreen from './screens/TabScreen';
import SetParticipant from './screens/SetParticipant';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './redux/reducers';

const store = createStore(rootReducer);

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown:false}} >
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
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
