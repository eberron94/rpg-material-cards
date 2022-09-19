import { color } from '@mui/system';
import { types } from '../actions';
import { cape } from '../util/dataUtil';
import {
    defaultOptions,
    duplicateCard,
    duplicateDeckState,
    duplicateOptions,
    initCard,
    initialState,
} from './model';

const findCardIndex = (deck, id) => deck.findIndex(({ _idv4 }) => _idv4 === id);

export const rootReducer = (state = initialState(), action) => {
    const { type, value, id } = action;

    console.log(type, { value, id });

    //Deep Copy
    const newState = {
        _idv4: state._idv4,
        name: state.name,
        card: state.card,
        cards: [...state.cards],
        options: { ...state.options },
    };

    const currIndex = findCardIndex(newState.cards, state.card);

    switch (type) {
        case types.deck.ADD_CARDS_FROM_DATA:
            const newCards = cape(value);
            newCards.forEach((nc, index) => {
                if (typeof nc === 'object') {
                    const newCard = duplicateCard(nc, '');
                    newState.cards.push(newCard);
                    if (index === 0) newState.card = newCard._idv4;
                }
            });
            return newState;

        case types.deck.SET_DECK:
            const deckState = duplicateDeckState(value);
            if (deckState !== null) {
                return deckState;
            }
            return state;

        case types.deck.SET_NAME:
            newState.name = String(value);
            return newState;

        case types.deck.CREATE:
            const newCard = initCard();
            newState.cards.push(newCard);
            newState.card = newCard._idv4; //Switch to new card
            return newState;

        case types.deck.CURRENT:
            newState.card = id;
            return newState;

        case types.deck.NEXT:
            if (currIndex !== -1) {
                const nextIndex =
                    currIndex + 1 >= state.cards.length ? 0 : currIndex + 1;
                newState.card = state.cards[nextIndex]._idv4;
            }
            return newState;

        case types.deck.PREVIOUS:
            if (currIndex !== -1) {
                const prevIndex =
                    currIndex === 0 ? state.cards.length - 1 : currIndex - 1;
                newState.card = state.cards[prevIndex]._idv4;
            }
            return newState;

        case types.deck.DUPLICATE:
            const dupCardIndex = findCardIndex(state.cards, id);
            if (dupCardIndex !== -1) {
                const dupCard = duplicateCard(state.cards[dupCardIndex]);
                newState.cards.push(dupCard);
                newState.card = dupCard._idv4; //switch to new card
            }
            return newState;

        case types.deck.DELETE:
            newState.cards = state.cards.filter(({ _idv4 }) => _idv4 !== id);
            if (newState.card === id) {
                newState.card = newState.cards[0]?._idv4 || null; //switch to new card, if none then null
            }
            return newState;

        case types.deck.SET_ORDER:
            if (Array.isArray(action.newOrder))
                newState.cards = action.newOrder;
            return newState;

        case types.deck.SET_WIDTH:
            newState.options.card_width = value;
            return newState;

        case types.deck.SET_HEIGHT:
            newState.options.card_height = value;
            return newState;

        case types.page.SET_WIDTH:
            newState.options.page_width = value;
            return newState;

        case types.page.SET_HEIGHT:
            newState.options.page_height = value;
            return newState;

        case types.page.SET_ROW:
            newState.options.page_rows = parseInt(value);
            return newState;

        case types.page.SET_COL:
            newState.options.page_columns = parseInt(value);
            return newState;

        case types.page.TOGGLE_SHRINK:
            newState.options.shrink = !Boolean(state.options.shrink);
            return newState;

        case types.deck.SET_DEFAULT_TITLE_FONT:
            newState.options.default_title_font_size = value;
            return newState;

        case types.deck.SET_DEFAULT_BODY_FONT:
            newState.options.default_body_font_size = value;
            return newState;

        case types.deck.SET_DEFAULT_COLOR:
            newState.options.default_color = value;
            return newState;

        case types.deck.SET_DEFAULT_ICON:
            newState.options.default_icon = value;
            return newState;

        case types.deck.DELETE_ALL:
            newState.cards = [];
            newState.card = null;
            return newState;

        case types.deck.RESET_OPTIONS:
            newState.options = defaultOptions();
            return newState;
        case types.deck.SET_OPTIONS:
            newState.options = duplicateOptions(value);
            return newState;

        case types.deck.SET_TITLE_FORMAT:
            switch (value) {
                case 'icon-name-code':
                case 'icon-code-name':

                case 'code-name-icon':
                case 'code-icon-name':

                case 'name-icon-code':
                case 'name-code-icon':

                case 'name-icon':
                case 'name-code':
                    newState.options.title_format = value;
            }

            return newState;
    }

    // Handle card actions

    if (currIndex === -1 || !newState.cards[currIndex]) return state;

    switch (type) {
        case types.card.TITLE:
            newState.cards[currIndex].title = value;
            return newState;
        case types.card.TITLE_FONT:
            newState.cards[currIndex].title_font_size = value;
            return newState;
        case types.card.BODY_FONT:
            newState.cards[currIndex].body_font_size = value;
            return newState;
        case types.card.COUNT:
            newState.cards[currIndex].count = Math.max(1, Number(value));
            return newState;
        case types.card.QR:
            newState.cards[currIndex].qr = value;
            return newState;
        case types.card.ICON_FRONT:
            newState.cards[currIndex].icon_front =
                value === 'default' ? '' : value;
            return newState;
        case types.card.ICON_BACK:
            newState.cards[currIndex].icon_back = value.startsWith('default')
                ? ''
                : value;
            return newState;
        case types.card.COLOR:
            newState.cards[currIndex].color = value;
            return newState;
        case types.card.BODY:
            newState.cards[currIndex].contents = value;
            return newState;

        case types.card.CODE:
            newState.cards[currIndex].code = value;
            return newState;
    }

    return state;
};
