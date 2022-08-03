import cardUtil from '../../util/cardUtil';
import textUtil from '../../util/textUtil';
import { Text, TextContainer } from './css';

export default (decoration) => (params) => {
    const text = cardUtil.textTextString(params);

    const style = {};

    switch (decoration) {
        case 'center':
            style.textAlign = 'center';
            break;
        case 'justify':
            style.textAlign = 'justify';
            style.hyphens = 'auto';
            break;
        case 'right':
            style.textAlign = 'right';
            break;
    }

    return (
        <TextContainer
            className='card-element card-description-line'
            cardStyle={params.cardStyle}
            {...style}
        >
            <Text
                className='card-p card-description-text'
                cardStyle={params.cardStyle}
            >
                {textUtil.stylize(text)}
            </Text>
        </TextContainer>
    );
};
