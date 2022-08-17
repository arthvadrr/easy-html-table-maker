import toaster from './editor/utl/toaster';

// TODO refactor to navigator.clipboard
const copyTextToClipboard = text => {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  const copy = document.execCommand('copy');
  document.body.removeChild(textarea);
  console.log(toaster);
  toaster('Copied to clipboard!', document.getElementsByTagName('body')[0]);
};

export default copyTextToClipboard;
