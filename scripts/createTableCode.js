const createTableCode = (state, $code_tableCode) => {
    if (!$code_tableCode) {
        $code_tableCode = document.getElementById('table-code');
    }

    let output = '';
    const indent = amount => '\u00A0'.repeat(amount);

    output += '&lt;table&gt<br>';

    if (state.caption) {
        output += `${indent(2)}&lt;caption&gt${state.captionText}&lt;/caption&gt<br>`;
    }

    if (state.header) {
        output += `${indent(2)}&lt;thead&gt<br>${indent(4)}&lt;tr&gt<br>`;
        for (let h = 0; h < state.columns; h++) {
            output += `${indent(6)}&lt;th&gt${state.headerContent[h].innerHTML}&lt;/th&gt<br>`;
        }
        output += `${indent(4)}&lt;/tr&gt<br>${indent(2)}&lt;/thead&gt<br>`;
    }

    output += `${indent(2)}&lt;tbody&gt<br>`;
    for (let r = 0; r < state.content.length; r++) {
        output += `${indent(4)}&lt;tr&gt<br>`;

        for (let c = 0; c < state.content[r].length; c++) {
            output += `${indent(6)}&lt;td&gt${state.content[r][c].innerHTML}&lt;/td&gt<br>`;
        }
        output += `${indent(4)}&lt;/tr&gt<br>`;
    }
    output += `${indent(2)}&lt;/tbody&gt<br>`;
    output += `&lt;/table&gt<br>`;

    $code_tableCode.innerHTML = output;
};

export default createTableCode;
