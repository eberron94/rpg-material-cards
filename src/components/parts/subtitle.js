import cardUtil from '../../util/cardUtil';
import textUtil from '../../util/textUtil';
import { Subtitle } from './css';

export default (params) => {
    const subtitle = cardUtil.subtitleTextString(params);

    return (
        <Subtitle
            className='card-element card-subtitle'
            cardStyle={params.cardStyle}
        >
            {textUtil.stylize(subtitle)}
        </Subtitle>
    );
};
