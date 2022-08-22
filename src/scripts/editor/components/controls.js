import reload from '../utl/reload';
import createElement from '../utl/createElement';
import createTableRow from '../utl/createTableRow';
import createTableCol from '../utl/createTableCol';
import createTableHeaderRow from '../utl/createTableHeaderRow';
import createTableFooterRow from '../utl/createTableFooterRow';
import filterInnerHTML from '../utl/filterInnerHTML';

/*
plus: &#x2b;
minus: &#8722;
*/

const controls = state => {
  createElement({
    type: 'div',
    id: `editor-table-controls`,
    parent: 'editor-table-container',
  });

  if (state.header) {
    createElement({
      type: 'button',
      id: 'add-header-row',
      parent: 'editor-table-controls',
      innerHTML: '&#x2b; add header row',
      eventObject: {
        listener: 'click',
        func: () => {
          if (state.header) {
            state.headerContent.push(createTableHeaderRow(state));
          }
          reload(state, true);
        },
      },
    });

    createElement({
      type: 'button',
      id: 'remove-header-row',
      parent: 'editor-table-controls',
      innerHTML: '&#8722; remove header row',
      eventObject: {
        listener: 'click',
        func: () => {
          if (!state.header) {
            return;
          }

          for (let td = 0; td < state.headerContent.at(-1).length; td++) {
            if (state.headerContent.at(-1)[td].rowCollision === true) {
              alert('Rowspan detected, cannot delete row. Remove rowspan first.');
              return;
            }
          }

          if (state.headerContent.length > 1) {
            state.headerContent.pop();
          }
          reload(state, true);
        },
      },
    });
  }

  //body
  createElement({
    type: 'button',
    id: 'add-row',
    parent: 'editor-table-controls',
    innerHTML: '&#x2b; add row',
    eventObject: {
      listener: 'click',
      func: () => {
        state.content.push(createTableRow(state));
        reload(state, true);
      },
    },
  });

  createElement({
    type: 'button',
    id: 'remove-row',
    parent: 'editor-table-controls',
    innerHTML: '&#8722 remove row',
    eventObject: {
      listener: 'click',
      func: () => {
        for (let td = 0; td < state.content.at(-1).length; td++) {
          if (state.content.at(-1)[td].rowCollision === true) {
            alert('Rowspan detected, cannot delete row. Remove rowspan first.');
            return;
          }
        }

        if (state.content.length > 1) {
          state.content.pop();
        }
        reload(state, true);
      },
    },
  });

  if (state.footer) {
    createElement({
      type: 'button',
      id: 'add-footer-row',
      parent: 'editor-table-controls',
      innerHTML: '&#x2b; add footer row',
      eventObject: {
        listener: 'click',
        func: () => {
          if (state.footer) {
            state.footerContent.push(createTableFooterRow(state));
          }
          reload(state, true);
        },
      },
    });

    createElement({
      type: 'button',
      id: 'remove-footer-row',
      parent: 'editor-table-controls',
      innerHTML: '&#8722 remove footer row',
      eventObject: {
        listener: 'click',
        func: () => {
          if (!state.footer) {
            return;
          }

          for (let td = 0; td < state.footerContent.at(-1).length; td++) {
            if (state.footerContent.at(-1)[td].rowCollision === true) {
              alert('Rowspan detected, cannot delete row. Remove rowspan first.');
              return;
            }
          }

          if (state.footerContent.length > 1) {
            state.footerContent.pop();
          }
          reload(state, true);
        },
      },
    });
  }

  createElement({
    type: 'button',
    id: 'add-column',
    parent: 'editor-table-controls',
    innerHTML: '&#x2b; add column',
    attrs: [
      {
        attr: 'class',
        value: 'add-column',
      },
    ],
    eventObject: {
      listener: 'click',
      func: () => {
        createTableCol(state);
        reload(state, true);
      },
    },
  });

  createElement({
    type: 'button',
    id: 'remove-column',
    parent: 'editor-table-controls',
    innerHTML: '&#8722 remove column',
    eventObject: {
      listener: 'click',
      func: () => {
        let detectedColspan = false;

        for (let row = 0; row < state.content.length; row++) {
          if (state.content[row].at(-1).colCollision === true) {
            detectedColspan = true;
          }
        }

        for (let headerRow = 0; headerRow < state.headerContent.length; headerRow++) {
          if (state.headerContent[headerRow].at(-1).colCollision === true) {
            detectedColspan = true;
          }
        }

        for (let footerRow = 0; footerRow < state.footerContent.length; footerRow++) {
          if (state.footerContent[footerRow].at(-1).colCollision === true) {
            detectedColspan = true;
          }
        }

        if (detectedColspan) {
          alert('Colspan detected, cannot delete column. Remove colspan first.');
          return;
        }

        if (state.columnSettings.length > 1) {
          state.columnSettings.pop();
        }

        if (state.colgroupProps.length > 1) {
          state.colgroupProps.pop();
        }

        state.headerContent.forEach(element => {
          if (element.length > 1) {
            element.pop();
          }
        });

        state.content.forEach(element => {
          if (element.length > 1) {
            element.pop();
          }
        });

        state.footerContent.forEach(element => {
          if (element.length > 1) {
            element.pop();
          }
        });
        reload(state, true);
      },
    },
  });

  createElement({
    type: 'input',
    id: 'show-cell-controls-toggle',
    parent: 'editor-table-controls',
    inputProps: {
      type: 'checkbox',
      label: 'Cell Controls',
      for: 'show-cell-controls-toggle',
      checked: state.showCellControls,
    },
    eventObject: {
      listener: 'input',
      func: () => {
        state.showCellControls = !state.showCellControls;
        reload(state, true);
      },
    },
  });

  createElement({
    type: 'input',
    id: 'colgroup-toggle',
    parent: 'editor-table-controls',
    inputProps: {
      type: 'checkbox',
      label: 'Colgroup',
      name: 'colgroup-toggle',
      for: 'colgroup-toggle',
      checked: state.colgroup,
    },
    eventObject: {
      listener: 'click',
      func: () => {
        state.colgroup = !state.colgroup;
        reload(state, true);
      },
    },
  });

  createElement({
    type: 'input',
    id: 'caption-toggle',
    parent: 'editor-table-controls',
    attrs: [
      {
        attr: 'type',
        value: 'checkbox',
      },
      {
        attr: 'name',
        value: 'captionToggle',
      },
      {
        attr: 'value',
        value: 'Toggle caption',
      },
    ],
    inputProps: {
      type: 'checkbox',
      label: 'Caption',
      name: 'caption-toggle',
      for: 'caption-toggle',
      value: 'Toggle Caption',
      checked: state.caption,
    },
    eventObject: {
      listener: 'click',
      func: () => {
        state.caption = !state.caption;
        reload(state, true);
      },
    },
  });

  if (state.caption) {
    createElement({
      type: 'input',
      id: 'table-caption-input',
      parent: 'editor-table-controls',
      inputProps: {
        type: 'text',
        label: 'Table caption',
        for: 'table-caption-input',
        value: state.captionText,
      },
      eventObject: {
        listener: 'input',
        func: e => {
          state.captionText = e.target.value;
          reload(state);
        },
      },
    });
  }

  createElement({
    type: 'input',
    id: 'header-toggle',
    parent: 'editor-table-controls',
    inputProps: {
      type: 'checkbox',
      label: 'Header',
      name: 'header-toggle',
      for: 'header-toggle',
      checked: state.header,
    },
    eventObject: {
      listener: 'click',
      func: () => {
        state.header = !state.header;
        reload(state, true);
      },
    },
  });

  createElement({
    type: 'input',
    id: 'footer-toggle',
    parent: 'editor-table-controls',
    inputProps: {
      type: 'checkbox',
      label: 'Footer',
      name: 'footer-toggle',
      for: 'footer-toggle',
      checked: state.footer,
    },
    eventObject: {
      listener: 'click',
      func: () => {
        state.footer = !state.footer;
        reload(state, true);
      },
    },
  });

  createElement({
    type: 'input',
    id: 'use-line-breaks',
    parent: 'editor-table-controls',
    inputProps: {
      type: 'checkbox',
      label: 'Use line breaks',
      for: 'use-line-breaks',
      checked: state.useLineBreaks,
    },
    eventObject: {
      listener: 'click',
      func: () => {
        state.useLineBreaks = !state.useLineBreaks;
        reload(state, true);
      },
    },
  });

  createElement({
    type: 'input',
    id: 'allow-tags',
    parent: 'editor-table-controls',
    inputProps: {
      type: 'checkbox',
      label: 'Allow tags',
      for: 'allow-tags',
      checked: state.allowTags,
    },
    eventObject: {
      listener: 'click',
      func: () => {
        state.allowTags = !state.allowTags;

        const confirmMsg = `
        🚫Tags are now disallowed in the table.🚫

        "Ok": Delete all tags currently in the table.

        "Cancel": Tags will now be blocked, but keeps any existing tags.
        (editing a field with existing tags will remove the tags)
        `;

        if (!state.allowTags && confirm(confirmMsg)) {
          for (let i = 0; i < state.headerContent.length; i++) {
            for (let x = 0; x < state.headerContent[i].length; x++) {
              state.headerContent[i][x].innerHTML = filterInnerHTML(state.headerContent[i][x].innerHTML);
            }
          }

          for (let i = 0; i < state.content.length; i++) {
            for (let x = 0; x < state.content[i].length; x++) {
              state.content[i][x].innerHTML = filterInnerHTML(state.content[i][x].innerHTML);
            }
          }
        }
        reload(state, true);
      },
    },
  });

  createElement({
    type: 'input',
    id: 'table-use-class',
    parent: 'editor-table-controls',
    inputProps: {
      type: 'checkbox',
      label: 'Table class',
      for: 'table-use-class',
      checked: state.useClassName,
    },
    eventObject: {
      listener: 'click',
      func: () => {
        state.useClassName = !state.useClassName;
        reload(state, true);
      },
    },
  });

  if (state.useClassName) {
    createElement({
      type: 'input',
      id: 'table-class-selector',
      parent: 'editor-table-controls',
      inputProps: {
        type: 'text',
        label: 'table class',
        for: 'table-class-selector',
        value: state.className,
      },
      eventObject: {
        listener: 'input',
        func: e => {
          state.className = e.target.value;
          reload(state);
        },
      },
    });
  }

  createElement({
    type: 'button',
    id: 'reset-table',
    parent: 'editor-table-controls',
    innerHTML: 'reset table',
    eventObject: {
      listener: 'click',
      func: () => {
        let clearTableAlert = confirm('Are you sure you want to clear the current table data?');
        if (clearTableAlert) {
          localStorage.removeItem('savedState');
          location.reload();
        }
      },
    },
  });

  createElement({
    type: 'input',
    id: 'import-from-csv',
    innerHTML: 'Import from CSV',
    parent: 'editor-table-controls',
    inputProps: {
      type: 'file',
    },
    eventObject: {
      listener: 'change',
      func: e => {
        if (confirm('Clear current table contents and import from csv?')) {
          const reader = new FileReader();
          reader.readAsText(e.target.files[0]);

          reader.onload = e => {
            state.header = true;
            state.footer = false;
            state.headerContent = [];
            state.content = [];

            const headerContent = [];

            const str = e.target.result.split('\r\n');
            const headerArr = str[0].split(',');

            for (let hi = 0; hi < headerArr.length; hi++) {
              let obj = {
                innerHTML: headerArr[hi],
                rowspan: 1,
                colspan: 1,
                rowCollision: false,
                colCollision: false,
              };
              headerContent.push(obj);
            }
            state.headerContent.push(headerContent);

            for (let br = 1; br < str.length; br++) {
              let strRowArr = str[br].split(',');
              console.log(strRowArr);
              let bodyRow = [];

              for (let bi = 0; bi < strRowArr.length; bi++) {
                let obj = {
                  innerHTML: strRowArr[bi],
                  rowspan: 1,
                  colspan: 1,
                  rowCollision: false,
                  colCollision: false,
                  isHeader: false,
                  headerScope: 'col',
                };

                bodyRow.push(obj);
              }

              state.content.push(bodyRow);
            }

            reload(state, true);
          };
        }
      },
    },
  });
};
export default controls;
