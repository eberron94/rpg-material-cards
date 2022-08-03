import cardUtil from '../../util/cardUtil';
import textUtil from '../../util/textUtil';
import {
    BulletListContainer,
    CheckListContainer,
    ListItem,
    PropertyName,
    Text,
} from './css';

export default (decoration) => (params) => {
    const name = cardUtil.listNameString(params);
    const text = cardUtil.listTextString(params);

    const content = (
        <ListItem className='card-list-item' cardStyle={params.cardStyle}>
            <PropertyName
                className='card-list-item-name'
                cardStyle={params.cardStyle}
            >
                {textUtil.stylize(name)}
            </PropertyName>
            <Text className='card-list-item-text' cardStyle={params.cardStyle}>
                {textUtil.stylize(text)}
            </Text>
        </ListItem>
    );

    switch (decoration) {
        case 'check':
            return (
                <CheckListContainer cardStyle={params.cardStyle}>
                    {content}
                </CheckListContainer>
            );
        case 'bullet':
        default:
            return (
                <BulletListContainer cardStyle={params.cardStyle}>
                    {content}
                </BulletListContainer>
            );
    }
};
