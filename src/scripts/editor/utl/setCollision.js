//Set if a td has a colspan or rowspan collision, or no collision.
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