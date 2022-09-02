// Components (in render order)
import table from './components/table';
import controls from './components/controls';
import colgroup from './components/colgroup';
import header from './components/header';
import body from './components/body';
import footer from './components/footer';
import removeCols from './components/removeCols';
import filterInnerHTML from './utl/filterInnerHTML';

const createEditorTable = state => {
  // Render the table components
  const tableComponents = [table, controls, colgroup, header, body, footer, removeCols];
  tableComponents.map(item => item(state));

  const $inputArr = document.querySelectorAll('input.td-input');

  $inputArr.forEach($input => {
    $input.addEventListener('input', e => {
      e.target.value = filterInnerHTML(e.target.value, state.allowTags);
    });
  });
};

export default createEditorTable;
