import { reload } from '../createEditorTable';
import setCollision from '../utl/setCollision';
import createElement from '../utl/createElement';

const body = state => {
    createElement({
        type: 'tbody',
        id: 'table-body',
        parent: 'editor-table',
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
                innerHTML: 'RS-',
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
                innerHTML: 'CS+',
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

                            state.headerContent.push({
                                innerHTML: 'innerHTML',
                                rowspan: 1,
                                colspan: 1,
                                rowCollision: false,
                                colCollision: false,
                            });

                            state.content.forEach(element =>
                                element.push({
                                    innerHTML: 'innerHTML',
                                    rowspan: 1,
                                    colspan: 1,
                                    rowCollision: false,
                                    colCollision: false,
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
        }
    }
};

export default body;
