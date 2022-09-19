import card from './card';
import deck from './deck';
import page from './page';

export const createDispatch = (store) => ({
    card: {
        setTitle: (value) => store.dispatch(card.actions.setTitle(value)),
        setTitleFont: (value) =>
            store.dispatch(card.actions.setTitleFont(value)),
        setBodyFont: (value) => store.dispatch(card.actions.setBodyFont(value)),
        setCount: (value) => store.dispatch(card.actions.setCount(value)),
        setBody: (value) => store.dispatch(card.actions.setBody(value)),
        setQR: (value) => store.dispatch(card.actions.setQR(value)),
        setIconFront: (value) =>
            store.dispatch(card.actions.setIconFront(value)),
        setIconBack: (value) => store.dispatch(card.actions.setIconBack(value)),
        setColor: (value) => store.dispatch(card.actions.setColor(value)),
        setCode: (value) => store.dispatch(card.actions.setCode(value)),
    },
    deck: {
        delete: (id) => store.dispatch(deck.actions.delete(id)),
        deleteAll: () => store.dispatch(deck.actions.deleteAll()),
        createCard: () => store.dispatch(deck.actions.createCard()),
        duplicate: (id) => store.dispatch(deck.actions.duplicate(id)),
        setCurrent: (id) => store.dispatch(deck.actions.setCurrent(id)),
        nextCard: () => store.dispatch(deck.actions.nextCard()),
        previousCard: () => store.dispatch(deck.actions.previousCard()),
        setOrder: (newOrder) => store.dispatch(deck.actions.setOrder(newOrder)),
        setWidth: (value) => store.dispatch(deck.actions.setWidth(value)),
        setHeight: (value) => store.dispatch(deck.actions.setHeight(value)),

        setDefaultTitleFont: (value) =>
            store.dispatch(deck.actions.setDefaultTitleFont(value)),
        setDefaultBodyFont: (value) =>
            store.dispatch(deck.actions.setDefaultBodyFont(value)),
        setDefaultIcon: (value) =>
            store.dispatch(deck.actions.setDefaultIcon(value)),
        setDefaultColor: (value) =>
            store.dispatch(deck.actions.setDefaultColor(value)),

        addCardsFromData: (value) =>
            store.dispatch(deck.actions.addCardsFromData(value)),
        resetOptions: (value) =>
            store.dispatch(deck.actions.resetOptions(value)),
        setOptions: (value) => store.dispatch(deck.actions.setOptions(value)),
        setDeck: (value) => store.dispatch(deck.actions.setDeck(value)),
        setName: (value) => store.dispatch(deck.actions.setName(value)),
        setTitleFormat: (value) =>
            store.dispatch(deck.actions.setTitleFormat(value)),
    },
    page: {
        setWidth: (value) => store.dispatch(page.actions.setWidth(value)),
        setHeight: (value) => store.dispatch(page.actions.setHeight(value)),
        setRows: (value) => store.dispatch(page.actions.setRows(value)),
        setCols: (value) => store.dispatch(page.actions.setCols(value)),
        toggleShrink: () => store.dispatch(page.actions.toggleShrink()),
    },
});

export const types = { card: card.types, deck: deck.types, page: page.types };
