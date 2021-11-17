import createElement from '../utl/createElement';
import { reload } from '../createEditorTable';
import createTableRow from '../utl/createTableRow';
import createTableCol from '../utl/createTableCol';

const controls = state => {
    createElement({
        type: 'div',
        id: `editor-table-controls`,
        parent: 'editor-table-container',
    });

    createElement({
        type: 'button',
        id: 'add-row',
        parent: 'editor-table-controls',
        innerHTML: 'add row',
        eventObject: {
            listener: 'click',
            func: () => {
                state.content.push(createTableRow(state));
                reload(state, true);
            },
        },
    });

    createElement({
        type: 'button',
        id: 'remove-row',
        parent: 'editor-table-controls',
        innerHTML: 'remove row',
        eventObject: {
            listener: 'click',
            func: () => {
                for (let td = 0; td < state.content.at(-1).length; td++) {
                    if (state.content.at(-1)[td].rowCollision === true) {
                        alert('Rowspan detected, cannot delete row. Remove rowspan first.');
                        return;
                    }
                }

                if (state.content.length > 1) {
                    state.content.pop();
                }
                reload(state, true);
            },
        },
    });

    createElement({
        type: 'button',
        id: 'add-column',
        parent: 'editor-table-controls',
        innerHTML: 'add column',
        attrs: [
            {
                attr: 'class',
                value: 'add-column',
            },
        ],
        eventObject: {
            listener: 'click',
            func: () => {
                createTableCol(state);
                reload(state, true);
            },
        },
    });

    createElement({
        type: 'button',
        id: 'remove-column',
        parent: 'editor-table-controls',
        innerHTML: 'remove column',
        eventObject: {
            listener: 'click',
            func: () => {
                for (let row = 0; row < state.content.length; row++) {
                    if (state.content[row].at(-1).colCollision === true) {
                        alert('Colspan detected, cannot delete column. Remove colspan first.');
                        return;
                    }
                }

                if (state.columnSettings.length > 1) {
                    state.columnSettings.pop();
                }

                if (state.colgroupProps.length > 1) {
                    state.colgroupProps.pop();
                }

                if (state.headerContent.length > 1) {
                    state.headerContent.pop();
                }

                state.content.forEach(element => {
                    if (element.length > 1) {
                        element.pop();
                    }
                });
                reload(state, true);
            },
        },
    });

    createElement({
        type: 'input',
        id: 'caption-toggle',
        parent: 'editor-table-controls',
        attrs: [
            {
                attr: 'type',
                value: 'checkbox',
            },
            {
                attr: 'name',
                value: 'captionToggle',
            },
            {
                attr: 'value',
                value: 'Toggle caption',
            },
        ],
        inputProps: {
            type: 'checkbox',
            label: 'Caption',
            name: 'caption-toggle',
            for: 'caption-toggle',
            value: 'Toggle Caption',
            checked: state.caption,
        },
        eventObject: {
            listener: 'click',
            func: () => {
                state.caption = !state.caption;
                reload(state, true);
            },
        },
    });

    createElement({
        type: 'input',
        id: 'colgroup-toggle',
        parent: 'editor-table-controls',
        inputProps: {
            type: 'checkbox',
            label: 'Colgroup',
            name: 'colgroup-toggle',
            for: 'colgroup-toggle',
            checked: state.colgroup,
        },
        eventObject: {
            listener: 'click',
            func: () => {
                state.colgroup = !state.colgroup;
                reload(state, true);
            },
        },
    });

    createElement({
        type: 'input',
        id: 'header-toggle',
        parent: 'editor-table-controls',
        inputProps: {
            type: 'checkbox',
            label: 'Header',
            name: 'header-toggle',
            for: 'header-toggle',
            checked: state.header,
        },
        eventObject: {
            listener: 'click',
            func: () => {
                state.header = !state.header;
                reload(state, true);
            },
        },
    });

    createElement({
        type: 'input',
        id: 'table-use-classname',
        parent: 'editor-table-controls',
        inputProps: {
            type: 'checkbox',
            label: 'Use table classname',
            for: 'table-use-classname',
            checked: state.useClassName,
        },
        eventObject: {
            listener: 'click',
            func: () => {
                state.useClassName = !state.useClassName;
                reload(state, true);
            },
        },
    });

    if (state.useClassName) {
        createElement({
            type: 'input',
            id: 'table-class-selector',
            parent: 'editor-table-controls',
            inputProps: {
                type: 'text',
                label: 'Table classname',
                for: 'table-class-selector',
                value: state.className,
            },
            eventObject: {
                listener: 'input',
                func: e => {
                    state.className = e.target.value;
                    reload(state);
                },
            },
        });
    }
};

export default controls;
