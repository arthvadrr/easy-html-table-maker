import { reload } from '../createEditorTable';
import createElement from '../utl/createElement';

const colgroup = state => {
    if (state.colgroup) {
        createElement({
            type: 'h3',
            innerHTML: 'Table Colgroup',
            parent: 'editor-table',
        });

        createElement({
            type: 'tr',
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
                type: 'td',
                id: `colgroup-item-${colgroupIndex}`,
                parent: 'editor-table-colgroup',
                attrs: [
                    {
                        attr: 'span',
                        value: state.colgroupProps[colgroupIndex].span ? state.colgroupProps[colgroupIndex].span + '' : 1,
                    },
                ],
            });

            createElement({
                type: 'h4',
                parent: `colgroup-item-${colgroupIndex}`,
                innerHTML: `Col ${colgroupIndex}`,
            });

            createElement({
                type: 'input',
                id: `colgroup-use-span-${colgroupIndex}`,
                parent: `colgroup-item-${colgroupIndex}`,
                attrs: [
                    {
                        attr: 'type',
                        value: 'checkbox',
                    },
                ],
                inputProps: {
                    type: 'checkbox',
                    label: 'Span',
                    name: 'span-toggle',
                    for: `colgroup-use-span-${colgroupIndex}`,
                    value: 'Span',
                    checked: state.colgroupProps[colgroupIndex].useSpan,
                },
                eventObject: {
                    listener: 'click',
                    func: () => {
                        state.colgroupProps[colgroupIndex].useSpan = !state.colgroupProps[colgroupIndex].useSpan;
                        reload(state, true);
                    },
                },
            });

            if (state.colgroupProps[colgroupIndex].useSpan)
                createElement({
                    type: 'input',
                    id: `colgroup-use-span-amount-${colgroupIndex}`,
                    parent: `colgroup-item-${colgroupIndex}`,
                    inputProps: {
                        type: 'number',
                        label: `Amount (current max is ${state.content.length + state.headerContent.length + state.footerContent.length})`,
                        name: 'span-toggle',
                        for: `colgroup-use-span-${colgroupIndex}`,
                        checked: state.colgroupProps[colgroupIndex].useSpan,
                    },
                    eventObject: {
                        listener: 'input',
                        func: e => {
                            if (e.target.value <= state.content.length + state.headerContent.length + state.footerContent.length) {
                                state.colgroupProps[colgroupIndex].span = e.target.value;
                                reload(state);
                            } else {
                                alert('Please enter a valid number (span cannot exceed total table rows length)');
                                e.target.value = '';
                            }
                            reload(state);
                        },
                    },
                });

            createElement({
                type: 'input',
                id: `colgroup-use-classname-name-${colgroupIndex}`,
                parent: `colgroup-item-${colgroupIndex}`,
                attrs: [
                    {
                        attr: 'type',
                        value: 'checkbox',
                    },
                ],
                inputProps: {
                    type: 'checkbox',
                    label: 'Class',
                    name: 'classname-toggle',
                    for: `colgroup-use-classname-name-${colgroupIndex}`,
                    checked: state.colgroupProps[colgroupIndex].useClassName,
                },
                eventObject: {
                    listener: 'click',
                    func: () => {
                        state.colgroupProps[colgroupIndex].useClassName = !state.colgroupProps[colgroupIndex].useClassName;
                        reload(state, true);
                    },
                },
            });

            if (state.colgroupProps[colgroupIndex].useClassName)
                createElement({
                    type: 'input',
                    id: `colgroup-use-classname-name-${colgroupIndex}`,
                    parent: `colgroup-item-${colgroupIndex}`,
                    attrs: {
                        attr: 'placeholder',
                        value: 'Enter a class name',
                    },
                    inputProps: {
                        type: 'text',
                        label: 'Name',
                        name: `colgroup-use-classname-name-${colgroupIndex}`,
                        for: `colgroup-use-classname-name-${colgroupIndex}`,
                        checked: state.colgroupProps[colgroupIndex].useClassName,
                    },
                    eventObject: {
                        listener: 'input',
                        func: e => {
                            if (e.target.value != undefined && e.target.value != '') {
                                state.colgroupProps[colgroupIndex].span = e.target.value;
                                reload(state);
                            }
                            reload(state);
                        },
                    },
                });
        }
    }
};

export default colgroup;
