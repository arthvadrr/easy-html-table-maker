const replaceHTML = text => {
    text = text.replace(/<br\s*[\/]?>/gi, '\n'); // Replace line breaks
    text = text.replace(/&lt;/g, '<'); // replace opening tags
    text = text.replace(/&gt;/g, '>'); // replace closing tage
    text = text.replace(/&nbsp;/g, ' '); // replace spaces

    return text;
};

export default replaceHTML;
