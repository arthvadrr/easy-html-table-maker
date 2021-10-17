import StateMachine from '../state-machine/StateMachine';
import createEditorTable from './createEditorTable';
import createTableCode from './createTableCode';

// Elements
const $button_addRow = document.getElementById('add-row');
const $button_addColumn = document.getElementById('add-column');
const $button_copyTableCode = document.getElementById('copy-table-code');

let state = '';

// Check for local state and replace initial state if found
const statePromise = new Promise((resolve, reject) => {
    state = JSON.parse(localStorage.getItem('savedState'));
    if (state) {
        resolve('Save state found.');
    } else {
        reject('No save state.');
    }
});

const statePromiseOnResolve = () => {
    StateMachine.state = state;
    createEditorTable(StateMachine);
    createTableCode(StateMachine.state);
};
const statePromiseOnReject = () => {
    console.log('No local state');
    createEditorTable(StateMachine);
    createTableCode(StateMachine.state);
};
statePromise.then(statePromiseOnResolve);
statePromise.catch(statePromiseOnReject);
