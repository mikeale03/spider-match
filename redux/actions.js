const ADD = 'ADD';
const UPDATE = 'UPDATE';
const DELETE_KEY = 'DELETE_KEY';
const ADD_NOT_MATCH = 'ADD_NOT_MATCH';
const UPDATE_MATCHES = 'UPDATE_MATCHES';

export const addParticipant = (participant) => ({
    type: ADD,
    participant
});

export const updateParticipant = (participant) => ({
    type: UPDATE,
    participant
});

export const deleteParticipant = (key) => ({
    type: DELETE_KEY,
    key
});

export const addNotMatch = (participant) => ({
    type: ADD_NOT_MATCH,
    participant
});

export const updateMatches = (matches) => ({
    type: UPDATE_MATCHES,
    matches
});