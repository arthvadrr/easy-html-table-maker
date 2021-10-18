const createTableCode = (state, $code_tableCode) => {
    let output = '';
    const indent = amount => '\u00A0'.repeat(amount);

    for (let t = 0; t < state.tables.length; t++) {
        output += '&lt;table&gt<br>';

        if (state.tables[t].header) {
            output += `${indent(2)}&lt;thead&gt<br>${indent(4)}&lt;tr&gt<br>`;
            for (let h = 0; h < state.tables[t].columns; h++) {
                output += `${indent(6)}&lt;th&gt${
                    state.tables[t].headerContent[h].innerHTML
                }&lt;/th&gt<br>`;
            }
            output += `${indent(4)}&lt;/tr&gt<br>${indent(2)}&lt;/thead&gt<br>`;
        }

        output += `${indent(2)}&lt;tbody&gt<br>`;
        for (let i = 0; i < state.tables[t].rows; i++) {
            output += `${indent(4)}&lt;tr&gt<br>`;

            for (let p = 0; p < state.tables[t].columns; p++) {
                output += `${indent(6)}&lt;td&gt${
                    state.tables[t].content[i][p].innerHTML
                }&lt;/td&gt<br>`;
            }
            output += `${indent(4)}&lt;/tr&gt<br>`;
        }
        output += `${indent(2)}&lt;/tbody&gt<br>`;
        output += `&lt;/table&gt<br>`;
    }
    $code_tableCode.innerHTML = output;
};

export default createTableCode;
