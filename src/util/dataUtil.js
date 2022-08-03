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
