const createTableCol = state => {
    state.columnSettings.push({
        useWidth: false,
        width: 0,
        widthUnits: 'px',
        align: 'left',
    });

    state.colgroupProps.push({
        span: 1,
    });

    state.headerContent.push({
        innerHTML: 'innerHTML',
        rowspan: 1,
        colspan: 1,
        rowCollision: false,
        colCollision: false,
    });

    state.content.forEach(element =>
        element.push({
            innerHTML: 'innerHTML',
            rowspan: 1,
            colspan: 1,
            rowCollision: false,
            colCollision: false,
        })
    );
};

export default createTableCol;
