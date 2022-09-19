import { cape, isValidCard, pad, uuidv4 } from '../util/dataUtil';
import stringUtil from '../util/stringUtil';

export const initialState = () => {
    const card = initCard(stringUtil.randomName());
    return {
        _idv4: uuidv4(),
        name: 'rpg-material',
        card: card._idv4,
        cards: [
            card,
            ...Array(12)
                .fill(0)
                .map((_, i) =>
                    initCard(
                        stringUtil.randomName(),
                        'abstract-' + pad(i + 1, 3, '0')
                    )
                ),
        ],
        options: defaultOptions(),
    };
};

export const initDeck = (name, cards = [], options = {}) => {
    const saneCards = cape(cards).flatMap((c) => duplicateCard(c, ''));
    const firstCardId =
        saneCards.length > 0 && saneCards[0]._idv4 ? saneCards[0]._idv4 : null;
    return {
        _idv4: uuidv4(),
        name: name ? String(name) : stringUtil.randomName(),
        card: firstCardId,
        cards: saneCards,
        options: duplicateOptions(options),
    };
};

export const duplicateDeckState = (
    { name, cards, options } = {},
    titleConcat = ''
) => {
    if (
        typeof name === 'string' &&
        Array.isArray(cards) &&
        cards.every(isValidCard) &&
        typeof options === 'object'
    )
        return initDeck(name + titleConcat, cards, options);

    return initDeck();
};

