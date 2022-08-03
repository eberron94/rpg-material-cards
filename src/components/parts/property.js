import cardUtil from '../../util/cardUtil';
import textUtil from '../../util/textUtil';
import { PropertyContainer, PropertyName, Text, PropertyFlex } from './css';

export default (params) => {
    const propertyArray = cardUtil
        .propertyTextArray(params)
        .map(({ name, text }, index) => (
            <PropertyFlex key={index}>
                <PropertyName
                    className='card-property-name'
                    cardStyle={params.cardStyle}
                >
                    {textUtil.stylize(name)}
                </PropertyName>
                <Text
                    className='card-property-text'
                    cardStyle={params.cardStyle}
                >
                    {textUtil.stylize(text)}
                </Text>
            </PropertyFlex>
        ));

    return (
        <PropertyContainer
            className='card-element card-property-line'
            cardStyle={params.cardStyle}
        >
            {propertyArray}
        </PropertyContainer>
    );
};
