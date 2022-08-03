import cardUtil from '../../util/cardUtil';
import textUtil from '../../util/textUtil';
import { Title } from './css';
import IconFront from './iconFront';

export default (params) => {
    const title = cardUtil.titleTextString(params);
    const fontSize = cardUtil.titleTextFont(params);

    return (
        <Title
            className={cardUtil.joinClass('card-title', params)}
            fontSize={fontSize}
            cardStyle={params.cardStyle}
        >
            <span>{textUtil.stylize(title)}</span>
            <IconFront {...params} />
        </Title>
    );
};
