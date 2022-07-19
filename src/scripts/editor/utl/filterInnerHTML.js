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

export function addFilterInnerHTMLToInputs() {
    const $td_inputArr = document.querySelectorAll('.td-input');

    $td_inputArr.forEach(td => {
        td.addEventListener('input', e => {
            e.target.value = filterInnerHTML(e.target.value);
        });

        td.addEventListener('paste', e => {
            e.target.value = filterInnerHTML(e.target.value);
        });
    });
}

export default filterInnerHTML;
