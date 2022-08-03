import { cape, pad, uuidv4 } from '../util/dataUtil';

export const initialState = () => {
    const card = initCard();
    return {
        id: uuidv4(),
        name: 'rpg-material',
        card: card._idv4,
        cards: [
            card,
            ...Array(12)
                .fill(0)
                .map((_, i) =>
                    initCard(
                        null,
                        'card ' + i,
                        'abstract-' + pad(i + 1, 3, '0')
                    )
                ),
        ],
        options: defaultOptions(),
    };
};

export const initCard = (id = uuidv4(), title = 'New card', icon = '') => ({
    _idv4: id || uuidv4(),
    count: 1,
    color: '',
    title,
    icon_front: icon,
    icon_back: '',
    qr: '',
    title_font_size: 0,
    body_font_size: 0,
    contents: [],
});

export const duplicateCard = (data, titleConcat = ' (copy)') => {
    const saneCard = sanitize(data);
    if (titleConcat) {
        saneCard.title += titleConcat;
    }

    return saneCard;
};

export const defaultOptions = () => ({
    default_color: '#000000',
    default_icon: 'ace',
    default_title_font_size: '13',
    default_body_font_size: '8',
    page_width: '8.5in',
    page_height: '11in',
    page_rows: 2,
    page_columns: 3,
    card_arrangement: 'doublesided',
    card_width: '3in',
    card_height: '5in',
    scale: 1,
    shrink: true,
});

export const duplicateOptions = ({
    default_color,
    color,
    default_icon,
    icon,
    default_title_font_size,
    title_font_size,
    defaultTitleFontSize,
    titleFontSize,
    default_body_font_size,
    body_font_size,
    defaultBodyFontSize,
    bodyFontSize,
    page_width,
    pageWidth,
    page_height,
    pageHeight,
    page_rows,
    pageRows,
    rows,
    page_columns,
    pageColumns,
    columns,
    card_arrangement,
    card_width,
    cardWidth,
    card_height,
    cardHeight,
    scale,
    shrink,
}) => {
    const newOptions = defaultOptions();
    newOptions.default_color = saneStr(
        default_color || color,
        newOptions.default_color
    );
    newOptions.default_icon = saneStr(
        default_icon || icon,
        newOptions.default_icon
    );
    newOptions.default_title_font_size = saneStr(
        default_title_font_size ||
            title_font_size ||
            defaultTitleFontSize ||
            titleFontSize,
        newOptions.default_title_font_size
    );
    newOptions.default_body_font_size = saneStr(
        default_body_font_size ||
            body_font_size ||
            defaultBodyFontSize ||
            bodyFontSize,
        newOptions.default_body_font_size
    );

    newOptions.page_width = saneStr(
        page_width || pageWidth,
        newOptions.page_width
    );
    newOptions.page_height = saneStr(
        page_height || pageHeight,
        newOptions.page_height
    );

    newOptions.page_rows = saneIntPositive(
        page_rows || pageRows || rows,
        newOptions.page_rows
    );
    newOptions.page_columns = saneIntPositive(
        page_columns || pageColumns || columns,
        newOptions.page_columns
    );

    newOptions.card_arrangement = saneStr(
        card_arrangement,
        newOptions.card_arrangement
    );

    newOptions.card_arrangement = saneStr(
        card_arrangement,
        newOptions.card_arrangement
    );

    newOptions.card_width = saneStr(
        card_width || cardWidth,
        newOptions.card_width
    );
    newOptions.card_height = saneStr(
        card_height || cardHeight,
        newOptions.card_height
    );

    newOptions.scale = saneIntPositive(scale, newOptions.scale);
    newOptions.shrink = Boolean(shrink);

    return newOptions;
};

const sanitize = ({
    count,
    color,
    title,
    icon,
    icon_front,
    icon_back,
    qr,
    title_font_size,
    body_font_size,
    contents = [],
    ...data
}) => {
    const saneCard = initCard();

    saneCard.count = saneIntPositive(count, 1);
    saneCard.color = saneStr(color, '');
    saneCard.title = saneStr(title, 'UNKNOWN TITLE');
    saneCard.icon_front = saneStr(icon_front || icon || '', '');
    saneCard.icon_back = saneStr(icon_back, '');
    saneCard.qr = saneStr(qr, '');
    saneCard.title_font_size = saneIntPositive(title_font_size, 0);
    saneCard.body_font_size = saneIntPositive(body_font_size, 0);
    saneCard.contents = cape(contents)
        .map((line) => saneStr(line, ''))
        .filter((e) => e);

    return saneCard;
};

const saneIntPositive = (input, fallback = 1) => {
    if (typeof input === 'number') {
        if (input > 0) return input;
        else return fallback;
    }

    const parsed = parseInt(input);
    return saneIntPositive(parsed, fallback);
};

const saneStr = (input, fallback) => {
    if (!input || input === undefined) return fallback;

    if (typeof input === 'string') {
        if (input.length > 0) return input;
        else return fallback;
    }

    return saneStr(String(input || ''), fallback);
};
