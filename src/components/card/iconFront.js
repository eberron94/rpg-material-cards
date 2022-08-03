import cardUtil from '../../util/cardUtil';
import Image from '../image';
import { IconFront } from './css';

export default (params) => {
    const { path, ...props } = cardUtil.iconFront(params);

    return (
        <IconFront
            className='card-title-icon-container'
            cardStyle={params.cardStyle}
            rotation={props.rotation}
        >
            <Image src={path} rotation={props.rotation} alt='' />
        </IconFront>
    );
};
