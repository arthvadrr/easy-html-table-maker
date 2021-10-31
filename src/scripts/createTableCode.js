/*
Opening Bracket
&lt;   ==  <

Closing Bracket
&gt    ==  >

Space
\u00a0 == ' '
*/

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
        for (let h = 0; h < state.headerContent.length; h++) {
            output += `${indent(6)}&lt;th&gt${state.headerContent[h].innerHTML}&lt;/th&gt<br>`;
        }
        output += `${indent(4)}&lt;/tr&gt<br>${indent(2)}&lt;/thead&gt<br>`;
    }

    output += `${indent(2)}&lt;tbody&gt<br>`;
    for (let r = 0; r < state.content.length; r++) {
        output += `${indent(4)}&lt;tr&gt<br>`;

        for (let c = 0; c < state.content[r].length; c++) {
            if (!state.content[r][c].colCollision && !state.content[r][c].rowCollision) {
                output += `${indent(6)}&lt;td`;

                if (state.content[r][c].rowspan > 1) {
                    output += ` rowspan="${state.content[r][c].rowspan}"`;
                }
                if (state.content[r][c].colspan > 1) {
                    output += ` colspan="${state.content[r][c].colspan}"`;
                }
                output += `&gt${state.content[r][c].innerHTML}&lt;/td&gt<br>`;
            }
        }
        output += `${indent(4)}&lt;/tr&gt<br>`;
    }
    output += `${indent(2)}&lt;/tbody&gt<br>`;
    output += `&lt;/table&gt<br>`;

    $code_tableCode.innerHTML = output;

    return output;
};

export default createTableCode;
