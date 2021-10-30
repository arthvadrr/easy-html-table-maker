import createElement from './editor/createElement';

const createTablePreview = StateMachine => {
    const { state } = StateMachine;
    let previewTable = document.getElementById('preview-table');

    if (previewTable) {
        previewTable.parentNode.removeChild(previewTable);
    }

    createElement('table', 'preview', 'preview-table');

    if (state.caption) {
        createElement('caption', 'preview-table', `table-caption`, false, true, state.captionText);
    }

    if (state.header) {
        createElement('thead', 'preview-table', 'preview-table-head');
        createElement('tr', `preview-table-head`, 'preview-table-header');
        for (let h = 0; h < state.headerContent.length; h++) {
            createElement(
                'th',
                'preview-table-header',
                false,
                false,
                false,
                state.headerContent[h].innerHTML
            );
        }
    }
    createElement('tbody', 'preview-table', 'preview-table-body');

    for (let r = 0; r < state.content.length; r++) {
        createElement('tr', 'preview-table-body', `preview-table-row-${r}`);

        for (let c = 0; c < state.content[r].length; c++) {
            if (state.content[r][c].rowCollision || state.content[r][c].colCollision) {
                continue;
            }

            createElement(
                'td',
                `preview-table-row-${r}`,
                `preview-td-${r}${c}`,
                false,
                false,
                state.content[r][c].innerHTML,
                false,
                false,
                state.content[r][c].rowspan,
                state.content[r][c].colspan
            );
        }
    }
};

export default createTablePreview;
