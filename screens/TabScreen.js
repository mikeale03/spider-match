import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Participants from './Participants';
import Matches from './Matches'

const Tab = createBottomTabNavigator();

export default function TabScreen() {
    return (
        <Tab.Navigator tabBarOptions={{keyboardHidesTabBar:true}} >
            <Tab.Screen name="Participants" component={Participants} />
            <Tab.Screen name="Matches" component={Matches} />
        </Tab.Navigator>
    );
}