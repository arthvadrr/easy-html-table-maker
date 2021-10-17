import createElement from './createElement';
import createTableCode from './createTableCode';

const $div_editorTableContainer = document.getElementById('editor-table-container');

const createEditorTable = StateMachine => {
    const { state } = StateMachine;

    state.tables.map((table, key) => {
        createElement(1, 'table', $div_editorTableContainer, `editor-table-${key}`, 'editor-table');

        if (table.header) {
            createElement(1, 'thead', `editor-table-${key}`, `table-head-${key}`);
            createElement(1, 'tr', `table-head-${key}`, `table-header-${key}`);
            for (let h = 0; h < table.columns; h++) {
                createElement(
                    1,
                    'th',
                    `table-header-${key}`,
                    false,
                    false,
                    true,
                    table.headerContent[h].innerHTML
                );
            }
        }

        for (let r = 0; r < table.rows; r++) {
            createElement(1, 'tbody', `editor-table-${key}`, `table-body-${key}`);
            createElement(1, 'tr', `table-body-${key}`, `table-row-${r}`);

            for (let c = 0; c < table.columns; c++) {
                createElement(
                    1,
                    'td',
                    `table-row-${r}`,
                    `td-${r}${c}`,
                    false,
                    true,
                    table.content[r][c].innerHTML,
                    {
                        type: 'input',
                        func: e => {
                            state.tables[key].content[r][c].innerHTML = e.target.textContent;
                            localStorage.setItem('savedState', JSON.stringify(state));
                            createTableCode(StateMachine.state);
                        },
                    }
                );
            }
        }
    });
};

export default createEditorTable;
