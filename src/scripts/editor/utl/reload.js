import createEditorTable from '../createEditorTable';
import createTableCode from '../../createTableCode';
import createTablePreview from '../../createTablePreview';
import addResizingToTextareas from './addResizingToTextareas';
import { addFilterInnerHTMLToInputs } from './filterInnerHTML';

const reload = (state, reloadEditor = false) => {
  console.time('local-storage');
  //TODO when editor reloads, set scrollto user previous position
  localStorage.setItem('savedState', JSON.stringify(state));
  console.timeEnd('local-storage');

  console.time('reload-editor');
  if (reloadEditor) {
    createEditorTable(state);
    addResizingToTextareas();
  }
  console.timeEnd('reload-editor');

  console.time('filter-html');
  if (!state.allowTags) {
    addFilterInnerHTMLToInputs();
  }
  console.timeEnd('filter-html');

  console.time('table-code');
  createTableCode(state);
  console.timeEnd('table-code');
  console.time('table-preview');
  createTablePreview(state);
  console.timeEnd('table-preview');
};

export default reload;
