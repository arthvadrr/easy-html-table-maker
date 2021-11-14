/*
    Offset of 1 is used only when setting collision (so it doesn't set a collision on the td itself), otherwise offset should be 0.
    If the td has a span > 1, set a span collision at the same position on the next row/column, or rows/columns if span > 2.
*/
const setCollision = (state, r, c, collision, offset) => {
    const rowspan = state.content[r][c].rowspan;
    const colspan = state.content[r][c].colspan;

    if (rowspan > 1) {
        for (let p = offset; p < rowspan; p++) {
            for (let col = 0; col < colspan; col++) {
                state.content[r + p][c + col].rowCollision = collision;
            }
        }
    }

    if (colspan > 1) {
        for (let p = offset; p < colspan; p++) {
            for (let row = 0; row < rowspan; row++) {
                state.content[r + row][c + p].colCollision = collision;
            }
        }
    }
};

export default setCollision;