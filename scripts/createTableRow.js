const createTableRow = (state, index) => {
    let { columns } = state.tables[index];
    let newRow = [];

    for (let i = 0; i < columns; i++) {
        newRow.push({ innerHTML: ' hi ' });
    }

    return newRow;
};

export default createTableRow;
