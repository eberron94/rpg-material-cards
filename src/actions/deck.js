const types = {
    DELETE: 'deck.card.delete',
    DELETE_ALL: 'deck.card.delete.all',
    CREATE: 'deck.card.create',
    DUPLICATE: 'deck.card.duplicate',
    CURRENT: 'deck.set.current',
    NEXT: 'deck.next',
    PREVIOUS: 'deck.previous',
    SET_ORDER: 'deck.order',
    SET_WIDTH: 'deck.width',
    SET_HEIGHT: 'deck.height',
    SET_DEFAULT_TITLE_FONT: 'deck.default.font.title',
    SET_DEFAULT_BODY_FONT: 'deck.default.font.body',
    SET_DEFAULT_ICON: 'deck.default.icon',
    SET_DEFAULT_COLOR: 'deck.default.color',

    ADD_CARDS_FROM_DATA: 'deck.concat.cards',
    RESET_OPTIONS: 'deck.reset.options',
};

const actions = {
    delete: (id) => ({
        type: types.DELETE,
        id,
    }),
    createCard: () => ({
        type: types.CREATE,
    }),
    duplicate: (id) => ({
        type: types.DUPLICATE,
        id,
    }),
    setCurrent: (id) => ({
        type: types.CURRENT,
        id,
    }),
    nextCard: () => ({ type: types.NEXT }),
    previousCard: () => ({ type: types.PREVIOUS }),
    setOrder: (newOrder) => ({ type: types.SET_ORDER, newOrder }),
    setWidth: (value) => ({ type: types.SET_WIDTH, value }),
    setHeight: (value) => ({ type: types.SET_HEIGHT, value }),
    setDefaultTitleFont: (value) => ({
        type: types.SET_DEFAULT_TITLE_FONT,
        value,
    }),
    setDefaultBodyFont: (value) => ({
        type: types.SET_DEFAULT_BODY_FONT,
        value,
    }),
    setDefaultIcon: (value) => ({ type: types.SET_DEFAULT_ICON, value }),
    setDefaultColor: (value) => ({ type: types.SET_DEFAULT_COLOR, value }),
    addCardsFromData: (value) => ({ type: types.ADD_CARDS_FROM_DATA, value }),
    deleteAll: () => ({ type: types.DELETE_ALL }),
    resetOptions: () => ({ type: types.RESET_OPTIONS }),
};

export default { types, actions };
