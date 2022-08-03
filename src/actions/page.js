const types = {
    SET_WIDTH: 'page.width',
    SET_HEIGHT: 'page.height',
    SET_ROW: 'page.row',
    SET_COL: 'page.column',
    TOGGLE_SHRINK: 'deck.toggle.shrink',
};

const actions = {
    setWidth: (value) => ({ type: types.SET_WIDTH, value }),
    setHeight: (value) => ({ type: types.SET_HEIGHT, value }),
    setRows: (value) => ({ type: types.SET_ROW, value }),
    setCols: (value) => ({ type: types.SET_COL, value }),
    toggleShrink: () => ({ type: types.TOGGLE_SHRINK }),
};

export default { types, actions };
