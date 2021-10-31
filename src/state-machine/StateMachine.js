import initialState from './initial-state';

const StateMachine = {
    state: initialState,
    addState: (stateName, value) => (state[stateName] = value),
    removeState: stateName => delete state[stateName],
    updateState: (stateProp, value) => (state[stateProp] = value),
};

export default StateMachine;
