import cardUtil from './cardUtil';

const frontColor = ({ options }, color) => ({
    color: color || options.default_color,
    borderColor: color || options.default_color,
    backgroundColor: color || options.default_color,
});

const backgroundColor = ({ options }, color) => ({
    color: color || options.default_color,
    borderColor: color || options.default_color,
    backgroundColor: color || options.default_color,
});

const cardSize = ({ options }) => {
    const { card_width, card_height } = options;

    return { width: card_width, height: card_height };
};

const makeCardStyle = (props) => {
    const colorFront = cardUtil.colorFront(props);
    const colorBack = cardUtil.colorBack(props);
    const fontSize = cardUtil.bodyTextFont(props);
    const scale = cardUtil.scale(props);
    const { width, height } = cardSize(props);
    const sizeUnit = 'mm';

    return {
        front: {
            ...frontColor(props, colorFront),
            fontSize,
            width,
            height,
            borderStyle: 'solid',
            borderWidth: scale * 2,
            scale,
            sizeUnit,
        },
        back: {
            ...backgroundColor(props, colorBack),
            fontSize,
            width,
            height,
            borderStyle: 'none',
            borderWidth: 0,
            backgroundColor: 'none',
            scale,
            sizeUnit,
            hidden: false,
        },
    };
};



export default {
    frontColor,
    backgroundColor,
    cardSize,
    makeCardStyle,
};
