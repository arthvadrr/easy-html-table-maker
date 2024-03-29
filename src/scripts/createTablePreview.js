import createElement from './editor/utl/createElement';

const createTablePreview = state => {
  let previewTable = document.getElementById('preview-table');

  if (previewTable) {
    previewTable.parentNode.removeChild(previewTable);
  }

  createElement({
    type: 'table',
    id: 'preview-table',
    parent: 'preview',
  });

  if (state.caption) {
    createElement({
      type: 'caption',
      id: 'preview-table-caption',
      parent: 'preview-table',
      innerHTML: state.captionText,
    });
  }

  if (state.colgroup) {
    createElement({
      type: 'colgroup',
      id: 'preview-colgroup',
      parent: 'preview-table',
    });

    for (let col = 0; col < state.columnSettings.length; col++) {
      let colAttrs = [];

      if (state.columnSettings[col].width) {
        colAttrs.push({
          attr: 'style',
          value: `width:${state.columnSettings[col].width}${state.columnSettings[col].widthUnits}`,
        });
      }

      if (state.colgroupProps[col].useSpan && state.colgroupProps[col].span > 1) {
        colAttrs.push({
          attr: 'span',
          value: state.colgroupProps[col].span,
        });
      }

      createElement({
        type: 'col',
        id: `preview-col-${col}`,
        parent: 'preview-colgroup',
        attrs: colAttrs,
      });
    }
  }

  if (state.header) {
    createElement({
      type: 'thead',
      id: 'preview-thead',
      parent: 'preview-table',
    });

    for (let r = 0; r < state.headerContent.length; r++) {
      createElement({
        type: 'tr',
        id: `preview-table-header-row-${r}`,
        parent: `preview-thead`,
      });

      for (let c = 0; c < state.headerContent[r].length; c++) {
        if (state.headerContent[r][c].rowCollision || state.headerContent[r][c].colCollision) {
          continue;
        }

        let headerContent = state.headerContent[r][c].innerHTML;

        if (state.useLineBreaks) {
          headerContent = headerContent.replace(/(\r\n|\n|\r)/gm, '<br>');
        }

        let cellType = 'th';
        let stylesStr = () => {
          let str = '';

          for (const [key, value] of Object.entries(state.headerContent[r][c].styles)) {
            str += `${key}:${value};`;
          }

          return str;
        };

        createElement({
          type: cellType,
          id: `preview-th-${r}${c}`,
          parent: `preview-table-header-row-${r}`,
          innerHTML: headerContent,
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
              value: stylesStr(),
            },
          ],
        });
      }
    }
  }

  createElement({
    type: 'tbody',
    id: 'preview-tbody',
    parent: 'preview-table',
  });

  for (let r = 0; r < state.content.length; r++) {
    createElement({
      type: 'tr',
      id: `preview-table-row-${r}`,
      parent: `preview-tbody`,
    });

    for (let c = 0; c < state.content[r].length; c++) {
      if (state.content[r][c].rowCollision || state.content[r][c].colCollision) {
        continue;
      }

      let bodyContent = state.content[r][c].innerHTML;

      if (state.useLineBreaks) {
        bodyContent = bodyContent.replace(/(\r\n|\n|\r)/gm, '<br>');
      }

      let cellType = state.content[r][c].isHeader ? 'th' : 'td';

      let stylesStr = () => {
        let str = '';

        for (const [key, value] of Object.entries(state.content[r][c].styles)) {
          str += `${key}:${value};`;
        }

        return str;
      };

      createElement({
        type: cellType,
        id: `preview-td-${r}${c}`,
        parent: `preview-table-row-${r}`,
        innerHTML: bodyContent,
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
            attr: 'scope',
            value: state.content[r][c].headerScope,
          },
          {
            attr: 'style',
            value: stylesStr(),
          },
        ],
      });
    }
  }

  if (state.footer) {
    createElement({
      type: 'tfoot',
      id: 'preview-tfoot',
      parent: 'preview-table',
    });

    for (let r = 0; r < state.footerContent.length; r++) {
      createElement({
        type: 'tr',
        id: `preview-table-footer-row-${r}`,
        parent: `preview-tfoot`,
      });
      for (let c = 0; c < state.footerContent[r].length; c++) {
        if (state.footerContent[r][c].rowCollision || state.footerContent[r][c].colCollision) {
          continue;
        }

        let footerContent = state.footerContent[r][c].innerHTML;

        if (state.useLineBreaks) {
          footerContent = footerContent.replace(/(\r\n|\n|\r)/gm, '<br>');
        }

        let cellType = state.footerContent[r][c].isHeader ? 'th' : 'td';

        let stylesStr = () => {
          let str = '';

          for (const [key, value] of Object.entries(state.footerContent[r][c].styles)) {
            str += `${key}:${value};`;
          }

          return str;
        };

        createElement({
          type: cellType,
          id: `preview-footer-td-${r}${c}`,
          parent: `preview-table-footer-row-${r}`,
          innerHTML: footerContent,
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
              attr: 'scope',
              value: state.footerContent[r][c].headerScope,
            },
            {
              attr: 'style',
              value: stylesStr(),
            },
          ],
        });
      }
    }
  }
};

export default createTablePreview;
