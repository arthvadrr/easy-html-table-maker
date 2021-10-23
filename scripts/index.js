import StateMachine from '../state-machine/StateMachine';
import copyTextToClipboard from './copyTextToClipboard';
import createEditorTable from './createEditorTable';
import createTableCode from './createTableCode';
import replaceHTML from './replaceHTML';

// Elements
const $button_addRow = document.getElementById('add-row');
const $button_addColumn = document.getElementById('add-column');
const $button_copyTableCode = document.getElementById('copy-table-code');
const $code_tableCode = document.getElementById('table-code');

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
    init();
};
const statePromiseOnReject = () => {
    console.log('No local state');
    init();
};
statePromise.then(statePromiseOnResolve);
statePromise.catch(statePromiseOnReject);

const init = () => {
    createEditorTable(StateMachine, $code_tableCode);
    createTableCode(StateMachine.state, $code_tableCode);

    $button_copyTableCode.addEventListener('click', () => {
        copyTextToClipboard(replaceHTML($code_tableCode.innerHTML));
    });
};
