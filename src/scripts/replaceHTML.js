const replaceHTML = text => {
    text = text.replace(/<br\s*[\/]?>/gi, '\n'); // replace line breaks
    text = text.replace(/&lt;/g, '<'); // replace opening tags
    text = text.replace(/&gt;/g, '>'); // replace closing tags
    text = text.replace(/&nbsp;/g, ' '); // replace spaces

    return text;
};

export default replaceHTML;
