import createElement from './editor/utl/createElement';

const createTablePreview = state => {
    let previewTable = document.getElementById('preview-table');

    if (previewTable) {
        previewTable.parentNode.removeChild(previewTable);
    }

    createElement({
        type: 'table',
        id: 'preview-table',
        parent: 'preview',
    });

    if (state.caption) {
        createElement({
            type: 'caption',
            id: 'preview-table-caption',
            parent: 'preview-table',
            innerHTML: state.captionText,
        });
    }

    if (state.header) {
        createElement({
            type: 'thead',
            id: 'preview-thead',
            parent: 'preview-table',
        });

        for (let r = 0; r < state.headerContent.length; r++) {
            createElement({
                type: 'tr',
                id: `preview-table-header-row-${r}`,
                parent: `preview-thead`,
            });

            for (let c = 0; c < state.headerContent[r].length; c++) {
                if (state.headerContent[r][c].rowCollision || state.headerContent[r][c].colCollision) {
                    continue;
                }

                let cellType = 'th';

                createElement({
                    type: cellType,
                    id: `preview-th-${r}${c}`,
                    parent: `preview-table-header-row-${r}`,
                    innerHTML: state.headerContent[r][c].innerHTML,
                    attrs: [
                        {
                            attr: 'rowspan',
                            value: state.headerContent[r][c].rowspan,
                        },
                        {
                            attr: 'colspan',
                            value: state.headerContent[r][c].colspan,
                        },
                    ],
                });
            }
        }
    }

    createElement({
        type: 'tbody',
        id: 'preview-tbody',
        parent: 'preview-table',
    });

    for (let r = 0; r < state.content.length; r++) {
        createElement({
            type: 'tr',
            id: `preview-table-row-${r}`,
            parent: `preview-tbody`,
        });

        for (let c = 0; c < state.content[r].length; c++) {
            if (state.content[r][c].rowCollision || state.content[r][c].colCollision) {
                continue;
            }

            let cellType = state.content[r][c].isHeader ? 'th' : 'td';

            createElement({
                type: cellType,
                id: `preview-td-${r}${c}`,
                parent: `preview-table-row-${r}`,
                innerHTML: state.content[r][c].innerHTML,
                attrs: [
                    {
                        attr: 'rowspan',
                        value: state.content[r][c].rowspan,
                    },
                    {
                        attr: 'colspan',
                        value: state.content[r][c].colspan,
                    },
                    {
                        attr: 'scope',
                        value: state.content[r][c].headerScope,
                    },
                ],
            });
        }
    }

    if (state.footer) {
        createElement({
            type: 'tfoot',
            id: 'preview-tfoot',
            parent: 'preview-table',
        });

        for (let r = 0; r < state.footerContent.length; r++) {
            createElement({
                type: 'tr',
                id: `preview-table-footer-row-${r}`,
                parent: `preview-tfoot`,
            });
            for (let c = 0; c < state.footerContent[r].length; c++) {
                if (state.footerContent[r][c].rowCollision || state.footerContent[r][c].colCollision) {
                    continue;
                }

                let cellType = state.footerContent[r][c].isHeader ? 'th' : 'td';

                createElement({
                    type: cellType,
                    id: `preview-footer-td-${r}${c}`,
                    parent: `preview-table-footer-row-${r}`,
                    innerHTML: state.footerContent[r][c].innerHTML,
                    attrs: [
                        {
                            attr: 'rowspan',
                            value: state.footerContent[r][c].rowspan,
                        },
                        {
                            attr: 'colspan',
                            value: state.footerContent[r][c].colspan,
                        },
                        {
                            attr: 'scope',
                            value: state.footerContent[r][c].headerScope,
                        },
                    ],
                });
            }
        }
    }
};

export default createTablePreview;
