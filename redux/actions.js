const ADD = 'ADD';
const UPDATE = 'UPDATE';
const DELETE_KEY = 'DELETE_KEY';

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