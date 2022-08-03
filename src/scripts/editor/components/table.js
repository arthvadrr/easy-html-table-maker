import createElement from '../utl/createElement';

const table = () => {
  // Remove the existing div so we don't get duplicates
  const $div_editorTableContainer = document.getElementById('editor-table-container');
  $div_editorTableContainer.parentNode.removeChild($div_editorTableContainer);

  // Create the container
  createElement({
    type: 'div',
    id: 'editor-table-container',
    parent: 'editor-area',
  });

  // Create the table
  createElement({
    type: 'table',
    id: 'editor-table',
    parent: 'editor-table-container',
    attrs: [
      {
        attr: 'class',
        value: 'editor-table',
      },
    ],
  });
};

export default table;