export const initCard = (title, icon = '') => ({
    _idv4: uuidv4(),
    count: 1,
    color: '',
    title: title ? String(title) : stringUtil.randomName(),
    icon_front: icon,
    icon_back: '',
    qr: '',
    code: '',
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
    title_format: 'icon-name-code',
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
    title_format,
    titleFormat,
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

    newOptions.title_format = saneStr(
        titleFormat || title_format,
        newOptions.title_format
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

export const sampleDeck = () =>
    duplicateDeckState({
        _idv4: 'bf14147',
        name: 'Sample Cards',
        cards: [
            {
                count: 1,
                color: '',
                title: 'Content lines part 1',
                icon_front: '',
                icon_back: '',
                qr: '',
                title_font_size: 0,
                body_font_size: 0,
                contents: [
                    'subtitle | The basics of formatting',
                    'text | Each line in the content area will be transformed and formatted to appear on the card. On each line, you can further format the text by using the following markups:',
                    'bullet | Bold | A phrase surrounded by two stars or underlines will be bolded like **this** or __this__.',
                    'bullet | Italics | A phrase surrounded by a single star or underline will be italicized like *this* or _this_.',
                    'bullet | Bold Italics | A phrase surrounded by three stars or underlines will be bolded and italicized like ***this*** or ___this___.',
                    'bullet | New line | A line with two carrots will break into a new line.^^Like this.',
                    'bullet | ndash | Two dashes will become a ndash--like this.',
                    'bullet | mdash | Three dashes will become a mdash---like this.',
                ],
            },
            {
                count: 1,
                color: '',
                title: 'Content lines part 2',
                icon_front: '',
                icon_back: '',
                qr: '',
                title_font_size: 0,
                body_font_size: 0,
                contents: [
                    'subtitle | Introduction to lines',
                    'section | text',
                    'text | As you saw on the previous card, each line of text in the "content" area must be preceded by a keyword and a vertical bar. All text between vertical bars is an argument. The first argument, the text after the keyword, is the first argument and so on.',
                    'text | There are many types of lines, the most basic is "text." If accepts a single argument. Text after the first argument is not displayed. | Like this.',
                    'fill',
                    'section | property',
                    "text | The 'property' line displays the first argument in bold and the second argument as the describing text. When a property line wraps, it is indented slightly. If there is a 3rd and 4th argument, the line will be split and display them in two columns.",
                    'prop | Example | This is an example. Note how the text wraps on the card.',
                    'p | Column example | This is text in the first column | The column | The text in the second column. There is a space between the columns.',
                    'fill',
                    'section | description',
                    'text | The "description" line is similar to "property." The first argument is bold, italics, and ends in a period and the second argument is the describing text. But, description does not support columns.',
                    'description | My description | The description of something. When it wraps it does not indent.',
                ],
            },
            {
                count: 1,
                color: '',
                title: 'Content lines part 3',
                icon_front: '',
                icon_back: '',
                qr: '',
                title_font_size: 0,
                body_font_size: 0,
                contents: [
                    'subtitle | Advanced lines part 1',
                    'section | subtitle',
                    'text | Subtitle creates text that is italics and slightly larger than the body font. See above for example.',
                    'fill',
                    'section | bullet | check',
                    'text | Bullet and check create list items. Bullet lines are bulleted, while check lines are empty checkboxes If you provide two arguments, the first argument is bolded.',
                    'bullet | Rainbows',
                    'list | Horseshoes',
                    'item | Red | balloons',
                    'check | Buy cereal',
                    'todo | At Home | Feed the dog',
                    'fill',
                    'section | section',
                    'text | Section makes a heading with a dividing line. It can take any number of arguments, each argument will be spaced evenly on the dividing line. If the text becomes too long, each argument will wrap separately.',
                    'section | A normal line of text',
                    'section | 1st arg | 2nd arg which is a bit longer | 3rd arg | 4th arg',
                    'fill',
                ],
            },
            {
                count: 1,
                color: '',
                title: 'Content lines part 4',
                icon_front: '',
                icon_back: '',
                qr: '',
                title_font_size: 0,
                body_font_size: 0,
                contents: [
                    'subtitle | Advanced lines part 2',
                    'section | icons',
                    'text | You can place icons inside the card by using "icon". If the size and number of icons is to wide, they wont display as expected.',
                    'bullet | 1st arg | Name of the icon, as seen in the icon selector.',
                    'bullet | 2nd arg | Size of the icon. Can be any number greater than or equal to 1.',
                    'bullet | 3rd arg | Alignment of the icon. left, right, justify, center, around, and evenly.',
                    'bullet | 4th arg | Number of icons to place.',
                    'icon | ace | 4 | justify | 5',
                    'icon | plain-square |  | around | 5',
                    'fill',
                    'section | table',
                    'text | Tables are complex. All table type lines will merge together if there are no non-table lines between them. The main table type lines are "table" and "row".',
                    'table | Heading | B | C',
                    'row | 1 | 2 | 3',
                    'row | lorem | **ipsum** | Z',
                    'text | a table divided',
                    'table | Q | w | ',
                    'row | a |  | d | a | ww',
                    'fill',
                ],
            },
            {
                count: 1,
                color: '',
                title: 'Content lines part 5 [[one-action]]',
                icon_front: '',
                icon_back: '',
                qr: '',
                title_font_size: 0,
                body_font_size: 0,
                contents: [
                    'subtitle | Spacing and system specific',
                    'section | Fill',
                    'text | The fill line will try to make room between the lines above and below it. You can provide a number as an argument to give it additional weight. For example, 2 will take up twice as much space as 1. Fill defaults to a weight of 1.',
                    'fill | 2',
                    'section | Pathfinder 2e',
                    'text | For Pathfinder 2e, the "pftrait" line will format each argument as a trait.',
                    'pftrait | uncommon | rare | magical | human | fire | evocation',
                    'text | Additionally, the action symbols can be placed inside text or the title of a card, see above.',
                    'bullet | One Action | [[one-action]]',
                    'bullet | Two Action | [[two-action]]',
                    'bullet | Three Action | [[three-action]]',
                    'bullet | Reaction | [[reaction]]',
                    'bullet | Free Action | [[free-action]]',
                    'fill',
                    'section | d20 Abilities | D&D',
                    'text | The d20ability line will create a table with 6 arguments: Strength, Dexterity, Constitution, Intelligence, Wisdom, and Charisma. The table will display the given value and the modifier value.',
                    'd20ability | 10 | 16 | 13 | 8 | 22 | 19',
                ],
            },
            {
                count: 1,
                color: '',
                title: 'Card Values',
                icon_front: '',
                icon_back: '',
                qr: '',
                title_font_size: 0,
                body_font_size: 0,
                contents: [
                    'text | Each card has the following values: name, title font, body font, count, icon front, icon back, color, and content.',
                    'prop | name | The name on the card. It is displayed at the top of the card.',
                    "prop | title font | The font size of the title. Defaults to the deck's default title font.",
                    "prop | body font | The font size of the content lines. Defaults to the deck's default body font.",
                    'prop | count | How many instances of the card you want to print. The cards will appear next to each other.',
                    "prop | icon front | The icon displayed in the top of the card, right of the title. Defaults to the deck's icon.",
                    "prop | icon back | The icon displayed on the back of the card. Defaults to the card's front icon.",
                    "prop | color | The color of the cards border. Defaults to the deck's color.",
                    'prop | content | The formatted content of the card. Outside of the title and card back, the card is formatted by the text inside the content value. Each line of text must start with a keyword, like text or property.',
                ],
            },
            {
                count: 1,
                color: '',
                title: 'Deck Values',
                icon_front: '',
                icon_back: '',
                qr: '',
                title_font_size: 0,
                body_font_size: 0,
                contents: [
                    'text | Each deck has the following values: name, icon, color, default title font, default body font.',
                    'prop | name | The name of the deck. It is displayed at the top of the card.',
                    "prop | icon | The deck's icon, seen when managing decks. Cards that select the default front icon will use this icon.",
                    "prop | color | The deck's color, seen when managing decks. Cards that select the default color will use this color.",
                    'prop | default title font | Cards that select the default title font will use this font size.',
                    'prop | default body font | Cards that select the default body font will use this font size.',
                ],
            },
        ],
        options: {
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
        },
    });
