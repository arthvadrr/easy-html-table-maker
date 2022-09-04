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

  state.content.forEach(element =>
    element.push({
      innerHTML: '',
      rowspan: 1,
      colspan: 1,
      rowCollision: false,
      colCollision: false,
      isHeader: false,
      headerScope: 'col',
      styles: {},
    })
  );

  state.headerContent.forEach(element =>
    element.push({
      innerHTML: '',
      rowspan: 1,
      colspan: 1,
      rowCollision: false,
      colCollision: false,
      styles: {},
    })
  );

  state.footerContent.forEach(element =>
    element.push({
      innerHTML: '',
      rowspan: 1,
      colspan: 1,
      rowCollision: false,
      colCollision: false,
      isHeader: false,
      headerScope: 'col',
      styles: {},
    })
  );
};

export default createTableCol;
