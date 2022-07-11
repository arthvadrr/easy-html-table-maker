import createTableCode from '../createTableCode';
import createTablePreview from '../createTablePreview';

// Components (in render order)
import table from './components/table';
import controls from './components/controls';
import colgroup from './components/colgroup';
import header from './components/header';
import body from './components/body';
import footer from './components/footer';
import filterInnerHTML from './utl/filterInnerHTML';

export const reload = (state, reloadEditor) => {
    localStorage.setItem('savedState', JSON.stringify(state));

    if (reloadEditor) {
        createEditorTable(state);
    }

    createTableCode(state);
    createTablePreview(state);
};

const createEditorTable = state => {
    // Render the table components
    const tableComponents = [table, controls, colgroup, header, body, footer];
    tableComponents.map(item => item(state));

    const $inputArr = document.querySelectorAll('input.td-input');
    console.log($inputArr);

    $inputArr.forEach($input => {
        $input.addEventListener('input', e => {
            //console.log(e.target.selectionStart);
            const cursorPosition = e.target.selectionStart;
            e.target.value = filterInnerHTML(e.target.value, state.allowTags);
            //e.target.selectionStart = cursorPosition + 1;
        });
    });
};

export default createEditorTable;
