import { combineReducers } from "redux";
//import {participants, allies} from '../components/TempData';

const ADD = 'ADD';
const UPDATE_PARTICIPANT = 'UPDATE_PARTICIPANT';
const DELETE_PARTICIPANT = 'DELETE_PARTICIPANT';
const DELETE_INDEX = 'DELETE_INDEX';
const DELETE_KEY = 'DELETE_KEY';
const DELETE_CHECK = 'DELETE_CHECK';

const initialState = /*participants*/[];

const participantsReducer = (state = initialState, action) => {
    let newState;
    switch(action.type) {
        case ADD:
            return [...state,action.participant];
        case DELETE_INDEX:
            newState = [...state];
            newState.splice(action.index,1);
            return newState;
        case DELETE_PARTICIPANT:
            return state.filter((item) => item.key !== action.participant.key);
        case DELETE_CHECK:
            return state.filter((item) => !item.checked);
        case UPDATE_PARTICIPANT:
            return state.map((item) => {
                return item.key === action.participant.key ?
                    action.participant : item;
            });
        case 'UPDATE_PARTICIPANTS':
            return action.participants;
        case 'INIT_PARTICIPANTS':
            return action.participants;
        case 'UPDATE_SCORE':
            newState = [...state];
            if(action.result.prev === null || action.result.prev === 'Draw') {}               
            else {
                newState = newState.map((item) => {
                    return item.key === action.result.prev.participantKey ? 
                        {...item, score: item.score - 1} : item;
                });
            }
            if(action.result.next === null || action.result.next === 'Draw') {} 
            else {
                newState = newState.map((item) => {
                    return item.key === action.result.next.participantKey ? 
                        {...item, score: item.score + 1} : item;
                });
            }
            console.log(newState);
            return newState;
        case 'REVERT_SCORES':
            newState = [...state];
            const matches = action.matches;
            matches.forEach((match) => {
                if(match.result && match.result !== 'Draw') {
                    newState = newState.map((item) => {
                        return item.key === match.result.participantKey ? 
                            {...item, score: item.score - 1} : item;
                    });
                } 
            });
            console.log(matches);
            console.log(newState);
            return newState;
        case 'RESET_ALL':
            return [];
        default:
            return state;
    }
}

const matchReducer = (state = [], action)  => {
    switch(action.type) {
        case 'UPDATE_MATCHES':
            return action.matches;
        case 'UPDATE_MATCH':
            return state.map((item) => item.key === action.match.key ? action.match : item);
        case 'RESET_ALL':
            return [];
        default:
            return state;
    }
}

const notMatchReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD:
            return [...state, action.participant];
        case 'DELETE_NOT_MATCH':
            return state.filter((item) => item.key !== action.key);
        case 'UPDATE_NOT_MATCH':
            return action.notMatch;
        case UPDATE_PARTICIPANT:
            return state.map((item) => {
                return item.key === action.participant.key ?
                    action.participant : item;
            });
        case 'UPDATE_PARTICIPANTS':
            return action.participants;
        case DELETE_PARTICIPANT:
            return state.filter((item) => item.key !== action.participant.key);
        case 'RESET_ALL':
            return [];
        default:
            return state;
    }
}

const alliesReducer = (state = []/*allies*/, action) => {
    switch(action.type) {
        case 'UPDATE_ALLIES':
            return action.allies;
        case 'RESET_ALL':
            return [];
        default:
            return state;
    }
}

const fetchingDoneReducer = (state = false, action) => {
    switch(action.type) {
        case 'UPDATE_FETCHING':
            return action.fetchingDone;
        default:
            return state;
    }
}

export default combineReducers({
    participants:participantsReducer,
    matches: matchReducer,
    notMatch: notMatchReducer,
    allies: alliesReducer,
    fetchingDone: fetchingDoneReducer,
})