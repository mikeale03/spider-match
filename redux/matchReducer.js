export const matchReducer = (state = {match:[], noMatch:[]}, action) => {
    switch(action.type) {
        case UPDATE:
            return action.state;
        default:
            return state;
    }
}