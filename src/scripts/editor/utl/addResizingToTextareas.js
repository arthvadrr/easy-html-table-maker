const addResizingToTextareas = () => {
  const $textarea_arr = document.getElementsByTagName('textarea');

  for (let i = 0; i < $textarea_arr.length; i++) {
    $textarea_arr[i].style = `height: 24px; overflow-y: hidden;`;

    const setScrollHeight = e => {
      e.target.style.height = '21px'; // also set in "_app.scss"
      e.target.style.height = `${e.target.scrollHeight}px`;
    };

    $textarea_arr[i].addEventListener('input', e => setScrollHeight(e));
    $textarea_arr[i].addEventListener('click', e => setScrollHeight(e));
  }
};

export default addResizingToTextareas;
