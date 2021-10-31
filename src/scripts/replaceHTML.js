const replaceHTML = (text, encode) => {
    if (typeof text !== 'string') {
        console.log(`Not string, is ${typeof text}`);
        return;
    }

    if (encode) {
        text = text.replace(/\[\/]?n/g, '<br>'); // replace line breaks
        text = text.replace(/</g, '&lt;'); // replace opening tags
        text = text.replace(/>/g, '&gt;'); // replace closing tags
        text = text.replace(/ /g, '&nbsp;'); // replace spaces
    } else {
        text = text.replace(/<br\s*[\/]?>/gi, '\n'); // replace line breaks
        text = text.replace(/&lt;/g, '<'); // replace opening tags
        text = text.replace(/&gt;/g, '>'); // replace closing tags
        text = text.replace(/&nbsp;/g, ' '); // replace spaces
    }

    return text;
};

export default replaceHTML;
