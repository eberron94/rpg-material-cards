import cardUtil from '../../util/cardUtil';
import Image from '../image';
import { IconBack } from './css';

export default (params) => {
    const { icon, path, rotation } = cardUtil.iconBack(params);

    let className = 'card-back-icon';
    let imageElement = <Image src={path} rotation={rotation} alt='' />;

    // if (icon === 'qr-code') {
    //     className += ' qr-code';
    //     imageElement = (
    //         <QRCode
    //             value={cardUtil.iconQR(params)}
    //             size={96}
    //             renderAs='svg'
    //             includeMargin
    //         />
    //     );
    // }

    return (
        <IconBack
            className={className}
            cardStyle={params.cardStyle}
            rotation={rotation}
        >
            {imageElement}
        </IconBack>
    );
};
