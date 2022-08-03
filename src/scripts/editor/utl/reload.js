import createEditorTable from '../createEditorTable';
import { addFilterInnerHTMLToInputs } from './filterInnerHTML';
import createTableCode from '../../createTableCode';
import createTablePreview from '../../createTablePreview';

const reload = (state, reloadEditor = false) => {
  localStorage.setItem('savedState', JSON.stringify(state));

  if (reloadEditor) {
    createEditorTable(state);
  }

  if (!state.allowTags) {
    addFilterInnerHTMLToInputs();
  }

  createTableCode(state);
  createTablePreview(state);
};

export default reload;
