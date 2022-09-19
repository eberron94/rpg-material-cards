import cardUtil from '../../util/cardUtil';
import textUtil from '../../util/textUtil';
import { Title } from './css';
import IconFront from './iconFront';

export default (params) => {
    const title = cardUtil.titleTextString(params);
    const code = cardUtil.titleCodeString(params);
    const fontSize = cardUtil.titleTextFont(params);
    const titleFormat = cardUtil.titleFormat(params);

    console.log('card-front', titleFormat);

    const nameElem = (
        <span className='card-title-name' key={'name'}>
            {textUtil.stylize(title)}
        </span>
    );
    const codeElem = (
        <span className='card-title-code' key={'code'}>
            {textUtil.stylize(code)}
        </span>
    );
    const iconElem = <IconFront key={'icon'} {...params} />;

    const displayArr = titleFormat.split('-').map((form) => {
        switch (form) {
            case 'name':
                return nameElem;
            case 'icon':
                return iconElem;
            case 'code':
                return codeElem;
            default:
                return null;
        }
    });

    return (
        <Title
            className={cardUtil.joinClass(
                'card-title',
                'card-title-format-' + titleFormat,
                params
            )}
            fontSize={fontSize}
            cardStyle={params.cardStyle}
        >
            {displayArr}
        </Title>
    );
};
