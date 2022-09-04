import createEditorTable from '../createEditorTable';
import createTableCode from '../../createTableCode';
import createTablePreview from '../../createTablePreview';
import addResizingToTextareas from './addResizingToTextareas';
import hackilySetEditorTableHeight from './hackilySetEditorTableHeight';
import { addFilterInnerHTMLToInputs } from './filterInnerHTML';

const reload = (state, reloadEditor = false) => {
  //TODO when editor reloads, set scrollto user previous position. Like fast.
  console.log(state);
  localStorage.setItem('savedState', JSON.stringify(state));

  if (reloadEditor) {
    createEditorTable(state);
    addResizingToTextareas();
  }

  if (!state.allowTags) {
    addFilterInnerHTMLToInputs();
  }

  createTableCode(state);
  createTablePreview(state);

  hackilySetEditorTableHeight();
};

export default reload;
