import cardUtil from '../../util/cardUtil';
import { BoxContainer, BoxSVG } from './css';

export default (params) => {
    const color = cardUtil.colorFront(params);
    const count = cardUtil.boxCount(params);
    const size =
        params.cardStyle.scale * cardUtil.boxSize(params) +
        params.cardStyle.sizeUnit;

    return (
        <BoxContainer
            className='card-element card-box-container'
            cardStyle={params.cardStyle}
        >
            {Array(count)
                .fill(0)
                .map((_, i) => (
                    <BoxSVG
                        className='card-box'
                        key={i}
                        height='100'
                        width='100'
                        viewBox='0 0 100 100'
                        preserveAspectRatio='none'
                        xmlns='http://www.w3.org/2000/svg'
                        size={size}
                    >
                        <rect
                            x='5'
                            y='5'
                            width='90'
                            height='90'
                            fill='none'
                            stroke={color}
                            style={{ strokeWidth: 10 }}
                        />
                    </BoxSVG>
                ))}
        </BoxContainer>
    );
};
