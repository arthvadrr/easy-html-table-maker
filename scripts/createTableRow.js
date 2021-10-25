const createTableRow = state => {
    let newRow = [];

    for (let i = 0; i < state.content[0].length; i++) {
        newRow.push({ innerHTML: ' hi ', rowspan: 0, ignore: false });
    }

    return newRow;
};

export default createTableRow;
