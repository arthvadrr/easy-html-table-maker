const createTableRow = state => {
    let newRow = [];

    for (let i = 0; i < state.content[0].length; i++) {
        newRow.push({
            innerHTML: 'innerHTML',
            rowspan: 1,
            colspan: 1,
            rowCollision: false,
            colCollision: false,
            isHeader: false,
            headerScope: 'col',
        });
    }

    return newRow;
};

export default createTableRow;
