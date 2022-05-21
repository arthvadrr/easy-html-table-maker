import createTableCode from '../createTableCode';
import createTablePreview from '../createTablePreview';

// Components (in render order)
import table from './components/table';
import controls from './components/controls';
import caption from './components/caption';
import colgroup from './components/colgroup';
import header from './components/header';
import body from './components/body';
import footer from './components/footer';

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
    const tableComponents = [table, controls, colgroup, caption, header, body, footer];
    tableComponents.map(item => item(state));
};

export default createEditorTable;
