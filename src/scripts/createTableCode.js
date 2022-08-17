import copyTextToClipboard from './copyTextToClipboard';
import createElement from './editor/utl/createElement';
import replaceHTML from './replaceHTML';
import toaster from './editor/utl/toaster';

/*
Opening Bracket
&lt;   ==  <

Closing Bracket
&gt    ==  >

Space
\u00a0 == ' '

line break
&lt;br&gt
*/

const createTableCode = state => {
  let output = '';
  const indent = amount => '\u00A0'.repeat(amount);
  const $code_tableCode = document.getElementById('table-code');
  let className = '';
  let colgroupProps = '';

  if (state.styles.length > 0) {
    output += '&lt;style&gt;';
    output += '<br>';
    for (let style = 0; style < state.styles.length; style++) {
      output += `${state.styles[style].selector} {`;
      output += '<br>';
      output += `${indent(2)}${state.styles[style].style};`;
      output += '<br>';
      output += '}';
      output += '<br>';
      output += state.styles.length === style ? '' : '<br>';
    }
    output += '<span class="tag">&lt;/style&gt;';
    output += '<br><br>';
  }

  if (state.useClassName && state.className.length > 0) {
    className = ` class="${state.className}"`;
  }

  output += `<span class="tag">&lt;table${className}&gt</span><br>`;

  if (state.caption) {
    output += `${indent(2)}<span class="tag">&lt;caption&gt</span>${state.captionText}<span class="tag">&lt;/caption&gt</span><br>`;
  }

  if (state.colgroup) {
    output += `${indent(2)}<span class="tag">&lt;colgroup${colgroupProps}&gt</span><br>`;
    for (let colgroup = 0; colgroup < state.colgroupProps.length; colgroup++) {
      let colOutput = `${indent(4)}<span class="tag">&lt;col`;

      if (state.colgroupProps[colgroup].span > 1 && state.colgroupProps[colgroup].useSpan) {
        colOutput += ` span="${state.colgroupProps[colgroup].span}"`;
      }

      if (state.colgroupProps[colgroup].className !== '' && state.colgroupProps[colgroup].className !== undefined) {
        colOutput += ` class="${state.colgroupProps[colgroup].className}"`;
      }

      if (state.columnSettings[colgroup].width !== 0 && state.columnSettings[colgroup].useWidth) {
        colOutput += ` style="width:${state.columnSettings[colgroup].width}${state.columnSettings[colgroup].widthUnits}"`;
      }

      colOutput += '&gt</span><br>';
      output += colOutput;
    }
    output += `${indent(2)}<span class="tag">&lt;/colgroup&gt</span><br>`;
  }

  if (state.header) {
    output += `${indent(2)}<span class="tag">&lt;thead&gt</span><br>`;
    for (let r = 0; r < state.headerContent.length; r++) {
      output += `${indent(4)}<span class="tag">&lt;tr&gt</span><br>`;

      for (let c = 0; c < state.headerContent[r].length; c++) {
        let headerContent = replaceHTML(state.headerContent[r][c].innerHTML, true);
        if (state.useLineBreaks) {
          headerContent = headerContent.replace(/(\r\n|\n|\r)/gm, '&lt;br&gt');
        }

        let cellType = 'th';

        if (!state.headerContent[r][c].colCollision && !state.headerContent[r][c].rowCollision) {
          output += `${indent(6)}<span class="tag">&lt;${cellType}`;

          if (state.headerContent[r][c].rowspan > 1) {
            output += ` rowspan="${state.headerContent[r][c].rowspan}"`;
          }
          if (state.headerContent[r][c].colspan > 1) {
            output += ` colspan="${state.headerContent[r][c].colspan}"`;
          }
          output += `&gt</span>${headerContent}<span class="tag">&lt;/${cellType}&gt</span><br>`;
        }
      }
      output += `${indent(4)}<span class="tag">&lt;/tr&gt<br></span>`;
    }
    output += `${indent(2)}<span class="tag">&lt;/thead&gt</span><br>`;
  }

  output += `${indent(2)}<span class="tag">&lt;tbody&gt</span><br>`;
  for (let r = 0; r < state.content.length; r++) {
    output += `${indent(4)}<span class="tag">&lt;tr&gt<br></span>`;

    for (let c = 0; c < state.content[r].length; c++) {
      let bodyContent = replaceHTML(state.content[r][c].innerHTML, true);

      if (state.useLineBreaks) {
        bodyContent = bodyContent.replace(/(\r\n|\n|\r)/gm, '&lt;br&gt');
      }

      let isHeader = state.content[r][c].isHeader;
      let headerScope = state.content[r][c].headerScope;
      let cellTypeOpen = isHeader ? `th scope="${headerScope}"` : 'td';
      let cellTypeClose = isHeader ? 'th' : 'td';

      if (!state.content[r][c].colCollision && !state.content[r][c].rowCollision) {
        output += `${indent(6)}<span class="tag">&lt;${cellTypeOpen}`;

        if (state.content[r][c].rowspan > 1) {
          output += ` rowspan="${state.content[r][c].rowspan}"`;
        }
        if (state.content[r][c].colspan > 1) {
          output += ` colspan="${state.content[r][c].colspan}"`;
        }
        output += `&gt</span>${bodyContent}<span class="tag">&lt;/${cellTypeClose}&gt</span><br>`;
      }
    }
    output += `${indent(4)}<span class="tag">&lt;/tr&gt</span><br>`;
  }
  output += `${indent(2)}<span class="tag">&lt;/tbody&gt</span><br>`;

  if (state.footer) {
    output += `${indent(2)}<span class="tag">&lt;tfoot&gt</span><br>`;
    for (let r = 0; r < state.footerContent.length; r++) {
      output += `${indent(4)}<span class="tag">&lt;tr&gt</span><br>`;

      for (let c = 0; c < state.footerContent[r].length; c++) {
        let footerContent = replaceHTML(state.content[r][c].innerHTML, true);

        if (state.useLineBreaks) {
          footerContent = footerContent.replace(/(\r\n|\n|\r)/gm, '&lt;br&gt');
        }

        let isHeader = state.footerContent[r][c].isHeader;
        let headerScope = state.footerContent[r][c].headerScope;
        let cellTypeOpen = isHeader ? `th scope="${headerScope}"` : 'td';
        let cellTypeClose = isHeader ? 'th' : 'td';

        if (!state.footerContent[r][c].colCollision && !state.footerContent[r][c].rowCollision) {
          output += `${indent(6)}<span class="tag">&lt;${cellTypeOpen}`;

          if (state.footerContent[r][c].rowspan > 1) {
            output += ` rowspan="${state.content[r][c].rowspan}"`;
          }
          if (state.footerContent[r][c].colspan > 1) {
            output += ` colspan="${state.footerContent[r][c].colspan}"`;
          }
          output += `&gt</span>${footerContent}<span class="tag">&lt;/${cellTypeClose}&gt</span><br>`;
        }
      }

      output += `${indent(4)}<span class="tag">&lt;/tr&gt</span><br>`;
    }
    output += `${indent(2)}<span class="tag">&lt;/tfoot&gt</span><br>`;
  }

  output += `<span class="tag">&lt;/table&gt</span><br>`;

  $code_tableCode.innerHTML = output;

  if (!document.getElementById('copy-table-code')) {
    createElement({
      type: 'button',
      id: 'copy-table-code',
      parent: 'markup-controls',
      innerHTML: 'copy html',
      eventObject: {
        listener: 'click',
        func: () => {
          copyTextToClipboard(replaceHTML($code_tableCode.innerText));
        },
      },
    });
  }

  return output;
};

export default createTableCode;
