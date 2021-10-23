import createElement from './createElement';
import createTableCode from './createTableCode';
import createTableRow from './createTableRow';

const createEditorTable = StateMachine => {
    const { state } = StateMachine;
    const $code_tableCode = document.getElementById('table-code');
    let $div_editorTableContainer = document.getElementById('editor-table-container');
    let $div_editorArea = document.getElementById('editor-area');
    $div_editorTableContainer.parentNode.removeChild($div_editorTableContainer);
    $div_editorTableContainer = document.createElement('div');
    $div_editorTableContainer.setAttribute('id', 'editor-table-container');
    $div_editorArea.appendChild($div_editorTableContainer);

    const refresh = () => {
        localStorage.setItem('savedState', JSON.stringify(state));
        createTableCode(StateMachine.state, $code_tableCode);
        createEditorTable(StateMachine, $div_editorTableContainer, $code_tableCode);
    };

    state.tables.map((table, index) => {
        createElement('div', $div_editorTableContainer, `editor-table-container-${index}`);
        createElement(
            'table',
            `editor-table-container-${index}`,
            `editor-table-${index}`,
            'editor-table'
        );
        createElement(
            'button',
            `editor-table-container-${index}`,
            `add-row-${index}`,
            'add-row-button',
            false,
            'Add Row',
            {
                type: 'click',
                func: () => {
                    state.tables[index].rows++;
                    state.tables[index].content.push(createTableRow(StateMachine.state, index));
                    refresh();
                },
            }
        );
        createElement(
            'button',
            `editor-table-container-${index}`,
            `remove-row-${index}`,
            'remove-row-button',
            false,
            'Remove Row',
            {
                type: 'click',
                func: () => {
                    if (state.tables[index].rows > 0) {
                        state.tables[index].rows--;
                    }
                    state.tables[index].content.pop();
                    refresh();
                },
            }
        );

        if (table.header) {
            createElement('thead', `editor-table-${index}`, `table-head-${index}`);
            createElement('tr', `table-head-${index}`, `table-header-${index}`);
            for (let h = 0; h < table.columns; h++) {
                createElement(
                    'th',
                    `table-header-${index}`,
                    false,
                    false,
                    true,
                    table.headerContent[h].innerHTML,
                    {
                        type: 'input',
                        func: e => {
                            state.tables[index].headerContent[h].innerHTML = e.target.textContent;
                            localStorage.setItem('savedState', JSON.stringify(state));
                            createTableCode(StateMachine.state, $code_tableCode);
                        },
                    }
                );
            }
        }

        for (let r = 0; r < table.rows; r++) {
            createElement('tbody', `editor-table-${index}`, `table-body-${index}`);
            createElement('tr', `table-body-${index}`, `table-row-${r}`);

            for (let c = 0; c < table.columns; c++) {
                createElement(
                    'td',
                    `table-row-${r}`,
                    `td-${r}${c}`,
                    false,
                    true,
                    table.content[r][c].innerHTML,
                    {
                        type: 'input',
                        func: e => {
                            state.tables[index].content[r][c].innerHTML = e.target.textContent;
                            localStorage.setItem('savedState', JSON.stringify(state));
                            createTableCode(StateMachine.state, $code_tableCode);
                        },
                    }
                );
            }
        }
    });
};

export default createEditorTable;
