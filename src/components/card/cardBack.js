import React from 'react';
import cardUtil from '../../util/cardUtil';
import styleUtil from '../../util/styleUtil';
import { Card, CardBack, CardBackIconContainer } from './css';
import IconBack from './iconBack';

export default React.forwardRef((props, ref) => {
    const cardStyle = styleUtil.makeCardStyle(props);

    return (
        <Card
            ref={ref}
            className={cardUtil.joinClass('card', props)}
            cardStyle={cardStyle.back}
        >
            <CardBack className='card-back' cardStyle={cardStyle.back}>
                <CardBackIconContainer
                    className='card-back-icon-container'
                    cardStyle={cardStyle.back}
                >
                    <IconBack {...props} cardStyle={cardStyle.back} />
                </CardBackIconContainer>
            </CardBack>
        </Card>
    );
});
