import createTableCode from '../createTableCode';
import createTablePreview from '../createTablePreview';

// Components (in order)
import table from './components/table';
import controls from './components/controls';
import caption from './components/caption';
import colgroup from './components/colgroup';
import header from './components/header';
import body from './components/body';

export const reload = (state, reloadEditor) => {
    localStorage.setItem('savedState', JSON.stringify(state));

    if (reloadEditor) {
        createEditorTable(state);
    }

    createTableCode(state);
    createTablePreview(state);
};

const createEditorTable = state => {
    // Remove the existing div so we don't get duplicates
    const $div_editorTableContainer = document.getElementById('editor-table-container');
    $div_editorTableContainer.parentNode.removeChild($div_editorTableContainer);

    // Render the table components
    const tableComponents = [
        table,
        controls,
        caption,
        colgroup,
        header,
        body
    ];
    tableComponents.map(item => item(state));
};

export default createEditorTable;