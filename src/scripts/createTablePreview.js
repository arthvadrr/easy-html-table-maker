import createElement from './editor/createElement';

const createTablePreview = StateMachine => {
    const { state } = StateMachine;
    let previewTable = document.getElementById('preview-table');

    if (previewTable) {
        previewTable.parentNode.removeChild(previewTable);
    }

    createElement({
        type: 'table',
        id: 'preview-table',
        parent: 'preview'
    });

    if (state.caption) {
        createElement({
            type: 'caption',
            id: 'preview-table-caption',
            parent: 'preview-table',
            innerHTML: state.captionText
        });
    }

    if (state.header) {
        createElement({
            type: 'thead',
            id: 'preview-thead',
            parent: 'preview-table'
        });

        createElement({
            type: 'tr',
            id: 'preview-thead-row',
            parent: 'preview-thead'
        });

        for (let h = 0; h < state.headerContent.length; h++) {
            createElement({
                type: 'th',
                parent: 'preview-thead-row',
                innerHTML: state.headerContent[h].innerHTML
            });
        }
    }

    createElement({
        type: 'tbody',
        id: 'preview-tbody',
        parent: 'preview-table'
    });

    for (let r = 0; r < state.content.length; r++) {
        createElement({
            type: 'tr',
            id: `preview-table-row-${r}`,
            parent: `preview-tbody`
        });

        for (let c = 0; c < state.content[r].length; c++) {
            if (state.content[r][c].rowCollision || state.content[r][c].colCollision) {
                continue;
            }

            createElement({
                type: 'td',
                id: `preview-td-${r}${c}`,
                parent: `preview-table-row-${r}`,
                innerHTML: state.content[r][c].innerHTML,
                attrs: [
                    {
                        attr: 'rowspan',
                        value: state.content[r][c].rowspan
                    },
                    {
                        attr: 'colspan',
                        value: state.content[r][c].colspan
                    }
                ]
            });
        }
    }
};

export default createTablePreview;
