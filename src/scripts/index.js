import StateMachine from '../state-machine/StateMachine';
import copyTextToClipboard from './copyTextToClipboard';
import createEditorTable from './editor/createEditorTable';
import createTableCode from './createTableCode';
import createTablePreview from './createTablePreview';
import replaceHTML from './replaceHTML';

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
    const $button_copyTableCode = document.getElementById('copy-table-code');
    const $code_tableCode = document.getElementById('table-code');
    const $div_loadingModal = document.getElementById('loading-modal');

    createEditorTable(StateMachine, $code_tableCode);
    createTableCode(StateMachine.state, $code_tableCode);
    createTablePreview(StateMachine);

    $button_copyTableCode.addEventListener('click', () => {
        copyTextToClipboard(replaceHTML($code_tableCode.innerHTML));
    });
    $div_loadingModal.classList.add('display-none');
};
