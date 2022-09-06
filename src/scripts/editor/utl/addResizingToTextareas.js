const addResizingToTextareas = () => {
  const $textarea_arr = document.getElementsByTagName('textarea');

  for (let i = 0; i < $textarea_arr.length; i++) {
    $textarea_arr[i].style.height = `${$textarea_arr[i].scrollHeight}px`;

    const setScrollHeight = e => {
      e.target.style.height = '24px';
      e.target.style.height = `${e.target.scrollHeight}px`;
    };

    $textarea_arr[i].addEventListener('input', e => setScrollHeight(e));
  }
};

export default addResizingToTextareas;
