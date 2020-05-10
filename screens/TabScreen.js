import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Participants from './Participants';
import Matches from './Matches';
import Allies from './Allies';
import { FontAwesome5, Feather } from '@expo/vector-icons';
import * as DB  from "../custom-modules/database";
import { useDispatch } from 'react-redux';
import * as actions from '../redux/actions';

const Tab = createBottomTabNavigator();

export default function TabScreen() {
    const [isReady, setIsReady] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                //await DB.dropTable('participants');
                const data = await DB.initParticipants();
                dispatch(actions.initParticipants(data));
                setIsReady(true);
            } catch (error) {
                alert(error);
            }
        }
        fetchData();
    }, []);

    return isReady && (
        <Tab.Navigator tabBarOptions={options.navigator} >
            <Tab.Screen name="Participants" component={Participants} 
                options={options.participantsScreen}
            />
            <Tab.Screen name="Allies" component={Allies} 
                options={options.alliesScreen}
            />
            <Tab.Screen name="Matches" component={Matches} 
                options={options.matchesScreen}
            />
        </Tab.Navigator>
    );
}

const options = {
    navigator: {
        keyboardHidesTabBar:true,
        style:{ backgroundColor:'#1c1c1c',},
        activeTintColor: '#23A32F',
        inactiveTintColor: 'gray',
    },
    participantsScreen: {
        tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="users" size={size} color={color} />
        ),
    },
    alliesScreen: {
        tabBarIcon: ({ color, size }) => (
            <Feather name="users" size={size} color={color} />
        ),
        tabBarVisible: false,
    },
    matchesScreen: {
        tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="spider" size={size} color={color} />
        ),
    }
  }