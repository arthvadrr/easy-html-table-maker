import copyTextToClipboard from './copyTextToClipboard';
import createElement from './editor/utl/createElement';
import replaceHTML from './replaceHTML';

/*
Opening Bracket
&lt;   ==  <

Closing Bracket
&gt    ==  >

Space
\u00a0 == ' '
*/

const createTableCode = state => {
    let output = '';
    const indent = amount => '\u00A0'.repeat(amount);
    const $code_tableCode = document.getElementById('table-code');
    let className = '';
    let colgroupProps = '';

    if (state.useClassName && state.className.length > 0) {
        className = ` class="${state.className}"`;
    }

    output += `&lt;table${className}&gt<br>`;

    if (state.caption) {
        output += `${indent(2)}&lt;caption&gt${state.captionText}&lt;/caption&gt<br>`;
    }

    if (state.colgroup) {
        output += `${indent(2)}&lt;colgroup${colgroupProps}&gt<br>`;
        for (let colgroup = 0; colgroup < state.colgroupProps.length; colgroup++) {
            let colOutput = `${indent(4)}&lt;col`;

            if (state.colgroupProps[colgroup].span > 1) {
            }

            colOutput += '&gt<br>';
            output += colOutput;
        }
        output += `${indent(2)}&lt;/colgroup&gt<br>`;
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
                output += `&gt${replaceHTML(state.content[r][c].innerHTML, true)}&lt;/td&gt<br>`;
            }
        }
        output += `${indent(4)}&lt;/tr&gt<br>`;
    }
    output += `${indent(2)}&lt;/tbody&gt<br>`;
    output += `&lt;/table&gt<br>`;

    $code_tableCode.innerHTML = output;

    if (!document.getElementById('copy-table-code')) {
        createElement({
            type: 'button',
            id: 'copy-table-code',
            parent: 'markup-controls',
            innerHTML: 'Copy HTML',
            eventObject: {
                listener: 'click',
                func: () => {
                    copyTextToClipboard(replaceHTML($code_tableCode.innerHTML));
                },
            },
        });
    }

    return output;
};

export default createTableCode;
