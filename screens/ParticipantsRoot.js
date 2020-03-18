import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Participants from './Participants';
import Spiders from './Spiders';

const Stack = createStackNavigator();

function RootStack(params) {
    return (
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name='Participants' component={Participants} 
            options={{
              title: 'Participants',
              headerStyle: {
                backgroundColor: '#333332',
              },
              headerTintColor: '#23A32F',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen name='Spiders' component={Spiders} />
        </Stack.Navigator>
    )   
}

export default RootStack;
