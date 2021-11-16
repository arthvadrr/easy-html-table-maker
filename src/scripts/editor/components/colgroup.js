import { reload } from '../createEditorTable';
import createElement from '../utl/createElement';

const colgroup = state => {
    if (state.colgroup) {
        createElement({
            type: 'colgroup',
            id: 'editor-table-colgroup',
            parent: 'editor-table',
            attrs: [
                {
                    attr: 'style',
                    value: 'display: table-header-group',
                },
            ],
        });

        for (let colgroupIndex = 0; colgroupIndex < state.colgroupProps.length; colgroupIndex++) {
            createElement({
                type: 'col',
                id: `colgroup-item-${colgroupIndex}`,
                parent: 'editor-table-colgroup',
                attrs: [
                    {
                        attr: 'span',
                        value: state.colgroupProps[colgroupIndex].span ? state.colgroupProps[colgroupIndex].span + '' : 1,
                    },
                ],
            });
        }
    }
};

export default colgroup;
