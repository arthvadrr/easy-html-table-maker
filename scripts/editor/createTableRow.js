const createTableRow = state => {
    let newRow = [];

    for (let i = 0; i < state.content[0].length; i++) {
        newRow.push({
            innerHTML: ' hi ',
            rowspan: 1,
            colspan: 1,
            rowCollision: false,
            colCollision: false,
        });
    }

    return newRow;
};

export default createTableRow;
