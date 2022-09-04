import reload from '../utl/reload';
import setCollision from '../utl/setCollision';
import createElement from '../utl/createElement';
import createTableRow from '../utl/createTableRow';
import filterInnerHTML from '../utl/filterInnerHTML';
import getCellStyleWidth from '../utl/getCellStyleWidth';

const body = state => {
  createElement({
    type: 'tbody',
    id: 'table-body',
    parent: 'editor-table',
  });

  createElement({
    type: 'h3',
    id: 'body-heading',
    parent: 'table-body',
    innerHTML: 'body',
  });

  createElement({
    type: 'tr',
    id: `table-col-control-row`,
    parent: 'table-body',
  });

  for (let r = 0; r < state.content.length; r++) {
    createElement({
      type: 'tr',
      id: `table-row-${r}`,
      parent: 'table-body',
    });

    for (let c = 0; c < state.content[r].length; c++) {
      if (state.content[r][c].rowCollision || state.content[r][c].colCollision) {
        continue;
      }

      if (r === 0) {
        createElement({
          type: 'td',
          id: `td-colcon-${c}`,
          parent: `table-col-control-row`,
        });
      }

      // Ignore TDs based on rowspan and colspan
      setCollision(state, r, c, true, 1);

      createElement({
        type: 'td',
        id: `td-${r}${c}`,
        parent: `table-row-${r}`,
        attrs: [
          {
            attr: 'rowspan',
            value: state.content[r][c].rowspan,
          },
          {
            attr: 'colspan',
            value: state.content[r][c].colspan,
          },
          {
            attr: 'style',
            value: getCellStyleWidth(state.content[r][c].colspan, state.cellWidth),
          },
        ],
      });

      createElement({
        type: 'div',
        parent: `td-${r}${c}`,
        id: `td-grid-container-${r}${c}`,
        attrs: [
          {
            attr: 'class',
            value: 'grid-container',
          },
        ],
      });

      let stylesStr = () => {
        let str = '';

        for (const [key, value] of Object.entries(state.content[r][c].styles)) {
          str += `${key}:${value};`;
        }

        return str;
      };

      createElement({
        type: 'textarea',
        id: `p-${r}${c}`,
        parent: `td-grid-container-${r}${c}`,
        innerHTML: state.content[r][c].innerHTML,
        attrs: [
          {
            attr: 'class',
            value: `td-input pre-wrap text-align-${state.content[r][c].styles['text-align']}`,
          },
        ],
        inputProps: {
          value: state.content[r][c].innerHTML,
        },
        eventObject: {
          listener: 'input',
          func: e => {
            state.content[r][c].innerHTML = filterInnerHTML(e.target.value, state.allowTags);
            reload(state);
          },
        },
      });

      if (state.showCellControls) {
        createElement({
          type: 'div',
          id: `td-body-controls-${r}${c}`,
          parent: `td-grid-container-${r}${c}`,
          attrs: [
            {
              attr: 'class',
              value: 'td-body-controls',
            },
          ],
        });

        createElement({
          type: 'div',
          id: `td-styles-controls-container-${r}${c}`,
          parent: `td-body-controls-${r}${c}`,
          attrs: [
            {
              attr: 'class',
              value: 'td-styles-controls',
            },
          ],
        });

        createElement({
          type: 'div',
          id: `text-align-controls-${r}${c}`,
          parent: `td-styles-controls-container-${r}${c}`,
          attrs: [
            {
              attr: 'class',
              value: 'td-text-align-controls-container',
            },
          ],
        });

        const textAlignments = [
          { dir: 'left', entity: '↦' },
          { dir: 'center', entity: '↔' },
          { dir: 'right', entity: '↤' },
        ];

        textAlignments.forEach(alignment => {
          createElement({
            type: 'input',
            id: `text-align-${alignment.dir}-${r}${c}`,
            parent: `text-align-controls-${r}${c}`,
            inputProps: {
              type: 'radio',
              container: 'div',
              label: alignment.entity,
              for: `text-align-${alignment.dir}-${r}${c}`,
              name: `td-text-align-${r}${c}`,
              checked: state.content[r][c].styles['text-align'] === alignment.dir,
            },
            attrs: [
              {
                attr: 'class',
                value: 'td-align-button',
              },
              {
                attr: 'aria-label',
                value: `align text ${alignment.dir}`,
              },
            ],
            eventObject: {
              listener: 'input',
              func: () => {
                if (alignment.dir === 'left') {
                  if (state.content[r][c].styles['text-align']) {
                    delete state.content[r][c].styles['text-align'];
                  }
                } else {
                  state.content[r][c].styles['text-align'] = alignment.dir;
                }

                reload(state, true);
              },
            },
          });
        });

        createElement({
          type: 'div',
          id: `body-controls-top-container-${r}${c}`,
          parent: `td-body-controls-${r}${c}`,
          attrs: [
            {
              attr: 'class',
              value: 'controls-top-container',
            },
          ],
        });

        createElement({
          type: 'span',
          id: `body-rowcol-button-container-${r}${c}`,
          parent: `body-controls-top-container-${r}${c}`,
          attrs: [
            {
              attr: 'class',
              value: 'rowcol-button-container',
            },
          ],
        });

        createElement({
          type: 'button',
          id: `increase-rowspan-button-${r}${c}`,
          parent: `body-rowcol-button-container-${r}${c}`,
          innerHTML: 'rs+',
          attrs: [
            {
              attr: 'class',
              value: 'increase-rowspan-button',
            },
          ],
          eventObject: {
            listener: 'click',
            func: () => {
              // Determining if there is enough room for the rowspans
              let totalColumnRowspans = 0;
              for (let row = 0; row < state.content.length - 1; row++) {
                if (!state.content[row][c].rowCollision) {
                  totalColumnRowspans += state.content[row][c].rowspan;
                }
              }

              // If there isn't enough room, create another row
              if (totalColumnRowspans >= state.content.length || r === state.content.length - 1) {
                state.content.push(createTableRow(state));
              }

              state.content[r][c].rowspan++;
              setCollision(state, r, c, true, 1);
              reload(state, true);
            },
          },
        });

        createElement({
          type: 'button',
          id: `decrease-rowspan-button-${r}${c}`,
          parent: `body-rowcol-button-container-${r}${c}`,
          innerHTML: 'rs-',
          attrs: [
            {
              attr: 'class',
              value: 'decrease-rowspan-button',
            },
            {
              attr: 'disabled',
              value: state.content[r][c].rowspan > 1 ? 'false' : 'true',
            },
          ],
          eventObject: {
            listener: 'click',
            func: () => {
              setCollision(state, r, c, false, 0);
              state.content[r][c].rowspan--;
              reload(state, true);
            },
          },
        });

        createElement({
          type: 'button',
          id: `increase-colspan-button-${r}${c}`,
          parent: `body-rowcol-button-container-${r}${c}`,
          innerHTML: 'cs+',
          eventObject: {
            listener: 'click',
            func: () => {
              // Determining if there is enough room for the colspans
              let totalRowColumnSpans = 0;
              for (let column = 0; column < state.content[r].length - 1; column++) {
                if (!state.content[r][column].colCollision) {
                  totalRowColumnSpans += state.content[r][column].colspan;
                }
              }

              // If there isn't enough room, create another column (to thead and tbody)
              if (totalRowColumnSpans >= state.content[r].length || c === state.content[r].length - 1) {
                state.colgroupProps.push({
                  useWidth: false,
                  width: 0,
                  widthUnits: 'px',
                  span: 1,
                });

                state.columnSettings.push({
                  useWidth: false,
                  width: 0,
                  widthUnits: 'px',
                  align: 'none',
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
              }
              state.content[r][c].colspan++;
              setCollision(state, r, c, true, 1);
              reload(state, true);
            },
          },
        });

        createElement({
          type: 'button',
          id: `decrease-colspan-button-${r}${c}`,
          parent: `body-rowcol-button-container-${r}${c}`,
          innerHTML: 'cs-',
          attrs: [
            {
              attr: 'class',
              value: 'decrease-colspan-button',
            },
            {
              attr: 'disabled',
              value: state.content[r][c].colspan > 1 ? 'false' : 'true',
            },
          ],
          eventObject: {
            listener: 'click',
            func: () => {
              setCollision(state, r, c, false, 0);
              state.content[r][c].colspan--;
              reload(state, true);
            },
          },
        });

        createElement({
          type: 'input',
          id: `isHeader-${r}${c}`,
          parent: `body-controls-top-container-${r}${c}`,
          attrs: [
            {
              attr: 'class',
              value: 'isheader',
            },
          ],
          inputProps: {
            type: 'checkbox',
            container: 'span',
            containerClass: 'isheader-container',
            label: 'Is header?',
            for: `isHeader-${r}${c}`,
            name: `isHeader-${r}${c}`,
            checked: state.content[r][c].isHeader,
          },
          eventObject: {
            listener: 'change',
            func: e => {
              state.content[r][c].isHeader = !state.content[r][c].isHeader;
              reload(state, true);
            },
          },
        });

        if (state.content[r][c].isHeader) {
          createElement({
            type: 'div',
            id: `isHeaderContainer-${r}${c}`,
            parent: `td-body-controls-${r}${c}`,
            attrs: [
              {
                attr: 'class',
                value: 'isheader-scope-container',
              },
            ],
          });

          createElement({
            type: 'span',
            innerHTML: 'Header scope:',
            parent: `isHeaderContainer-${r}${c}`,
          });

          createElement({
            type: 'input',
            id: `headerScopeCol-${r}${c}`,
            parent: `isHeaderContainer-${r}${c}`,
            attrs: [
              {
                attr: 'class',
                value: 'headerScope',
              },
            ],
            inputProps: {
              type: 'radio',
              container: 'div',
              label: 'Col',
              for: `headerScopeCol-${r}${c}`,
              name: `scope-${r}${c}`,
              checked: state.content[r][c].headerScope === 'col',
            },
            eventObject: {
              listener: 'change',
              func: () => {
                state.content[r][c].headerScope = 'col';
                reload(state, true);
              },
            },
          });

          createElement({
            type: 'input',
            id: `headerScopeRow-${r}${c}`,
            parent: `isHeaderContainer-${r}${c}`,
            attrs: [
              {
                attr: 'class',
                value: 'headerScope',
              },
            ],
            inputProps: {
              type: 'radio',
              container: 'div',
              label: 'Row',
              for: `headerScopeRow-${r}${c}`,
              name: `scope-${r}${c}`,
              checked: state.content[r][c].headerScope === 'row',
            },
            eventObject: {
              listener: 'change',
              func: () => {
                state.content[r][c].headerScope = 'row';
                reload(state, true);
              },
            },
          });
        }
      }
    }

    createElement({
      type: 'button',
      innerHTML: '&#10006; delete row',
      parent: `table-row-${r}`,
      attrs: [
        {
          attr: 'disabled',
          value: state.content.length > 1 ? 'false' : true,
        },
        {
          attr: 'aria-label',
          value: `delete body row ${r}`,
        },
        {
          attr: 'class',
          value: 'delete-row-btn',
        },
      ],
      eventObject: {
        listener: 'click',
        func: () => {
          if (state.content.length > 1 && confirm(`Delete row ${r} and all of its contents?`)) {
            state.content.splice(r, 1);

            reload(state, true);
          }
        },
      },
    });
  }
};

export default body;
