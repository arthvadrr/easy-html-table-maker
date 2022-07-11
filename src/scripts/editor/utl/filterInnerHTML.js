const filterInnerHTML = (str, allowTags) => {
    if (allowTags) {
        return str;
    }

    const $div = document.createElement('div');
    $div.innerHTML = str;
    return $div.textContent || $div.innerText || '';
};

export default filterInnerHTML;
