import { isInteger, sample } from 'lodash';

export const uuidv4 = () => {
    return 'xxx4xxx'.replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
            v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
};

export const cape = (item) => (Array.isArray(item) ? item : [item]);

export const unitIN2MM = (value) => value * 25.4;

export const unitMM2IN = (value) => value / 25.4;

export const pad = (input, length, char = ' ') =>
    (Array(length + 1).join(char) + input).slice(-length);

export const isValidCard = ({ title, contents }) =>
    typeof title === 'string' && // title must be a string
    Array.isArray(contents) && //contents must be an array
    contents.filter((e) => typeof e !== 'string').length === 0; //contents must only contain strings

export const minifyDeck = ({ _idv4, name, cards, options }) => ({
    _idv4,
    name,
    cards: cards.map(({ _idv4, ...card }) => card),
    options,
});

export const jsonifyDeck = (deck, spacer) => {
    const miniDeck = minifyDeck(deck);
    if (typeof spacer === 'number' && isInteger(spacer) && spacer > 0) {
        return JSON.stringify(miniDeck, null, spacer);
    }

    return JSON.stringify(miniDeck);
};

export const saveStorage = (key, dataString) => {
    try {
        if (typeof window !== 'undefined') {
            window.localStorage.setItem(
                key,
                typeof dataString === 'string'
                    ? dataString
                    : JSON.stringify(dataString)
            );
            // console.log('saving to local storage', key);
        }
    } catch (err) {}
};

export const loadStorage = (key) => {
    try {
        if (typeof window !== 'undefined') {
            const string = window.localStorage.getItem(key);
            if (string === null) return undefined;
            // console.log('loading from local storage', key);
            return JSON.parse(string);
        }
    } catch (err) {
        return null;
    }

    return null;
};


