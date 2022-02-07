const replaceHTML = (text, encode) => {
    if (text === '') {
        return '';
    }

    if (typeof text !== 'string') {
        return 'replaceHTML error: Parameter "text" not a string.';
    }

    if (encode) {
        text = text.replace(/\[\/]?n/g, '<br>'); // replace line breaks
        text = text.replace(/</g, '&lt;'); // replace opening tags
        text = text.replace(/>/g, '&gt;'); // replace closing tags
        text = text.replace(/ /g, '&nbsp;'); // replace spaces
        //console.log(text.substr(text.length - 10));
        if (text.substr(text.length - 10) === '&lt;br&gt;') {
            text = text.slice(0, -10);
        }
    } else {
        text = text.replace(/<br\s*[\/]?>/gi, '\n'); // replace line breaks
        text = text.replace(/&lt;/g, '<'); // replace opening tags
        text = text.replace(/&gt;/g, '>'); // replace closing tags
        text = text.replace(/&nbsp;/g, ' '); // replace spaces
    }

    return text;
};

export default replaceHTML;
