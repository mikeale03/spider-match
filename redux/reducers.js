import { combineReducers } from "redux";

const ADD = 'ADD';
const UPDATE_PARTICIPANT = 'UPDATE_PARTICIPANT';
const DELETE_PARTICIPANT = 'DELETE_PARTICIPANT';
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
                participantName:'Mga Gwapo',
                image:'',
                weight:480,
                otherDetails:'bag.o ni',
                isJoker:false,
                status:'No Match',
            },
            {
                key: '2',
                parentKey:'1',
                participantName:'Mga Gwapo',
                image:'',
                weight:501,
                otherDetails:'bag.o ni',
                isJoker:false,
                status:'No Match',
            },
            {
                key: '3',
                parentKey:'1',
                participantName:'Mga Gwapo',
                image:'',
                weight:502,
                otherDetails:'bag.o ni',
                isJoker:false,
                status:'No Match',
            },
            {
                key: '4',
                parentKey:'1',
                participantName:'Mga Gwapo',
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
                parentKey:'2',
                participantName:'Mga Maot',
                image:'',
                weight:480,
                otherDetails:'',
                isJoker:false,
                status:'No Match',
            },
            {
                key: '2',
                parentKey:'2',
                participantName:'Mga Maot',
                image:'',
                weight:501,
                otherDetails:'daan ni',
                isJoker:false,
                status:'No Match',
            },
            {
                key: '3',
                parentKey:'2',
                participantName:'Mga Maot',
                image:'',
                weight:502,
                otherDetails:'tae ni',
                isJoker:false,
                status:'No Match',
            },
            {
                key: '4',
                parentKey:'2',
                participantName:'Mga Maot',
                image:'',
                weight:531,
                otherDetails:'',
                isJoker:false,
                status:'No Match',
            }
        ]
    },
    {
        key:'3',
        name:'Mga Baho',
        spiders: [
            
            {
                key: '1',
                parentKey:'3',
                participantName:'Mga Baho',
                image:'',
                weight:480,
                otherDetails:'',
                isJoker:false,
                status:'No Match',
            },
            {
                key: '2',
                parentKey:'3',
                participantName:'Mga Baho',
                image:'',
                weight:501,
                otherDetails:'daan ni',
                isJoker:false,
                status:'No Match',
            },
            {
                key: '3',
                parentKey:'3',
                participantName:'Mga Baho',
                image:'',
                weight:502,
                otherDetails:'tae ni',
                isJoker:false,
                status:'No Match',
            },
            {
                key: '4',
                parentKey:'3',
                participantName:'Mga Baho',
                image:'',
                weight:531,
                otherDetails:'',
                isJoker:false,
                status:'No Match',
            },
            {
                key: '5',
                parentKey:'3',
                participantName:'Mga Baho',
                image:'',
                weight:621,
                otherDetails:'',
                isJoker:false,
                status:'No Match',
            }
        ]
    },
    {
        key:'4',
        name:'Kigz',
        spiders: [
            
            {
                key: '1',
                parentKey:'4',
                participantName:'Kigz',
                image:'',
                weight:480,
                otherDetails:'',
                isJoker:false,
                status:'No Match',
            },
            {
                key: '2',
                parentKey:'4',
                participantName:'Kigz',
                image:'',
                weight:531,
                otherDetails:'baho ni',
                isJoker:false,
                status:'No Match',
            },
            {
                key: '3',
                parentKey:'4',
                participantName:'Kigz',
                image:'',
                weight:542,
                otherDetails:'kigwa ni',
                isJoker:false,
                status:'No Match',
            },
            {
                key: '4',
                parentKey:'4',
                participantName:'Kigz',
                image:'',
                weight:549,
                otherDetails:'',
                isJoker:false,
                status:'No Match',
            },
            {
                key: '5',
                parentKey:'4',
                participantName:'Kigz',
                image:'',
                weight:661,
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
        case DELETE_PARTICIPANT:
            return state.filter((item) => item.key !== action.participant.key);
        case DELETE_CHECK:
            return state.filter((item) => !item.checked);
        case UPDATE_PARTICIPANT:
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
            return action.notMatch;
        case UPDATE_PARTICIPANT:
            return state.map((item) => {
                return item.key === action.participant.key ?
                    action.participant : item;
            });
        case DELETE_PARTICIPANT:
            return state.filter((item) => item.key !== action.participant.key);
        default:
            return state;
    }
}

export default combineReducers({
    participants:participantsReducer,
    matches: matchReducer,
    notMatch: notMatchReducer,
})