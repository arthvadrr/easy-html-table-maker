const getCellStyleWidth = (colspan, initialWidth) => {
  const width = colspan * initialWidth + colspan * 4;

  const style = `width: ${width}px`; // TODO Still DOESNT WORK.

  return style;
};

export default getCellStyleWidth;
