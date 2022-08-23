const toaster = (msg = 'Toast!', parent) => {
  const $div_toast = document.createElement('div');

  const $div_toast_msg = document.createElement('div');

  $div_toast_msg.classList.add('toast-msg');

  $div_toast.appendChild($div_toast_msg);

  const this_many_toasts_are_already_on_the_page = document.getElementsByClassName('toast').length;

  $div_toast.classList.add('toast');
  $div_toast.style.top = `${20 + this_many_toasts_are_already_on_the_page * 20}px`;
  $div_toast_msg.innerText = msg;

  parent.appendChild($div_toast);

  const destroyToast = () => {
    $div_toast.remove();
  };

  setTimeout(destroyToast, 3000);
};

export default toaster;
