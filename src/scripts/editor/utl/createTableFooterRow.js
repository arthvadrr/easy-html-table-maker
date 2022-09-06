const createTableFooterRow = state => {
  let newRow = [];

  for (let i = 0; i < state.footerContent[0].length; i++) {
    newRow.push({
      innerHTML: '',
      rowspan: 1,
      colspan: 1,
      rowCollision: false,
      colCollision: false,
      styles: {},
    });
  }

  return newRow;
};

export default createTableFooterRow;
