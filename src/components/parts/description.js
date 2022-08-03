import cardUtil from '../../util/cardUtil';
import textUtil from '../../util/textUtil';
import { DescriptionContainer, DescriptionName, Text } from './css';

export default (params) => {
    const name = cardUtil.descriptionNameString(params);
    const text = cardUtil.descriptionTextString(params);

    return (
        <DescriptionContainer
            className='card-element card-description-container'
            cardStyle={params.cardStyle}
        >
            <DescriptionName
                className='card-description-name'
                cardStyle={params.cardStyle}
            >
                {textUtil.stylize(name)}
            </DescriptionName>
            <Text
                className='card-p card-description-text'
                cardStyle={params.cardStyle}
            >
                {textUtil.stylize(text)}
            </Text>
        </DescriptionContainer>
    );
};
