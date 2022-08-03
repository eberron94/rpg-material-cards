import cardUtil from '../../util/cardUtil';
import Image from '../image';
import { IconInline, IconInlineContainer } from './css';

export default (params) => {
    const { path, rotation, size, color, align, count, rounded, ...iconData } =
        cardUtil.iconInline(params);

    const scaledSize =
        params.cardStyle.scale * size + params.cardStyle.sizeUnit;

        const scaledRounded = params.cardStyle.scale * rounded + params.cardStyle.sizeUnit

    let display;
    switch (align) {
        case 'left':
            display = 'flex-start';
            break;
        case 'right':
            display = 'flex-end';
            break;
        case 'justify':
            display = 'space-between';
            break;
        case 'center':
            display = 'center';
            break;
        case 'around':
            display = 'space-around';
            break;
        case 'evenly':
        default:
            display = 'space-evenly';
            break;
    }
    return (
        <IconInlineContainer
            className='card-element card-inline-icon'
            display={display}
        >
            {Array(count)
                .fill(0)
                .map((_, i) => (
                    <IconInline
                        key={i}
                        className='card-front-icon card-inline-icon'
                        size={scaledSize}
                        color={color}
                        rounded = {scaledRounded}
                    >
                        <Image src={path} rotation={rotation} alt='' />
                    </IconInline>
                ))}
        </IconInlineContainer>
    );
};
