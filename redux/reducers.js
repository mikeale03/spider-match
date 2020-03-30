import { combineReducers } from "redux";

const ADD = 'ADD';
const UPDATE = 'UPDATE';
const DELETE = 'DELETE'
const DELETE_INDEX = 'DELETE_INDEX';
const DELETE_KEY = 'DELETE_KEY';
const DELETE_CHECK = 'DELETE_CHECK';

const initialState = [
    {
        key:'1',
        name:'Mga Gwapo',
        spiders: [
            
            {
                key: '1',
                parentKey:'1',
                image:'',
                weight:480,
                otherDetails:'bag.o ni',
                isJoker:false,
                status:'No Match',
            },
            {
                key: '2',
                parentKey:'1',
                image:'',
                weight:501,
                otherDetails:'bag.o ni',
                isJoker:false,
                status:'No Match',
            },
            {
                key: '3',
                parentKey:'1',
                image:'',
                weight:502,
                otherDetails:'bag.o ni',
                isJoker:false,
                status:'No Match',
            },
            {
                key: '4',
                parentKey:'1',
                image:'',
                weight:531,
                otherDetails:'bag.o ni',
                isJoker:false,
                status:'No Match',
            }
        ]
    },
    {
        key:'2',
        name:'Mga Maot',
        spiders: [
            
            {
                key: '1',
                parentKey:'1',
                image:'',
                weight:480,
                otherDetails:'',
                isJoker:false,
                status:'No Match',
            },
            {
                key: '2',
                parentKey:'1',
                image:'',
                weight:501,
                otherDetails:'daan ni',
                isJoker:false,
                status:'No Match',
            },
            {
                key: '3',
                parentKey:'1',
                image:'',
                weight:502,
                otherDetails:'tae ni',
                isJoker:false,
                status:'No Match',
            },
            {
                key: '4',
                parentKey:'1',
                image:'',
                weight:531,
                otherDetails:'',
                isJoker:false,
                status:'No Match',
            }
        ]
    },
];

const participantsReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD:
            return [...state,action.participant];
        case DELETE_INDEX:
            let newState = [...state];
            newState.splice(action.index,1);
            return newState;
        case DELETE_KEY:
            return state.filter((item) => item.key !== action.key);
        case DELETE_CHECK:
            return state.filter((item) => !item.checked);
        case UPDATE:
            return state.map((item) => {
                return item.key === action.participant.key ?
                    action.participant : item;
            });
        default:
            return state;
    }
}

const matchReducer = (state = [], action)  => {
    switch(action.type) {
        case 'UPDATE_MATCHES':
            return action.matches;
        default:
            return state;
    }
}

const notMatchReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'ADD_NOT_MATCH':
            return [...state, action.participant];
        case 'DELETE_NOT_MATCH':
            return state.filter((item) => item.key !== action.key);
        case 'UPDATE_NOT_MATCH':
            return action.state;
        default:
            return state;
    }
}

export default combineReducers({
    participants:participantsReducer,
    matches: matchReducer,
    notMatch: notMatchReducer,
})