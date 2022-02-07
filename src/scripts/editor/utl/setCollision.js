/*
    Offset of 1 is used only when setting collision (so it doesn't set a collision on the td itself), otherwise offset should be 0.
    If the td has a span > 1, set a span collision at the same position on the next row/column, or rows/columns if span > 2.
*/
const setCollision = (state, r, c, collision, offset, header, footer) => {
    let rowspan, colspan;

    if (header) {
        rowspan = state.headerContent[r][c].rowspan;
        colspan = state.headerContent[r][c].colspan;
    } else if (footer) {
        rowspan = state.footerContent[r][c].rowspan;
        colspan = state.footerContent[r][c].colspan;
    } else {
        rowspan = state.content[r][c].rowspan;
        colspan = state.content[r][c].colspan;
    }

    if (rowspan > 1) {
        for (let p = offset; p < rowspan; p++) {
            for (let col = 0; col < colspan; col++) {
                if (header) {
                    state.headerContent[r + p][c + col].rowCollision = collision;
                } else if (footer) {
                    state.footerContent[r + p][c + col].rowCollision = collision;
                } else {
                    state.content[r + p][c + col].rowCollision = collision;
                }
            }
        }
    }

    if (colspan > 1) {
        for (let p = offset; p < colspan; p++) {
            for (let row = 0; row < rowspan; row++) {
                if (header) {
                    state.headerContent[r + row][c + p].colCollision = collision;
                } else if (footer) {
                    state.footerContent[r + row][c + p].colCollision = collision;
                } else {
                    state.content[r + row][c + p].colCollision = collision;
                }
            }
        }
    }
};

export default setCollision;
