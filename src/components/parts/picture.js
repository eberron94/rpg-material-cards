import cardUtil from '../../util/cardUtil';
import styled from '@emotion/styled';

export default styled((params) => {
    const url = cardUtil.pictureUrl(params);
    const size = cardUtil.pictureSize(params);

    return (
        <div
            className={cardUtil.joinClass(
                'card-element card-picture',
                params
            )}
            style={{
                backgroundImage: `url(${url})`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                height: `${size}mm`,
            }}
        ></div>
    );
})`
    height: 80px;
    line-height: 18px;
    margin-bottom: 0em;
`;
