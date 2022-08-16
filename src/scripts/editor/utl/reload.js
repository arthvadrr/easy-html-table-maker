import createEditorTable from '../createEditorTable';
import createTableCode from '../../createTableCode';
import createTablePreview from '../../createTablePreview';
import addResizingToTextareas from './addResizingToTextareas';
import { addFilterInnerHTMLToInputs } from './filterInnerHTML';

const reload = (state, reloadEditor = false) => {
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
};

export default reload;
