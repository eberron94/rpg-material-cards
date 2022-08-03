import { throttle } from 'lodash';
import { createStore } from 'redux';
import { initialState } from './model';
import { rootReducer } from './reducer';

const saveState = (state) => {
    try {
        if (typeof window !== 'undefined') {
            window.localStorage.setItem('cardData', JSON.stringify(state));
        }
    } catch (err) {}
};

const loadState = () => {
    try {
        if (typeof window !== 'undefined') {
            const string = window.localStorage.getItem('cardData');
            if (string === null) return undefined;
            console.log('loading...', string);
            return JSON.parse(string);
        }
        return initialState();
    } catch (err) {
        return undefined;
    }
};

export const store = createStore(rootReducer, loadState());
store.subscribe(() => {
    const state = store.getState();
    const currentCard = state.cards.find(({ _idv4 }) => _idv4 === state.card);
    console.log('current state', currentCard, state.options, state);
});
store.subscribe(
    throttle(() => {
        console.log('saving to local storage');
        saveState(store.getState());
    }, 1000)
);
