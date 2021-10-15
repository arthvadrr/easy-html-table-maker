import StateMachine from '../state-machine/StateMachine';
import createEditorTable from './createEditorTable';

// Elements
const $button_addRow = document.getElementById('add-row');
const $button_addColumn = document.getElementById('add-column');
const $button_copyTableCode = document.getElementById('copy-table-code');

let state;

// Check for local state and replace initial state if found
const statePromise = new Promise((resolve, reject) => {
    state = localStorage.getItem('savedState');
    if (state) {
        resolve('Save state found.');
    } else {
        reject('No save state.');
    }
});

const statePromiseOnResolve = () => (StateMachine.state = state);
const statePromiseOnReject = () => console.log('No local state');

statePromise.then(statePromiseOnResolve);
statePromise.catch(statePromiseOnReject);

// Fire up the table
createEditorTable(StateMachine.state);
