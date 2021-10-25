import createElement from './createElement';
import createTableCode from './createTableCode';
import createTableRow from './createTableRow';

const createEditorTable = StateMachine => {
    const { state } = StateMachine;
    const $code_tableCode = document.getElementById('table-code');
    let totalRowspans;
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

    createElement('div', $div_editorTableContainer, `editor-table-container`);
    createElement('table', `editor-table-container`, `editor-table`, 'editor-table');
    createElement(
        'button',
        `editor-table-container`,
        `add-row`,
        'add-row-button',
        false,
        'Add Row',
        {
            type: 'click',
            func: () => {
                state.rows++;
                state.content.push(createTableRow(StateMachine.state, index));
                refresh();
            },
        }
    );
    createElement(
        'button',
        `editor-table-container`,
        `remove-row`,
        'remove-row-button',
        false,
        'Remove Row',
        {
            type: 'click',
            func: () => {
                if (state.rows > 0) {
                    state.rows--;
                }
                state.content.pop();
                refresh();
            },
        }
    );
    createElement(
        'button',
        `editor-table-container`,
        `add-column`,
        'add-column-button',
        false,
        'Add Column',
        {
            type: 'click',
            func: () => {
                const col = { innerHTML: 'col' };

                if (state.header) {
                    state.headerContent.push(col);
                }

                state.content.forEach(element => {
                    element.push(col);
                });
                state.columns++;
                refresh();
            },
        }
    );
    createElement(
        'button',
        `editor-table-container`,
        `remove-column`,
        'remove-column-button',
        false,
        'Remove Column',
        {
            type: 'click',
            func: () => {
                const col = { innerHTML: 'col' };

                if (state.header) {
                    state.headerContent.pop();
                }

                state.content.forEach(element => {
                    element.pop();
                });
                if (state.columns > 0) {
                    state.columns--;
                }
                refresh();
            },
        }
    );
    createElement(
        'input',
        `editor-table-container`,
        `caption-toggle`,
        'caption-toggle',
        false,
        false,
        {
            type: 'click',
            func: e => {
                state.caption = !state.caption;
                if (e.target.checked) {
                    console.log('checked');
                } else {
                    console.log('not checked');
                }
                refresh();
            },
        },
        {
            type: 'checkbox',
            name: 'captionToggle',
            value: 'Toggle caption',
            checked: state.caption,
        }
    );

    createElement(
        'input',
        `editor-table-container`,
        `header-toggle`,
        'header-toggle',
        false,
        false,
        {
            type: 'click',
            func: () => {
                state.header = !state.header;
                refresh();
            },
        },
        {
            type: 'checkbox',
            name: 'headerToggle',
            value: 'Table header',
            checked: state.header,
        }
    );

    if (state.caption) {
        createElement('caption', `editor-table`, `table-caption`, false, true, state.captionText, {
            type: 'input',
            func: e => {
                state.captionText = e.target.textContent;
                localStorage.setItem('savedState', JSON.stringify(state));
                createTableCode(StateMachine.state, $code_tableCode);
            },
        });
    }

    if (state.header) {
        createElement('thead', `editor-table`, `table-head`);
        createElement('tr', `table-head`, `table-header`);
        for (let h = 0; h < state.columns; h++) {
            createElement(
                'th',
                `table-header`,
                false,
                false,
                true,
                state.headerContent[h].innerHTML,
                {
                    type: 'input',
                    func: e => {
                        state.headerContent[h].innerHTML = e.target.textContent;
                        localStorage.setItem('savedState', JSON.stringify(state));
                        createTableCode(StateMachine.state, $code_tableCode);
                    },
                }
            );
        }
    }

    for (let r = 0; r < state.content.length; r++) {
        createElement('tbody', `editor-table`, `table-body`);
        createElement('tr', `table-body`, `table-row-${r}`);

        for (let c = 0; c < state.content[r].length; c++) {
            createElement(
                'td',
                `table-row-${r}`,
                `td-${r}${c}`,
                false,
                true,
                state.content[r][c].innerHTML,
                {
                    type: 'input',
                    func: e => {
                        state.content[r][c].innerHTML = e.target.textContent;
                        localStorage.setItem('savedState', JSON.stringify(state));
                        createTableCode(StateMachine.state, $code_tableCode);
                    },
                },
                false,
                state.content[r][c].rowspan,
                state.content[r][c].colspan
            );
            if (state.content[r][c].rowspan > 1) {
                state.content[r + (state.content[r][c].rowspan - 1)].splice(c, 1);
            }
            totalRowspans = 0;
            for (let s = 0; s < state.content[r].length; s++) {
                totalRowspans += state.content[r][s].rowspan;
            }

            if (r < state.content.length - 1) {
                createElement(
                    'button',
                    `td-${r}${c}`,
                    `increase-rowspan-button-${r}${c}`,
                    'increase-rowspan-button',
                    false,
                    'RS+',
                    {
                        type: 'click',
                        func: () => {
                            state.content[r][c].rowspan++;
                            state.rowspans++;
                            refresh();
                        },
                    },
                    false,
                    false,
                    false,
                    totalRowspans == state.content.length - 1 ? true : false
                );
            }
        }
    }
};

export default createEditorTable;
