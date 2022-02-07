import { reload } from '../createEditorTable';
import createElement from '../utl/createElement';
import createTableFooterRow from '../utl/createTableFooterRow';
import setCollision from '../utl/setCollision';

const footer = state => {
    if (state.footer) {
        createElement({
            type: 'h3',
            id: 'footer-heading',
            parent: 'editor-table',
            innerHTML: 'Table Footer',
        });

        createElement({
            type: 'tfoot',
            id: 'table-footer',
            parent: 'editor-table',
        });
        for (let r = 0; r < state.footerContent.length; r++) {
            createElement({
                type: 'tr',
                id: `table-footer-row-${r}`,
                parent: 'table-footer',
            });

            for (let c = 0; c < state.footerContent[r].length; c++) {
                if (state.footerContent[r][c].rowCollision || state.footerContent[r][c].colCollision) {
                    continue;
                }

                // Ignore TDs based on rowspan and colspan
                setCollision(state, r, c, true, 1, false, true);

                createElement({
                    type: 'td',
                    id: `footer-td-${r}${c}`,
                    parent: `table-footer-row-${r}`,
                    attrs: [
                        {
                            attr: 'rowspan',
                            value: state.footerContent[r][c].rowspan,
                        },
                        {
                            attr: 'colspan',
                            value: state.footerContent[r][c].colspan,
                        },
                    ],
                });

                createElement({
                    type: 'p',
                    id: `fp-${r}${c}`,
                    parent: `footer-td-${r}${c}`,
                    innerHTML: state.footerContent[r][c].innerHTML,
                    attrs: [
                        {
                            attr: 'classname',
                            value: 'footer-td-p',
                        },
                        {
                            attr: 'contenteditable',
                            value: 'true',
                        },
                    ],
                    eventObject: {
                        listener: 'input',
                        func: e => {
                            state.footerContent[r][c].innerHTML = e.target.innerHTML;
                            reload(state);
                        },
                    },
                });

                createElement({
                    type: 'button',
                    id: `increase-footer-rowspan-button-${r}${c}`,
                    parent: `footer-td-${r}${c}`,
                    innerHTML: 'RS+',
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
                            for (let row = 0; row < state.footerContent.length - 1; row++) {
                                if (!state.footerContent[row][c].rowCollision) {
                                    totalColumnRowspans += state.footerContent[row][c].rowspan;
                                }
                            }

                            // If there isn't enough room, create another row
                            if (totalColumnRowspans >= state.footerContent.length || r === state.footerContent.length - 1) {
                                state.footerContent.push(createTableFooterRow(state));
                            }

                            state.footerContent[r][c].rowspan++;
                            setCollision(state, r, c, true, 1, false, true);
                            reload(state, true);
                        },
                    },
                });

                createElement({
                    type: 'button',
                    id: `decrease-footer-rowspan-button-${r}${c}`,
                    parent: `footer-td-${r}${c}`,
                    innerHTML: 'RS-',
                    attrs: [
                        {
                            attr: 'classname',
                            value: 'decrease-rowspan-button',
                        },
                        {
                            attr: 'disabled',
                            value: state.footerContent[r][c].rowspan > 1 ? 'false' : 'true',
                        },
                    ],
                    eventObject: {
                        listener: 'click',
                        func: () => {
                            setCollision(state, r, c, false, 0, false, true);
                            state.footerContent[r][c].rowspan--;
                            reload(state, true);
                        },
                    },
                });

                createElement({
                    type: 'button',
                    id: `increase-footer-colspan-button-${r}${c}`,
                    parent: `footer-td-${r}${c}`,
                    innerHTML: 'CS+',
                    eventObject: {
                        listener: 'click',
                        func: () => {
                            // Determining if there is enough room for the colspans
                            let totalRowColumnSpans = 0;
                            for (let column = 0; column < state.footerContent[r].length - 1; column++) {
                                if (!state.footerContent[r][column].colCollision) {
                                    totalRowColumnSpans += state.footerContent[r][column].colspan;
                                }
                            }

                            // If there isn't enough room, create another column (to thead and tbody)
                            if (totalRowColumnSpans >= state.footerContent[r].length || c === state.footerContent[r].length - 1) {
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
                                    })
                                );

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
                            }
                            state.footerContent[r][c].colspan++;
                            setCollision(state, r, c, true, 1, false, true);
                            reload(state, true);
                        },
                    },
                });

                createElement({
                    type: 'button',
                    id: `decrease-colspan-button-${r}${c}`,
                    parent: `footer-td-${r}${c}`,
                    innerHTML: 'CS-',
                    attrs: [
                        {
                            attr: 'classname',
                            value: 'decrease-colspan-button',
                        },
                        {
                            attr: 'disabled',
                            value: state.footerContent[r][c].colspan > 1 ? 'false' : 'true',
                        },
                    ],
                    eventObject: {
                        listener: 'click',
                        func: () => {
                            setCollision(state, r, c, false, 0, false, true);
                            state.footerContent[r][c].colspan--;
                            reload(state, true);
                        },
                    },
                });

                createElement({
                    type: 'input',
                    id: `footer-isHeader-${r}${c}`,
                    parent: `footer-td-${r}${c}`,
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
                        for: `footer-isHeader-${r}${c}`,
                        name: `footer-isHeader-${r}${c}`,
                        checked: state.footerContent[r][c].isHeader,
                    },
                    eventObject: {
                        listener: 'change',
                        func: e => {
                            state.footerContent[r][c].isHeader = !state.footerContent[r][c].isHeader;
                            reload(state, true);
                        },
                    },
                });

                if (state.footerContent[r][c].isHeader) {
                    createElement({
                        type: 'div',
                        id: `footer-isHeaderContainer-${r}${c}`,
                        parent: `footer-td-${r}${c}`,
                    });

                    createElement({
                        type: 'span',
                        innerHTML: 'Scope',
                        parent: `footer-isHeaderContainer-${r}${c}`,
                    });

                    createElement({
                        type: 'input',
                        id: `footer-headerScopeCol-${r}${c}`,
                        parent: `footer-isHeaderContainer-${r}${c}`,
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
                            for: `footer-headerScopeCol-${r}${c}`,
                            name: `footer-scope-${r}${c}`,
                            checked: state.footerContent[r][c].headerScope === 'col',
                        },
                        eventObject: {
                            listener: 'change',
                            func: () => {
                                state.footerContent[r][c].headerScope = 'col';
                                reload(state, true);
                            },
                        },
                    });

                    createElement({
                        type: 'input',
                        id: `footer-headerScopeRow-${r}${c}`,
                        parent: `footer-isHeaderContainer-${r}${c}`,
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
                            for: `footer-headerScopeRow-${r}${c}`,
                            name: `footer-scope-${r}${c}`,
                            checked: state.footerContent[r][c].headerScope === 'row',
                        },
                        eventObject: {
                            listener: 'change',
                            func: () => {
                                state.footerContent[r][c].headerScope = 'row';
                                reload(state, true);
                            },
                        },
                    });
                }
            }
        }
    }
};

export default footer;
