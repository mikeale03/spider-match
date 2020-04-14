const ADD = 'ADD';
const UPDATE_PARTICIPANT = 'UPDATE_PARTICIPANT';
const DELETE_PARTICIPANT = 'DELETE_PARTICIPANT';
const ADD_NOT_MATCH = 'ADD_NOT_MATCH';
const UPDATE_NOT_MATCH = 'UPDATE_NOT_MATCH';
const UPDATE_MATCHES = 'UPDATE_MATCHES';

export const addParticipant = (participant) => ({
    type: ADD,
    participant
});

export const updateParticipant = (participant) => ({
    type: UPDATE_PARTICIPANT,
    participant
});

export const deleteParticipant = (participant) => ({
    type: DELETE_PARTICIPANT,
    participant
});

export const addNotMatch = (participant) => ({
    type: ADD_NOT_MATCH,
    participant
});

export const updateNotMatch = (notMatch) => ({
    type: UPDATE_NOT_MATCH,
    notMatch
});

export const updateMatches = (matches) => ({
    type: UPDATE_MATCHES,
    matches
});

export const updateAllies = (allies) => ({
    type: 'UPDATE_ALLIES',
    allies,
});
