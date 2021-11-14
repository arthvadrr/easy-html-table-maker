import { reload } from "../createEditorTable";
import createElement from "../utl/createElement";

const caption = state => {
    if (state.caption) {
        createElement({
            type: 'caption',
            id: 'table-caption',
            parent: 'editor-table',
            innerHTML: state.captionText,
            attrs: [
                {
                    attr: 'contenteditable',
                    value: 'true',
                },
            ],
            eventObject: {
                listener: 'input',
                func: e => {
                    state.captionText = e.target.textContent;
                    reload(state);
                },
            },
        });
    }   
}

export default caption;