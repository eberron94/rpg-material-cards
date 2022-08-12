import { throttle } from 'lodash';
import { createStore } from 'redux';
import { jsonifyDeck, loadStorage, saveStorage } from '../util/dataUtil';
import { duplicateDeckState, initialState } from './model';
import { rootReducer } from './reducer';

const saveState = (state) => {
    try {
        saveStorage('cardData', jsonifyDeck(state));
    } catch (err) {}
};

const loadState = () => {
    try {
        const loadedState = loadStorage('cardData');
        if (!loadedState) return initialState();
        return duplicateDeckState(loadedState);
    } catch (err) {
        return undefined;
    }
};

export const store = createStore(rootReducer, loadState());
// store.subscribe(() => {
//     const state = store.getState();
//     const currentCard = state.cards.find(({ _idv4 }) => _idv4 === state.card);
//     console.log('current state', currentCard, state.options, state);
// });
store.subscribe(
    throttle(() => {
        saveState(store.getState());
    }, 1000)
);
