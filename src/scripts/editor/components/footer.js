import reload from '../utl/reload';
import createElement from '../utl/createElement';
import getCellStyleWidth from '../utl/getCellStyleWidth';
import createTableFooterRow from '../utl/createTableFooterRow';
import setCollision from '../utl/setCollision';
import filterInnerHTML from '../utl/filterInnerHTML';

const footer = state => {
  if (state.footer) {
    createElement({
      type: 'h3',
      id: 'footer-heading',
      parent: 'editor-table',
      innerHTML: 'footer',
    });

    createElement({
      type: 'tbody', // tfoot causes styling errors
      id: 'table-footer',
      parent: 'editor-table',
    });
    for (let r = 0; r < state.footerContent.length; r++) {
      createElement({
        type: 'tr',
        id: `table-footer-row-${r}`,
        parent: 'table-footer',
      });

      for (let c = 0; c < state.footerContent[r].length; c++) {
        if (state.footerContent[r][c].rowCollision || state.footerContent[r][c].colCollision) {
          continue;
        }

        // Ignore TDs based on rowspan and colspan
        setCollision(state, r, c, true, 1, false, true);

        createElement({
          type: 'td',
          id: `footer-td-${r}${c}`,
          parent: `table-footer-row-${r}`,
          attrs: [
            {
              attr: 'rowspan',
              value: state.footerContent[r][c].rowspan,
            },
            {
              attr: 'colspan',
              value: state.footerContent[r][c].colspan,
            },
            {
              attr: 'style',
              value: getCellStyleWidth(state.footerContent[r][c].colspan, state.cellWidth),
            },
          ],
        });

        createElement({
          type: 'div',
          parent: `footer-td-${r}${c}`,
          id: `td-footer-grid-container-${r}${c}`,
          attrs: [
            {
              attr: 'class',
              value: 'grid-container',
            },
          ],
        });

        const createAlignClassName = () => {
          let className = 'text-align-';
          const textAlign = state.footerContent[r][c].styles['text-align'];
          const isHeader = state.footerContent[r][c].isHeader;

          if (textAlign) {
            className += textAlign;
          } else if (isHeader) {
            className += 'center';
          } else {
            className += 'left';
          }

          return className;
        };

        createElement({
          type: 'textarea',
          id: `fp-${r}${c}`,
          parent: `td-footer-grid-container-${r}${c}`,
          innerHTML: state.footerContent[r][c].innerHTML,
          attrs: [
            {
              attr: 'class',
              value: `td-input pre-wrap ${createAlignClassName}}`,
            },
          ],
          inputProps: {
            value: state.footerContent[r][c].innerHTML,
          },
          eventObject: {
            listener: 'input',
            func: e => {
              state.footerContent[r][c].innerHTML = filterInnerHTML(e.target.value, state.allowTags);
              reload(state);
            },
          },
        });

        if (state.showCellControls) {
          createElement({
            type: 'div',
            id: `td-footer-controls-${r}${c}`,
            parent: `td-footer-grid-container-${r}${c}`,
            attrs: [
              {
                attr: 'class',
                value: 'td-footer-controls',
              },
            ],
          });

          createElement({
            type: 'div',
            id: `tf-styles-controls-container-${r}${c}`,
            parent: `td-footer-controls-${r}${c}`,
            attrs: [
              {
                attr: 'class',
                value: 'td-styles-controls',
              },
            ],
          });

          createElement({
            type: 'div',
            id: `footer-text-align-controls-${r}${c}`,
            parent: `tf-styles-controls-container-${r}${c}`,
            attrs: [
              {
                attr: 'class',
                value: 'td-text-align-controls-container',
              },
            ],
          });

          const textAlignments = [{ dir: 'left' }, { dir: 'center' }, { dir: 'right' }];

          const setClassActiveTextAlign = alignment => {
            let activeClass = '';
            const isHeader = state.footerContent[r][c].isHeader;
            const textAlign = state.footerContent[r][c].styles['text-align'];
            const dir = alignment.dir;

            if (textAlign === undefined) {
              if (dir === 'left' && !isHeader) {
                activeClass = 'active';
              }

              if (dir === 'center' && isHeader) {
                activeClass = 'active';
              }
            }

            if (textAlign === dir) {
              activeClass = 'active';
            }

            return activeClass;
          };

          textAlignments.forEach(alignment => {
            createElement({
              type: 'input',
              id: `footer-text-align-${alignment.dir}-${r}${c}`,
              parent: `footer-text-align-controls-${r}${c}`,
              inputProps: {
                type: 'radio',
                container: 'div',
                labelIcon: `icon-text-align-${alignment.dir}`,
                labelClass: setClassActiveTextAlign(alignment),
                for: `footer-text-align-${alignment.dir}-${r}${c}`,
                name: `tf-text-align-${r}${c}`,
                checked: state.footerContent[r][c].styles['text-align'] === alignment.dir,
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
                  const isHeader = state.footerContent[r][c].isHeader;

                  if (alignment.dir === 'left' && !isHeader) {
                    delete state.footerContent[r][c].styles['text-align'];
                  } else if (alignment.dir === 'center' && isHeader) {
                    delete state.footerContent[r][c].styles['text-align'];
                  } else {
                    state.footerContent[r][c].styles['text-align'] = alignment.dir;
                  }

                  reload(state, true);
                },
              },
            });
          });

          createElement({
            type: 'div',
            id: `footer-vertical-align-controls-${r}${c}`,
            parent: `tf-styles-controls-container-${r}${c}`,
            attrs: [
              {
                attr: 'class',
                value: 'td-vertical-align-controls-container',
              },
            ],
          });

          const verticalAlignments = [{ dir: 'unset' }, { dir: 'baseline' }, { dir: 'top' }, { dir: 'middle' }, { dir: 'bottom' }];

          const setVerticalAlignmentActiveClass = alignment => {
            let activeClass = '';
            const verticalAlign = state.footerContent[r][c].styles['vertical-align'];

            if (verticalAlign === alignment) {
              activeClass = 'active';
            }

            if (verticalAlign === undefined && alignment === 'unset') {
              activeClass = 'active';
            }

            return activeClass;
          };

          verticalAlignments.forEach(alignment => {
            createElement({
              type: 'input',
              id: `footer-vertical-align-${alignment.dir}-${r}${c}`,
              parent: `footer-vertical-align-controls-${r}${c}`,
              inputProps: {
                type: 'radio',
                container: 'div',
                label: `${alignment.dir === 'unset' ? 'u' : ''}`,
                labelClass: setVerticalAlignmentActiveClass(alignment.dir),
                labelIcon: `icon-vertical-align-${alignment.dir}`,
                for: `footer-vertical-align-${alignment.dir}-${r}${c}`,
                name: `footer-vertical-align-${r}${c}`,
                checked: state.footerContent[r][c].styles['vertical-align'] === alignment.dir,
              },
              attrs: [
                {
                  attr: 'class',
                  value: 'td-vertical-align-button',
                },
                {
                  attr: 'aria-label',
                  value: `vertically align text ${alignment.dir}`,
                },
              ],
              eventObject: {
                listener: 'click',
                func: () => {
                  if (alignment.dir === 'unset') {
                    delete state.footerContent[r][c].styles['vertical-align'];
                  } else {
                    state.footerContent[r][c].styles['vertical-align'] = alignment.dir;
                  }

                  reload(state, true);
                },
              },
            });
          });

          createElement({
            type: 'div',
            id: `footer-controls-top-container-${r}${c}`,
            parent: `td-footer-controls-${r}${c}`,
            attrs: [
              {
                attr: 'class',
                value: 'controls-top-container',
              },
            ],
          });

          createElement({
            type: 'span',
            id: `footer-rowcol-button-container-${r}${c}`,
            parent: `footer-controls-top-container-${r}${c}`,
            attrs: [
              {
                attr: 'class',
                value: 'rowcol-button-container',
              },
            ],
          });

          createElement({
            type: 'button',
            id: `increase-footer-rowspan-button-${r}${c}`,
            parent: `footer-rowcol-button-container-${r}${c}`,
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
                for (let row = 0; row < state.footerContent.length - 1; row++) {
                  if (!state.footerContent[row][c].rowCollision) {
                    totalColumnRowspans += state.footerContent[row][c].rowspan;
                  }
                }

                // If there isn't enough room, create another row
                if (totalColumnRowspans >= state.footerContent.length || r === state.footerContent.length - 1) {
                  state.footerContent.push(createTableFooterRow(state));
                }

                state.footerContent[r][c].rowspan++;
                setCollision(state, r, c, true, 1, false, true);
                reload(state, true);
              },
            },
          });

          createElement({
            type: 'button',
            id: `decrease-footer-rowspan-button-${r}${c}`,
            parent: `footer-rowcol-button-container-${r}${c}`,
            innerHTML: 'rs-',
            attrs: [
              {
                attr: 'class',
                value: 'decrease-rowspan-button',
              },
              {
                attr: 'disabled',
                value: state.footerContent[r][c].rowspan > 1 ? 'false' : 'true',
              },
            ],
            eventObject: {
              listener: 'click',
              func: () => {
                setCollision(state, r, c, false, 0, false, true);
                state.footerContent[r][c].rowspan--;
                reload(state, true);
              },
            },
          });

          createElement({
            type: 'button',
            id: `increase-footer-colspan-button-${r}${c}`,
            parent: `footer-rowcol-button-container-${r}${c}`,
            innerHTML: 'cs+',
            eventObject: {
              listener: 'click',
              func: () => {
                // Determining if there is enough room for the colspans
                let totalRowColumnSpans = 0;
                for (let column = 0; column < state.footerContent[r].length - 1; column++) {
                  if (!state.footerContent[r][column].colCollision) {
                    totalRowColumnSpans += state.footerContent[r][column].colspan;
                  }
                }

                // If there isn't enough room, create another column (to thead and tbody)
                if (totalRowColumnSpans >= state.footerContent[r].length || c === state.footerContent[r].length - 1) {
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
                state.footerContent[r][c].colspan++;
                setCollision(state, r, c, true, 1, false, true);
                reload(state, true);
              },
            },
          });

          createElement({
            type: 'button',
            id: `decrease-colspan-button-${r}${c}`,
            parent: `footer-rowcol-button-container-${r}${c}`,
            innerHTML: 'cs-',
            attrs: [
              {
                attr: 'class',
                value: 'decrease-colspan-button',
              },
              {
                attr: 'disabled',
                value: state.footerContent[r][c].colspan > 1 ? 'false' : 'true',
              },
            ],
            eventObject: {
              listener: 'click',
              func: () => {
                setCollision(state, r, c, false, 0, false, true);
                state.footerContent[r][c].colspan--;
                reload(state, true);
              },
            },
          });

          createElement({
            type: 'input',
            id: `footer-isHeader-${r}${c}`,
            parent: `footer-controls-top-container-${r}${c}`,
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
              for: `footer-isHeader-${r}${c}`,
              name: `footer-isHeader-${r}${c}`,
              checked: state.footerContent[r][c].isHeader,
            },
            eventObject: {
              listener: 'change',
              func: e => {
                state.footerContent[r][c].isHeader = !state.footerContent[r][c].isHeader;
                reload(state, true);
              },
            },
          });

          if (state.footerContent[r][c].isHeader) {
            createElement({
              type: 'div',
              id: `footer-isHeaderContainer-${r}${c}`,
              parent: `td-footer-controls-${r}${c}`,
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
              parent: `footer-isHeaderContainer-${r}${c}`,
            });

            createElement({
              type: 'input',
              id: `footer-headerScopeCol-${r}${c}`,
              parent: `footer-isHeaderContainer-${r}${c}`,
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
                for: `footer-headerScopeCol-${r}${c}`,
                name: `footer-scope-${r}${c}`,
                checked: state.footerContent[r][c].headerScope === 'col',
              },
              eventObject: {
                listener: 'change',
                func: () => {
                  state.footerContent[r][c].headerScope = 'col';
                  reload(state, true);
                },
              },
            });

            createElement({
              type: 'input',
              id: `footer-headerScopeRow-${r}${c}`,
              parent: `footer-isHeaderContainer-${r}${c}`,
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
                for: `footer-headerScopeRow-${r}${c}`,
                name: `footer-scope-${r}${c}`,
                checked: state.footerContent[r][c].headerScope === 'row',
              },
              eventObject: {
                listener: 'change',
                func: () => {
                  state.footerContent[r][c].headerScope = 'row';
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
        parent: `table-footer-row-${r}`,
        attrs: [
          {
            attr: 'disabled',
            value: state.footerContent.length > 1 ? 'false' : true,
          },
          {
            attr: 'aria-label',
            value: `delete footer row ${r}`,
          },
          {
            attr: 'class',
            value: 'delete-row-btn',
          },
        ],
        eventObject: {
          listener: 'click',
          func: () => {
            if (state.footerContent.length > 1 && confirm(`Delete row ${r} and all of its contents?`)) {
              state.footerContent.splice(r, 1);

              reload(state, true);
            }
          },
        },
      });
    }
  }
};

export default footer;
