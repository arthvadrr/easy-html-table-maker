import { reload } from '../createEditorTable';
import setCollision from '../utl/setCollision';
import createElement from '../utl/createElement';
import createTableRow from '../utl/createTableRow';
import createColControls from '../utl/createColControls';

const body = state => {
    createElement({
        type: 'h3',
        id: 'body-heading',
        parent: 'editor-table',
        innerHTML: 'table body',
    });

    createElement({
        type: 'tbody',
        id: 'table-body',
        parent: 'editor-table',
    });

    createElement({
        type: 'tr',
        id: `table-col-control-row`,
        parent: 'table-body',
    });

    for (let r = 0; r < state.content.length; r++) {
        createElement({
            type: 'tr',
            id: `table-row-${r}`,
            parent: 'table-body',
        });

        for (let c = 0; c < state.content[r].length; c++) {
            if (state.content[r][c].rowCollision || state.content[r][c].colCollision) {
                continue;
            }

            if (r === 0) {
                createElement({
                    type: 'td',
                    id: `td-colcon-${c}`,
                    parent: `table-col-control-row`,
                });
                createColControls({
                    id: `colcon-${c}`,
                    parent: `td-colcon-${c}`,
                    state: state,
                    c: c,
                });
            }

            // Ignore TDs based on rowspan and colspan
            setCollision(state, r, c, true, 1);

            createElement({
                type: 'td',
                id: `td-${r}${c}`,
                parent: `table-row-${r}`,
                attrs: [
                    {
                        attr: 'rowspan',
                        value: state.content[r][c].rowspan,
                    },
                    {
                        attr: 'colspan',
                        value: state.content[r][c].colspan,
                    },
                ],
            });

            createElement({
                type: 'p',
                id: `p-${r}${c}`,
                parent: `td-${r}${c}`,
                innerHTML: state.content[r][c].innerHTML,
                attrs: [
                    {
                        attr: 'classname',
                        value: 'td-p',
                    },
                    {
                        attr: 'contenteditable',
                        value: 'true',
                    },
                ],
                eventObject: {
                    listener: 'input',
                    func: e => {
                        state.content[r][c].innerHTML = e.target.innerHTML;
                        reload(state);
                    },
                },
            });

            createElement({
                type: 'button',
                id: `increase-rowspan-button-${r}${c}`,
                parent: `td-${r}${c}`,
                innerHTML: 'rs+',
                attrs: [
                    {
                        attr: 'classname',
                        value: 'increase-rowspan-button',
                    },
                ],
                eventObject: {
                    listener: 'click',
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
                            state.content.push(createTableRow(state));
                        }

                        state.content[r][c].rowspan++;
                        setCollision(state, r, c, true, 1);
                        reload(state, true);
                    },
                },
            });

            createElement({
                type: 'button',
                id: `decrease-rowspan-button-${r}${c}`,
                parent: `td-${r}${c}`,
                innerHTML: 'rs-',
                attrs: [
                    {
                        attr: 'classname',
                        value: 'decrease-rowspan-button',
                    },
                    {
                        attr: 'disabled',
                        value: state.content[r][c].rowspan > 1 ? 'false' : 'true',
                    },
                ],
                eventObject: {
                    listener: 'click',
                    func: () => {
                        setCollision(state, r, c, false, 0);
                        state.content[r][c].rowspan--;
                        reload(state, true);
                    },
                },
            });

            createElement({
                type: 'button',
                id: `increase-colspan-button-${r}${c}`,
                parent: `td-${r}${c}`,
                innerHTML: 'cs+',
                eventObject: {
                    listener: 'click',
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
                            state.colgroupProps.push({
                                useWidth: false,
                                width: 0,
                                widthUnits: 'px',
                                span: 1,
                            });

                            state.columnSettings.push({
                                useWidth: false,
                                width: 0,
                                widthUnits: 'px',
                                align: 'none',
                            });

                            state.content.forEach(element =>
                                element.push({
                                    innerHTML: 'innerHTML',
                                    rowspan: 1,
                                    colspan: 1,
                                    rowCollision: false,
                                    colCollision: false,
                                    isHeader: false,
                                    headerScope: 'col',
                                })
                            );

                            state.headerContent.forEach(element =>
                                element.push({
                                    innerHTML: 'innerHTML',
                                    rowspan: 1,
                                    colspan: 1,
                                    rowCollision: false,
                                    colCollision: false,
                                })
                            );

                            state.footerContent.forEach(element =>
                                element.push({
                                    innerHTML: 'innerHTML',
                                    rowspan: 1,
                                    colspan: 1,
                                    rowCollision: false,
                                    colCollision: false,
                                    isHeader: false,
                                    headerScope: 'col',
                                })
                            );
                        }
                        state.content[r][c].colspan++;
                        setCollision(state, r, c, true, 1);
                        reload(state, true);
                    },
                },
            });

            createElement({
                type: 'button',
                id: `decrease-colspan-button-${r}${c}`,
                parent: `td-${r}${c}`,
                innerHTML: 'CS-',
                attrs: [
                    {
                        attr: 'classname',
                        value: 'decrease-colspan-button',
                    },
                    {
                        attr: 'disabled',
                        value: state.content[r][c].colspan > 1 ? 'false' : 'true',
                    },
                ],
                eventObject: {
                    listener: 'click',
                    func: () => {
                        setCollision(state, r, c, false, 0);
                        state.content[r][c].colspan--;
                        reload(state, true);
                    },
                },
            });

            createElement({
                type: 'input',
                id: `isHeader-${r}${c}`,
                parent: `td-${r}${c}`,
                attrs: [
                    {
                        attr: 'classname',
                        value: 'isheader',
                    },
                ],
                inputProps: {
                    type: 'checkbox',
                    container: 'div',
                    label: 'Is header',
                    for: `isHeader-${r}${c}`,
                    name: `isHeader-${r}${c}`,
                    checked: state.content[r][c].isHeader,
                },
                eventObject: {
                    listener: 'change',
                    func: e => {
                        state.content[r][c].isHeader = !state.content[r][c].isHeader;
                        reload(state, true);
                    },
                },
            });

            if (state.content[r][c].isHeader) {
                createElement({
                    type: 'div',
                    id: `isHeaderContainer-${r}${c}`,
                    parent: `td-${r}${c}`,
                });

                createElement({
                    type: 'span',
                    innerHTML: 'scope',
                    parent: `isHeaderContainer-${r}${c}`,
                });

                createElement({
                    type: 'input',
                    id: `headerScopeCol-${r}${c}`,
                    parent: `isHeaderContainer-${r}${c}`,
                    attrs: [
                        {
                            attr: 'classname',
                            value: 'headerScope',
                        },
                    ],
                    inputProps: {
                        type: 'radio',
                        container: 'div',
                        label: 'Col',
                        for: `headerScopeCol-${r}${c}`,
                        name: `scope-${r}${c}`,
                        checked: state.content[r][c].headerScope === 'col',
                    },
                    eventObject: {
                        listener: 'change',
                        func: () => {
                            state.content[r][c].headerScope = 'col';
                            reload(state, true);
                        },
                    },
                });

                createElement({
                    type: 'input',
                    id: `headerScopeRow-${r}${c}`,
                    parent: `isHeaderContainer-${r}${c}`,
                    attrs: [
                        {
                            attr: 'classname',
                            value: 'headerScope',
                        },
                    ],
                    inputProps: {
                        type: 'radio',
                        container: 'div',
                        label: 'Row',
                        for: `headerScopeRow-${r}${c}`,
                        name: `scope-${r}${c}`,
                        checked: state.content[r][c].headerScope === 'row',
                    },
                    eventObject: {
                        listener: 'change',
                        func: () => {
                            state.content[r][c].headerScope = 'row';
                            reload(state, true);
                        },
                    },
                });
            }
        }
    }
};

export default body;
