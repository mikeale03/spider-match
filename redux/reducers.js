const ADD = 'ADD';
const UPDATE = 'UPDATE';
const DELETE_INDEX = 'DELETE_INDEX';
const DELETE_KEY = 'DELETE_KEY';
const DELETE_CHECK = 'DELETE_CHECK';

const initialState = [
    {
        key:'1',
        name:'Mga Gwpapo',
        spiders: [
            
            {
                key: '1',
                parentKey:'1',
                image:'',
                weight:502,
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
                weight:503,
                otherDetails:'bag.o ni',
                isJoker:false,
                status:'No Match',
            },
            {
                key: '4',
                parentKey:'1',
                image:'',
                weight:402,
                otherDetails:'bag.o ni',
                isJoker:false,
                status:'No Match',
            }
        ]
    },{
        key:'2',
        name:'Pagadian Zamboanga del sur sdfdf sdfdsf sdfsdetrt fdgdf',
        spiders: [
            {key:'1',weight:31},
            {key:'2',weight:30},
            {key:'3',weight:45},
            {key:'4',weight:60},
            {key:'5',weight:54},
            {key:'6',weight:66},
        ]
    }
];

export const participantsReducer = (state = initialState, action) => {
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

