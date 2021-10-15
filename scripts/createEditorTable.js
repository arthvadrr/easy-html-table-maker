import createElement from './createElement';

const $div_editorTableContainer = document.getElementById('editor-table-container');

const createEditorTable = state => {
    state.tables.map((table, key) => {
        createElement(1, 'table', $div_editorTableContainer, `editor-table-${key}`, 'editor-table');

        if (table.header) {
            createElement(1, 'tr', `editor-table-${key}`, `table-header-${key}`);
            for (let a = 0; a < table.columns; a++) {
                createElement(
                    1,
                    'th',
                    `table-header-${key}`,
                    false,
                    false,
                    true,
                    table.headerContent[a].innerHTML
                );
            }
        }

        for (let i = 0; i < table.rows; i++) {
            createElement(1, 'tr', `editor-table-${key}`, `table-row-${i}`);

            for (let x = 0; x < table.columns; x++) {
                createElement(
                    1,
                    'td',
                    `table-row-${i}`,
                    `td-${i}${x}`,
                    false,
                    true,
                    table.content[i][x].innerHTML
                );
            }
        }
    });
};

export default createEditorTable;
