const copyTextToClipboard = text => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy'); // "Deprecated" without a working replacement smh
    document.body.removeChild(textarea);
};

export default copyTextToClipboard;
