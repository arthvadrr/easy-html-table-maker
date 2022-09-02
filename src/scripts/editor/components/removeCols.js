import reload from '../utl/reload';
import createElement from '../utl/createElement';

const removeCols = state => {
  createElement({
    type: 'tr',
    parent: 'editor-table',
    id: 'remove-col-row',
  });

  for (let c = 0; c < state.content[state.content.length - 1].length; c++) {
    createElement({
      type: 'td',
      id: `td-dc-${c}`,
      parent: 'remove-col-row',
    });

    createElement({
      type: 'button',
      id: `delete-col-${c}`,
      innerHTML: '&#10006; delete column',
      parent: `td-dc-${c}`,
      attrs: [
        {
          attr: 'disabled',
          value: state.content[0].length > 1 ? 'false' : 'true',
        },
        {
          attr: 'class',
          value: 'delete-col-btn',
        },
      ],
      eventObject: {
        listener: 'click',
        func: () => {
          if (state.content[0].length > 1 && confirm(`Delete column ${c} and all of its contents?`)) {
            for (let xhr = 0; xhr < state.headerContent.length; xhr++) {
              state.headerContent[xhr].splice(c, 1);
            }

            for (let xr = 0; xr < state.content.length; xr++) {
              state.content[xr].splice(c, 1);
            }

            for (let xfr = 0; xfr < state.footerContent.length; xfr++) {
              state.footerContent[xfr].splice(c, 1);
            }

            state.columnSettings.splice(c, 1);

            state.colgroupProps.splice(c, 1);

            reload(state, true);
          }
        },
      },
    });
  }
};

export default removeCols;
