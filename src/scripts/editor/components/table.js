import createElement from "../utl/createElement";

const table = () => {
    // Create the container
    createElement({
        type: 'div',
        id: 'editor-table-container',
        parent: 'editor-area',
    });

    // Create the table
    createElement({
        type: 'table',
        id: 'editor-table',
        parent: 'editor-table-container',
        attrs: [
            {
                attr: 'class',
                value: 'editor-table',
            },
        ],
    });
}

export default table;