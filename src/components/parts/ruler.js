import cardUtil from '../../util/cardUtil';
import { Ruler } from './css';

export default (params) => {
    const color = cardUtil.colorFront(params);

    return (
        <Ruler
            className='card-ruler'
            cardStyle={params.cardStyle}
            height='1'
            width='100'
            viewBox='0 0 100 1'
            preserveAspectRatio='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <polyline points='0,0 100,0.5 0,1' fill={color} />
        </Ruler>
    );
};
