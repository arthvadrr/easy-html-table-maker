const createTableFooterRow = state => {
    let newRow = [];

    for (let i = 0; i < state.footerContent[0].length; i++) {
        newRow.push({
            innerHTML: 'innerHTML',
            rowspan: 1,
            colspan: 1,
            rowCollision: false,
            colCollision: false,
        });
    }

    return newRow;
};

export default createTableFooterRow;
