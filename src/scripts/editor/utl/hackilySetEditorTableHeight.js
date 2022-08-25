const hackilySetEditorTableHeight = () => {
  const controlContainerHeight = document.getElementById('editor-table-controls').offsetHeight;
  console.log(controlContainerHeight);

  document.getElementById('editor-table').style.height = controlContainerHeight + 'px';
};

export default hackilySetEditorTableHeight;
