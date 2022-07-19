const filterInnerHTML = (str, allowTags) => {
    if (allowTags) {
        return str;
    }

    const $div = document.createElement('div');
    $div.innerHTML = str;

    let $divTextContent = $div.textContent;
    let $divInnerText = $div.innerHTML;

    $div.remove();

    return $divTextContent || $divInnerText || '';
};

export default filterInnerHTML;
