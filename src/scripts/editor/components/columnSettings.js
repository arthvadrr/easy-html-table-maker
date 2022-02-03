import { reload } from '../createEditorTable';
import createElement from '../utl/createElement';

const columnSettings = state => {
    createElement({
        type: 'tr',
        id: 'col-settings-container',
        parent: 'editor-table',
        attrs: [
            {
                attr: 'style',
                value: 'display: table-header-group',
            },
        ],
    });

    for (let setting = 0; setting < state.columnSettings.length; setting++) {
        createElement({
            type: 'td',
            id: `setting-${setting}`,
            parent: 'col-settings-container',
            attrs: [
                {
                    attr: 'width',
                    value: state.columnSettings[setting].useWidth ? state.columnSettings[setting].width + state.columnSettings[setting].widthUnits : false,
                },
                {
                    attr: 'span',
                    value: state.columnSettings[setting].span ? state.columnSettings[setting].span + '' : 1,
                },
                {
                    attr: 'style',
                    value: 'display: table-cell',
                },
            ],
        });

        createElement({
            type: 'div',
            id: `col-align-radio-group-${setting}`,
            parent: `setting-${setting}`,
            innerHTML: 'Text align',
        });

        const alignOptions = ['none', 'left', 'center', 'right', 'justify'];

        alignOptions.map((option, i) => {
            createElement({
                type: 'input',
                id: `col-align-option-${setting}${i}`,
                parent: `col-align-radio-group-${setting}`,
                inputProps: {
                    type: 'radio',
                    label: option,
                    value: option,
                    name: `align-options-${setting}`,
                    for: `col-align-option-${setting}${i}`,
                    checked: state.columnSettings[setting].align === option ? true : false,
                },
                eventObject: {
                    listener: 'click',
                    func: e => {
                        state.columnSettings[setting].align = e.target.value;
                        reload(state, true);
                    },
                },
            });
        });

        createElement({
            type: 'input',
            id: `use-col-fixed-width-${setting}`,
            parent: `setting-${setting}`,
            inputProps: {
                type: 'checkbox',
                label: 'Fixed width',
                for: `use-col-fixed-width-${setting}`,
                checked: state.columnSettings[setting].useWidth,
            },
            eventObject: {
                listener: 'click',
                func: () => {
                    (state.columnSettings[setting].useWidth = !state.columnSettings[setting].useWidth), reload(state, true);
                },
            },
        });

        if (state.columnSettings[setting].useWidth) {
            createElement({
                type: 'input',
                id: `col-width-input-${setting}`,
                parent: `setting-${setting}`,
                inputProps: {
                    type: 'number',
                    container: 'div',
                    for: `columnWidth-${setting}`,
                    label: 'Col width',
                    value: state.columnSettings[setting].width,
                    min: 0, // <colgroup> 'span' according to spec is clamped to 1000 and defaults to 1
                    max: 1000,
                },
            });

            createElement({
                type: 'button',
                id: `col-width-${setting}-set`,
                parent: `setting-${setting}`,
                innerHTML: 'Set',
                eventObject: {
                    listener: 'click',
                    func: () => {
                        const width = document.getElementById(`col-width-input-${setting}`).value;
                        state.columnSettings[setting].width = width;
                        reload(state, true);
                    },
                },
            });
        }
    }
};

export default columnSettings;
