const createTableCode = state => {
    const $code_tableCode = document.getElementById('table-code');

    for (let t = 0; t < state.tables.length; t++) {
        createTextNode('<table>', $code_tableCode, true);

        if (state.tables[t].header) {
            createTextNode('<thead>', $code_tableCode, true, 2);
            createTextNode('<tr>', $code_tableCode, true, 4);
            for (let h = 0; h < state.tables[t].columns; h++) {
                createTextNode('<th>', $code_tableCode, false, 6);
                createTextNode(state.tables[t].headerContent[h].innerHTML, $code_tableCode);
                createTextNode('</th>', $code_tableCode, true);
            }
            createTextNode('</tr>', $code_tableCode, true, 4);
            createTextNode('</thead>', $code_tableCode, true, 2);
        }

        createTextNode('<tbody>', $code_tableCode, true, 2);
        for (let i = 0; i < state.tables[t].rows; i++) {
            createTextNode('<tr>', $code_tableCode, true, 4);

            for (let p = 0; p < state.tables[t].columns; p++) {
                createTextNode('<td>', $code_tableCode, false, 6);
                createTextNode(state.tables[t].content[i][p].innerHTML, $code_tableCode);
                createTextNode('</td>', $code_tableCode, true);
            }

            createTextNode('</tr>', $code_tableCode, true, 4);
        }
        createTextNode('</tbody>', $code_tableCode, true, 2);
        createTextNode('</table>', $code_tableCode, true);
    }
};

const createTextNode = (text, parent, lineBreak, indentAmount = 0) => {
    const textNode = document.createTextNode(text);

    for (let i = 0; i < indentAmount; i++) {
        const indentNode = document.createTextNode('\u00A0');
        parent.appendChild(indentNode);
    }

    parent.appendChild(textNode);

    if (lineBreak) {
        const lineBreakElement = document.createElement('br');
        parent.appendChild(lineBreakElement);
    }
};

export default createTableCode;
