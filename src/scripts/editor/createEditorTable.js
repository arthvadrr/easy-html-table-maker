// Let the voids begin!

import createElement from './createElement';
import createTableCode from '../createTableCode';
import createTableRow from './createTableRow';
import createTablePreview from '../createTablePreview';

const createEditorTable = StateMachine => {
    const { state } = StateMachine;
    const $code_tableCode = document.getElementById('table-code');
    let $div_editorTableContainer = document.getElementById('editor-table-container');
    let $div_editorArea = document.getElementById('editor-area');

    // Remove the existing div so we don't get duplicates
    $div_editorTableContainer.parentNode.removeChild($div_editorTableContainer);
    $div_editorTableContainer = document.createElement('div');
    $div_editorTableContainer.setAttribute('id', 'editor-table-container');
    $div_editorArea.appendChild($div_editorTableContainer);

    const reload = reloadEditor => {
        localStorage.setItem('savedState', JSON.stringify(state));

        if (reloadEditor) {
            createEditorTable(StateMachine, $div_editorTableContainer, $code_tableCode);
        }

        createTableCode(StateMachine.state, $code_tableCode);
        createTablePreview(StateMachine);
    };

    //Set if a td has a colspan or rowspan collision, or no collision.
    const setCollision = (r, c, collision, offset) => {
        const rowspan = state.content[r][c].rowspan;
        const colspan = state.content[r][c].colspan;

        if (rowspan > 1) {
            for (let p = offset; p < rowspan; p++) {
                for (let col = 0; col < colspan; col++) {
                    state.content[r + p][c + col].rowCollision = collision;
                }
            }
        }

        if (colspan > 1) {
            for (let p = offset; p < colspan; p++) {
                for (let row = 0; row < rowspan; row++) {
                    state.content[r + row][c + p].colCollision = collision;
                }
            }
        }
    };

    // Create the container
    createElement('div', $div_editorTableContainer, `editor-table-container`);
    createElement('table', `editor-table-container`, `editor-table`, 'editor-table');
    createElement('button', `editor-table-container`, `add-row`, 'add-row-button', false, 'Add Row', {
        type: 'click',
        func: () => {
            state.content.push(createTableRow(StateMachine.state));
            reload(true);
        },
    });

    // Create the table
    createElement('button', `editor-table-container`, `remove-row`, 'remove-row-button', false, 'Remove Row', {
        type: 'click',
        func: () => {
            for (let td = 0; td < state.content.at(-1).length; td++) {
                if (state.content.at(-1)[td].rowCollision === true) {
                    alert('Rowspan detected, cannot delete row. Remove rowspan first.');
                    return;
                }
            }

            if (state.content.length > 1) {
                state.content.pop();
            }
            reload(true);
        },
    });

    // Create add column button
    createElement('button', `editor-table-container`, `add-column`, 'add-column-button', false, 'Add Column', {
        type: 'click',
        func: () => {
            // !!! objects oos, do not store as variables

            state.colgroupProps.push({
                width: 0,
                widthUnits: 'px',
            });

            state.headerContent.push({
                innerHTML: 'col',
                rowspan: 1,
                colspan: 1,
                rowCollision: false,
                colCollision: false,
            });

            StateMachine.state.content.forEach(element =>
                element.push({
                    innerHTML: 'col',
                    rowspan: 1,
                    colspan: 1,
                    rowCollision: false,
                    colCollision: false,
                })
            );
            reload(true);
        },
    });

    // Create remove column button
    createElement('button', `editor-table-container`, `remove-column`, 'remove-column-button', false, 'Remove Column', {
        type: 'click',
        func: () => {
            for (let row = 0; row < state.content.length; row++) {
                if (state.content[row].at(-1).colCollision === true) {
                    alert('Colspan detected, cannot delete column. Remove colspan first.');
                    return;
                }
            }

            if (state.colgroupProps.length > 1) {
                state.colgroupProps.pop();
            }

            if (state.headerContent.length > 1) {
                state.headerContent.pop();
            }

            state.content.forEach(element => {
                if (element.length > 1) {
                    element.pop();
                }
            });
            reload(true);
        },
    });

    // Create caption toggle
    createElement(
        'input',
        `editor-table-container`,
        `caption-toggle`,
        'caption-toggle',
        false,
        false,
        {
            type: 'click',
            func: () => {
                state.caption = !state.caption;
                reload(true);
            },
        },
        {
            type: 'checkbox',
            name: 'captionToggle',
            value: 'Toggle caption',
            checked: state.caption,
        }
    );

    // Create header toggle
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
                reload(true);
            },
        },
        {
            type: 'checkbox',
            name: 'headerToggle',
            value: 'Table header',
            checked: state.header,
        }
    );

    // Render caption
    if (state.caption) {
        // createElement({
        //     type: 'caption',
        //     parent: 'editor-table',
        //     id: 'editor-table',
        //     isEditable: true,
        //     innerHTML: state.captionText,
        //     eventObject: {
        //         listener: 'input',
        //         func: e => {
        //             state.captionText = e.target.textContent;
        //             reload();
        //         },
        //     },
        // });
        createElement('caption', `editor-table`, `table-caption`, false, true, state.captionText, {
            type: 'input',
            func: e => {
                state.captionText = e.target.textContent;
                reload();
            },
        });
    }

    if (state.colgroup) {
        createElement('colgroup', 'editor-table', 'editor-table-colgroup');
        for (let colgroupProps = 0; colgroupProps < state.colgroupProps.length; colgroupProps++) {
            createElement('col', 'editor-table-colgroup');
        }
    }

    if (state.header) {
        createElement('thead', `editor-table`, `table-head`);
        createElement('tr', `table-head`, `table-header`);
        for (let h = 0; h < state.headerContent.length; h++) {
            createElement('th', `table-header`, false, false, true, state.headerContent[h].innerHTML, {
                type: 'input',
                func: e => {
                    state.headerContent[h].innerHTML = e.target.textContent;
                    reload();
                },
            });
        }
    }
    createElement('tbody', `editor-table`, `table-body`);

    for (let r = 0; r < state.content.length; r++) {
        createElement('tr', `table-body`, `table-row-${r}`);

        for (let c = 0; c < state.content[r].length; c++) {
            if (state.content[r][c].rowCollision || state.content[r][c].colCollision) {
                console.log('ignore');
                continue;
            }

            // Ignore TDs based on rowspan and colspan
            setCollision(r, c, true, 1);

            createElement('td', `table-row-${r}`, `td-${r}${c}`, false, false, false, false, false, state.content[r][c].rowspan, state.content[r][c].colspan);

            createElement('p', `td-${r}${c}`, `p-${r}${c}`, 'td-p', true, state.content[r][c].innerHTML, {
                type: 'input',
                func: e => {
                    state.content[r][c].innerHTML = e.target.innerHTML;
                    reload();
                },
            });

            createElement('button', `td-${r}${c}`, `increase-rowspan-button-${r}${c}`, 'increase-rowspan-button', false, 'RS+', {
                type: 'click',
                func: () => {
                    // Determining if there is enough room for the rowspans
                    let totalColumnRowspans = 0;
                    for (let row = 0; row < state.content.length - 1; row++) {
                        if (!state.content[row][c].rowCollision) {
                            totalColumnRowspans += state.content[row][c].rowspan;
                        }
                    }

                    // If there isn't enough room, create another row
                    if (totalColumnRowspans >= state.content.length || r === state.content.length - 1) {
                        state.content.push(createTableRow(StateMachine.state));
                    }

                    state.content[r][c].rowspan++;
                    setCollision(r, c, true, 1);
                    reload(true);
                },
            });

            createElement(
                'button',
                `td-${r}${c}`,
                `decrease-rowspan-button-${r}${c}`,
                'decrease-rowspan-button',
                false,
                'RS-',
                {
                    type: 'click',
                    func: () => {
                        setCollision(r, c, false, 0);
                        state.content[r][c].rowspan--;
                        reload(true);
                    },
                },
                false,
                false,
                false,
                state.content[r][c].rowspan > 1 ? false : true
            );

            createElement('button', `td-${r}${c}`, `increase-colspan-button-${r}${c}`, 'increase-colspan-button', false, 'CS+', {
                type: 'click',
                func: () => {
                    // Determining if there is enough room for the colspans
                    let totalRowColumnSpans = 0;
                    for (let column = 0; column < state.content[r].length - 1; column++) {
                        if (!state.content[r][column].colCollision) {
                            totalRowColumnSpans += state.content[r][column].colspan;
                        }
                    }

                    // If there isn't enough room, create another column (to thead and tbody)
                    if (totalRowColumnSpans >= state.content[r].length || c === state.content[r].length - 1) {
                        state.headerContent.push({
                            innerHTML: 'col',
                            rowspan: 1,
                            colspan: 1,
                            rowCollision: false,
                            colCollision: false,
                        });

                        StateMachine.state.content.forEach(element =>
                            element.push({
                                innerHTML: 'col',
                                rowspan: 1,
                                colspan: 1,
                                rowCollision: false,
                                colCollision: false,
                            })
                        );
                    }
                    state.content[r][c].colspan++;
                    setCollision(r, c, true, 1);
                    reload(true);
                },
            });

            createElement(
                'button',
                `td-${r}${c}`,
                `decrease-colspan-button-${r}${c}`,
                'decrease-colspan-button',
                false,
                'CS-',
                {
                    type: 'click',
                    func: () => {
                        setCollision(r, c, false, 0);
                        state.content[r][c].colspan--;
                        reload(true);
                    },
                },
                false,
                false,
                false,
                state.content[r][c].colspan > 1 ? false : true
            );
        }
    }
};

export default createEditorTable;
