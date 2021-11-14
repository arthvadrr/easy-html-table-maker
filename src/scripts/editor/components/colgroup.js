import { reload } from "../createEditorTable";
import createElement from "../utl/createElement";

const colgroup = state => {
    if (state.colgroup) {
        createElement({
            type: 'colgroup',
            id: 'editor-table-colgroup',
            parent: 'editor-table',
            attrs: [
                {
                    attr: 'style',
                    value: 'display: table-header-group'
                }
            ]
        });
        
        for (let colgroupIndex = 0; colgroupIndex < state.colgroupProps.length; colgroupIndex++) {
            createElement({
                type: 'col',
                id: `colgroup-item-${colgroupIndex}`,
                parent: 'editor-table-colgroup',
                attrs: [
                    {
                        attr: 'width',
                        value: state.colgroupProps[colgroupIndex].useWidth ? state.colgroupProps[colgroupIndex].width + state.colgroupProps[colgroupIndex].widthUnits : false,
                    },
                    {
                        attr: 'span',
                        value: state.colgroupProps[colgroupIndex].span ? state.colgroupProps[colgroupIndex].span + '' : 1,
                    },
                    {
                        attr: 'style',
                        value: 'display: table-cell'
                    },
                    {
                        attr: 'align',
                        value: state.colgroupProps[colgroupIndex].align
                    }
                ]
            });

            createElement({
                type: 'div',
                id: `col-align-radio-group-${colgroupIndex}`,
                parent: `colgroup-item-${colgroupIndex}`,
                innerHTML: 'Text align'
            });

            const alignOptions = [
                'left',
                'center',
                'right',
                'Justify'
            ];

            alignOptions.map((option, i) => {
                createElement({
                    type: 'input',
                    id: `col-align-option-${colgroupIndex}${i}`,
                    parent: `col-align-radio-group-${colgroupIndex}`,
                    inputProps: {
                        type: 'radio',
                        label: option,
                        value: option,
                        name: `align-options-${colgroupIndex}`,
                        for: `col-align-option-${colgroupIndex}${i}`,
                        checked: state.colgroupProps[colgroupIndex].align === option ? true : false
                    },
                    eventObject: {
                        listener: 'click',
                        func: e => {
                            state.colgroupProps[colgroupIndex].align = e.target.value;
                            reload(state, true);
                        }
                    }
                })
            });

            createElement({
                type: 'input',
                id: `use-col-width-${colgroupIndex}`,
                parent: `colgroup-item-${colgroupIndex}`,
                inputProps: {
                    type: 'checkbox',
                    label: 'Use col width (deprecated)',
                    for: `use-col-width-${colgroupIndex}`,
                    checked: state.colgroupProps[colgroupIndex].useWidth,
                },
                eventObject: {
                    listener: 'click',
                    func: () => {
                        state.colgroupProps[colgroupIndex].useWidth = !state.colgroupProps[colgroupIndex].useWidth,
                        reload(state, true);
                    },
                },
            });
            
            if (state.colgroupProps[colgroupIndex].useWidth) {

                createElement({
                    type: 'input',
                    id: `col-width-input-${colgroupIndex}`,
                    parent: `colgroup-item-${colgroupIndex}`,
                    inputProps: {
                        type: 'number',
                        container: 'div',
                        for: `columnWidth-${colgroupIndex}`,
                        label: 'Col width',
                        value: state.colgroupProps[colgroupIndex].width,
                        min: 0, // <colgroup> 'span' according to spec is clamped to 1000 and defaults to 1
                        max: 1000,
                    }
                });

                createElement({
                    type: 'button',
                    id: `col-width-${colgroupIndex}-set`,
                    parent: `colgroup-item-${colgroupIndex}`,
                    innerHTML: 'Set',
                    eventObject: {
                        listener: 'click',
                        func: () => {
                            const width = document.getElementById(`col-width-input-${colgroupIndex}`).value;
                            state.colgroupProps[colgroupIndex].width = width;
                            reload(state, true);
                        }
                    }
                });

            }
        }
    }
}

export default colgroup;