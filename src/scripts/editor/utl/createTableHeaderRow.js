const createTableHeaderRow = state => {
    let newRow = [];

    for (let i = 0; i < state.headerContent[0].length; i++) {
        newRow.push({
            innerHTML: '',
            rowspan: 1,
            colspan: 1,
            rowCollision: false,
            colCollision: false,
        });
    }

    return newRow;
};

export default createTableHeaderRow;
