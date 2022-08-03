import cardUtil from '../../util/cardUtil';
import { PFTrait, PFTraitContainer } from './css';

export default ({ decoration, ...params }) => {
    const traits = cardUtil
        .traitTextArray(params)
        .map((text, i) => (
            <Trait key={i} text={text} cardStyle={params.cardStyle} />
        ));

    return (
        <PFTraitContainer
            className='card-element card-pftrait-container'
            cardStyle={params.cardStyle}
        >
            {traits}
        </PFTraitContainer>
    );
};

const Trait = ({ text, ...props }) => {
    let className = '';

    switch (text.trim()) {
        case 'uncommon':
            className = 'card-pftrait-uncommon';
            break;
        case 'rare':
            className = 'card-pftrait-rare';
            break;
        case 'unique':
            className = 'card-pftrait-unique';
            break;
        default:
    }

    return (
        <PFTrait {...props} className={className}>
            {text}
        </PFTrait>
    );
};
