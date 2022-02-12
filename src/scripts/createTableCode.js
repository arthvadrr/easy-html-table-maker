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

    if (state.styles.length > 0) {
        for (let style = 0; style < state.styles.length; style++) {
            output += `${state.styles[style].selector} {`;
            output += '<br>';
            output += `${indent(2)}${state.styles[style].style};`;
            output += '<br>';
            output += '}';
        }
        output += '<br><br>';
    }

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
                colOutput += ` span="${state.colgroupProps[colgroup].span}"`;
            }

            if (state.colgroupProps[colgroup].className != '' && state.colgroupProps[colgroup].className != undefined) {
                colOutput += ` class="${state.colgroupProps[colgroup].className}"`;
            }

            colOutput += '&gt<br>';
            output += colOutput;
        }
        output += `${indent(2)}&lt;/colgroup&gt<br>`;
    }

    if (state.header) {
        output += `${indent(2)}&lt;thead&gt<br>`;
        for (let r = 0; r < state.headerContent.length; r++) {
            output += `${indent(4)}&lt;tr&gt<br>`;

            for (let c = 0; c < state.headerContent[r].length; c++) {
                let cellType = 'th';

                if (!state.headerContent[r][c].colCollision && !state.headerContent[r][c].rowCollision) {
                    output += `${indent(6)}&lt;${cellType}`;

                    if (state.headerContent[r][c].rowspan > 1) {
                        output += ` rowspan="${state.headerContent[r][c].rowspan}"`;
                    }
                    if (state.headerContent[r][c].colspan > 1) {
                        output += ` colspan="${state.headerContent[r][c].colspan}"`;
                    }
                    output += `&gt${replaceHTML(state.headerContent[r][c].innerHTML, true)}&lt;/${cellType}&gt<br>`;
                }
            }
            output += `${indent(4)}&lt;/tr&gt<br>`;
        }
        output += `${indent(2)}&lt;/thead&gt<br>`;
    }

    output += `${indent(2)}&lt;tbody&gt<br>`;
    for (let r = 0; r < state.content.length; r++) {
        output += `${indent(4)}&lt;tr&gt<br>`;

        for (let c = 0; c < state.content[r].length; c++) {
            let isHeader = state.content[r][c].isHeader;
            let headerScope = state.content[r][c].headerScope;
            let cellTypeOpen = isHeader ? `th scope="${headerScope}"` : 'td';
            let cellTypeClose = isHeader ? 'th' : 'td';

            if (!state.content[r][c].colCollision && !state.content[r][c].rowCollision) {
                output += `${indent(6)}&lt;${cellTypeOpen}`;

                if (state.content[r][c].rowspan > 1) {
                    output += ` rowspan="${state.content[r][c].rowspan}"`;
                }
                if (state.content[r][c].colspan > 1) {
                    output += ` colspan="${state.content[r][c].colspan}"`;
                }
                output += `&gt${replaceHTML(state.content[r][c].innerHTML, true)}&lt;/${cellTypeClose}&gt<br>`;
            }
        }
        output += `${indent(4)}&lt;/tr&gt<br>`;
    }
    output += `${indent(2)}&lt;/tbody&gt<br>`;

    if (state.footer) {
        output += `${indent(2)}&lt;tfoot&gt<br>`;
        for (let r = 0; r < state.footerContent.length; r++) {
            output += `${indent(4)}&lt;tr&gt<br>`;

            for (let c = 0; c < state.footerContent[r].length; c++) {
                let isHeader = state.footerContent[r][c].isHeader;
                let headerScope = state.footerContent[r][c].headerScope;
                let cellTypeOpen = isHeader ? `th scope="${headerScope}"` : 'td';
                let cellTypeClose = isHeader ? 'th' : 'td';

                if (!state.footerContent[r][c].colCollision && !state.footerContent[r][c].rowCollision) {
                    output += `${indent(6)}&lt;${cellTypeOpen}`;

                    if (state.footerContent[r][c].rowspan > 1) {
                        output += ` rowspan="${state.content[r][c].rowspan}"`;
                    }
                    if (state.footerContent[r][c].colspan > 1) {
                        output += ` colspan="${state.footerContent[r][c].colspan}"`;
                    }
                    output += `&gt${replaceHTML(state.footerContent[r][c].innerHTML, true)}&lt;/${cellTypeClose}&gt<br>`;
                }
            }

            output += `${indent(4)}&lt;/tr&gt<br>`;
        }
        output += `${indent(2)}&lt;/tfoot&gt<br>`;
    }

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
