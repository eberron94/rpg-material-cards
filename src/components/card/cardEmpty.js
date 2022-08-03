import React from 'react';
import styleUtil from '../../util/styleUtil';

export default React.forwardRef((props, ref) => {
    const cardSizeStyle = styleUtil.cardSize(props);

    const style = {
        ...cardSizeStyle,
        color: 'none',
        border: 'none',
        backgroundColor: 'none',
    };

    return <div ref={ref} className='card card-empty' style={style} />;
});
