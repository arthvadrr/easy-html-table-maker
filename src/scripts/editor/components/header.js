import reload from '../utl/reload';
import createElement from '../utl/createElement';
import getCellStyleWidth from '../utl/getCellStyleWidth';
import createTableHeaderRow from '../utl/createTableHeaderRow';
import setCollision from '../utl/setCollision';
import filterInnerHTML from '../utl/filterInnerHTML';

const header = state => {
  if (state.header) {
    createElement({
      type: 'thead',
      id: 'table-header',
      parent: 'editor-table',
    });

    createElement({
      type: 'h3',
      id: 'header-heading',
      parent: 'table-header',
      innerHTML: 'header',
    });

    for (let r = 0; r < state.headerContent.length; r++) {
      createElement({
        type: 'tr',
        id: `table-header-row-${r}`,
        parent: 'table-header',
      });

      for (let c = 0; c < state.headerContent[r].length; c++) {
        if (state.headerContent[r][c].rowCollision || state.headerContent[r][c].colCollision) {
          continue;
        }

        // Ignore TDs based on rowspan and colspan
        setCollision(state, r, c, true, 1, true);

        createElement({
          type: 'th',
          id: `th-${r}${c}`,
          parent: `table-header-row-${r}`,
          attrs: [
            {
              attr: 'rowspan',
              value: state.headerContent[r][c].rowspan,
            },
            {
              attr: 'colspan',
              value: state.headerContent[r][c].colspan,
            },
            {
              attr: 'style',
              value: getCellStyleWidth(state.headerContent[r][c].colspan, state.cellWidth),
            },
          ],
        });

        createElement({
          type: 'div',
          parent: `th-${r}${c}`,
          id: `th-grid-container-${r}${c}`,
          attrs: [
            {
              attr: 'class',
              value: 'grid-container',
            },
          ],
        });

        const createAlignClassName = () => {
          let className = 'text-align-';
          const textAlign = state.headerContent[r][c].styles['text-align'];

          if (textAlign) {
            className += textAlign;
          } else {
            className += 'center';
          }

          return className;
        };

        createElement({
          type: 'textarea',
          id: `p-${r}${c}`,
          parent: `th-grid-container-${r}${c}`,
          innerHTML: state.headerContent[r][c].innerHTML,
          attrs: [
            {
              attr: 'class',
              value: `td-input pre-wrap ${createAlignClassName()}`,
            },
          ],
          inputProps: {
            value: state.headerContent[r][c].innerHTML,
          },
          eventObject: {
            listener: 'input',
            func: e => {
              state.headerContent[r][c].innerHTML = filterInnerHTML(e.target.value, state.allowTags);
              reload(state);
            },
          },
        });

        if (state.showCellControls) {
          createElement({
            type: 'div',
            id: `th-controls-${r}${c}`,
            parent: `th-grid-container-${r}${c}`,
            attrs: [
              {
                attr: 'class',
                value: 'th-controls',
              },
            ],
          });

          createElement({
            type: 'div',
            id: `th-styles-controls-container-${r}${c}`,
            parent: `th-controls-${r}${c}`,
            attrs: [
              {
                attr: 'class',
                value: 'td-styles-controls',
              },
            ],
          });

          createElement({
            type: 'div',
            id: `header-text-align-controls-${r}${c}`,
            parent: `th-styles-controls-container-${r}${c}`,
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

          const setClassActiveTextAlign = alignment => {
            let activeClass = '';
            const textAlign = state.headerContent[r][c].styles['text-align'];
            const dir = alignment.dir;

            if (textAlign === undefined) {
              if (dir === 'center') {
                activeClass = 'active';
              }
            } else if (textAlign === dir) {
              activeClass = 'active';
            }

            return activeClass;
          };

          textAlignments.forEach(alignment => {
            createElement({
              type: 'input',
              id: `header-text-align-${alignment.dir}-${r}${c}`,
              parent: `header-text-align-controls-${r}${c}`,
              inputProps: {
                type: 'radio',
                container: 'div',
                labelIcon: `icon-text-align-${alignment.dir}`,
                labelClass: setClassActiveTextAlign(alignment),
                for: `header-text-align-${alignment.dir}-${r}${c}`,
                name: `th-text-align-${r}${c}`,
                checked: state.headerContent[r][c].styles['text-align'] === alignment.dir,
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
                listener: 'click',
                func: () => {
                  if (alignment.dir === 'center') {
                    delete state.headerContent[r][c].styles['text-align'];
                  } else {
                    state.headerContent[r][c].styles['text-align'] = alignment.dir;
                  }

                  reload(state, true);
                },
              },
            });
          });

          createElement({
            type: 'span',
            id: `header-rowcol-button-container-${r}${c}`,
            parent: `th-controls-${r}${c}`,
            attrs: [
              {
                attr: 'class',
                value: 'rowcol-button-container',
              },
            ],
          });

          createElement({
            type: 'button',
            id: `increase-header-rowspan-button-${r}${c}`,
            parent: `header-rowcol-button-container-${r}${c}`,
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
                for (let row = 0; row < state.headerContent.length - 1; row++) {
                  if (!state.headerContent[row][c].rowCollision) {
                    totalColumnRowspans += state.headerContent[row][c].rowspan;
                  }
                }

                // If there isn't enough room, create another row
                if (totalColumnRowspans >= state.headerContent.length || r === state.headerContent.length - 1) {
                  state.headerContent.push(createTableHeaderRow(state));
                }

                state.headerContent[r][c].rowspan++;
                setCollision(state, r, c, true, 1, true);
                reload(state, true);
              },
            },
          });

          createElement({
            type: 'button',
            id: `decrease-header-rowspan-button-${r}${c}`,
            parent: `header-rowcol-button-container-${r}${c}`,
            innerHTML: 'rs-',
            attrs: [
              {
                attr: 'class',
                value: 'decrease-rowspan-button',
              },
              {
                attr: 'disabled',
                value: state.headerContent[r][c].rowspan > 1 ? 'false' : 'true',
              },
            ],
            eventObject: {
              listener: 'click',
              func: () => {
                setCollision(state, r, c, false, 0, true);
                state.headerContent[r][c].rowspan--;
                reload(state, true);
              },
            },
          });

          createElement({
            type: 'button',
            id: `increase-header-colspan-button-${r}${c}`,
            parent: `header-rowcol-button-container-${r}${c}`,
            innerHTML: 'cs+',
            eventObject: {
              listener: 'click',
              func: () => {
                // Determining if there is enough room for the colspans
                let totalRowColumnSpans = 0;
                for (let column = 0; column < state.headerContent[r].length - 1; column++) {
                  if (!state.headerContent[r][column].colCollision) {
                    totalRowColumnSpans += state.headerContent[r][column].colspan;
                  }
                }

                // If there isn't enough room, create another column (to thead and tbody)
                if (totalRowColumnSpans >= state.headerContent[r].length || c === state.headerContent[r].length - 1) {
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
                }
                state.headerContent[r][c].colspan++;
                setCollision(state, r, c, true, 1, true);
                reload(state, true);
              },
            },
          });

          createElement({
            type: 'button',
            id: `decrease-colspan-button-${r}${c}`,
            parent: `header-rowcol-button-container-${r}${c}`,
            innerHTML: 'cs-',
            attrs: [
              {
                attr: 'class',
                value: 'decrease-colspan-button',
              },
              {
                attr: 'disabled',
                value: state.headerContent[r][c].colspan > 1 ? 'false' : 'true',
              },
            ],
            eventObject: {
              listener: 'click',
              func: () => {
                setCollision(state, r, c, false, 0, true);
                state.headerContent[r][c].colspan--;
                reload(state, true);
              },
            },
          });
        }
      }

      createElement({
        type: 'button',
        innerHTML: '&#10006; delete row',
        parent: `table-header-row-${r}`,
        attrs: [
          {
            attr: 'disabled',
            value: state.headerContent.length > 1 ? 'false' : true,
          },
          {
            attr: 'aria-label',
            value: `delete header row ${r}`,
          },
          {
            attr: 'class',
            value: 'delete-row-btn',
          },
        ],
        eventObject: {
          listener: 'click',
          func: () => {
            if (state.headerContent.length > 1 && confirm(`Delete row ${r} and all of its contents?`)) {
              state.headerContent.splice(r, 1);

              reload(state, true);
            }
          },
        },
      });
    }
  }
};

export default header;
