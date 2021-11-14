import { reload } from "../createEditorTable";
import createElement from "../utl/createElement";

const header = state => {
    if (state.header) {

        createElement({
            type: 'thead',
            id: 'table-header',
            parent: 'editor-table'
        });

        createElement({
            type: 'tr',
            id: 'table-header-row',
            parent: 'table-header'
        });

        for (let h = 0; h < state.headerContent.length; h++) {

            createElement({
                type: 'th',
                id: `table-header-row-cell-${h}`,
                parent: 'table-header-row',
                innerHTML: state.headerContent[h].innerHTML,
                attrs: [
                    {
                        attr: 'contenteditable',
                        value: 'true'
                    }
                ],
                eventObject: {
                    listener: 'input',
                    func: e => {
                        state.headerContent[h].innerHTML = e.target.textContent;
                        reload(state);
                    },
                }
            });
            
        }
    }
}

export default header;