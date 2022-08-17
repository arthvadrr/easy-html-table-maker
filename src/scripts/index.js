import initialState from './initialState';
import createEditorTable from './editor/createEditorTable';
import createTableCode from './createTableCode';
import createTablePreview from './createTablePreview';
import addResizingToTextareas from './editor/utl/addResizingToTextareas';
import { addFilterInnerHTMLToInputs } from './editor/utl/filterInnerHTML';

let localState = '';
let state = initialState;

// Check for local state and replace initial state if found
const statePromise = new Promise((resolve, reject) => {
  localState = JSON.parse(localStorage.getItem('savedState'));
  if (localState) {
    resolve('Save state found.');
  } else {
    reject('No save state.');
  }
});

const statePromiseOnResolve = () => {
  state = localState;
  init();
};
const statePromiseOnReject = () => {
  console.log('No local state');
  init();
};

statePromise.then(statePromiseOnResolve).catch(statePromiseOnReject);

const init = () => {
  createEditorTable(state);
  createTableCode(state);
  createTablePreview(state);
  addResizingToTextareas();

  if (!state.allowTags) {
    addFilterInnerHTMLToInputs();
  }

  document.getElementById('loading-modal').classList.add('display-none');
};
