import styled from '@emotion/styled';

const borderStyle = ({ cardStyle }) => cardStyle.borderStyle;
const borderWidth = ({ cardStyle }) =>
    cardStyle.scale * cardStyle.borderWidth + cardStyle.sizeUnit;
const borderWidthTop = ({ cardStyle }) =>
    cardStyle.borderWidth / 2 + cardStyle.sizeUnit;
const borderColor = ({ cardStyle }) => cardStyle.borderColor;

const color = ({ cardStyle }) => cardStyle.color;
const backgroundColor = ({ cardStyle }) => cardStyle.backgroundColor;

const width = ({ cardStyle }) => cardStyle.width;
const height = ({ cardStyle }) => cardStyle.height;
const display = ({ cardStyle }) => (cardStyle.hidden ? 'none' : 'flex');

const fontSize = ({ cardStyle }) => cardStyle.fontSize + 'pt';

const sized =
    (num, unit) =>
    ({ cardStyle = { scale: 1, sizeUnit: 'mm' } }) => {
        return num * (cardStyle.scale || 1) + (unit || cardStyle.sizeUnit);
    };

export const Card = styled('div')`
    label: card;
    box-sizing: border-box;
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    transform-origin: center center;

    display: flex;
    flex-direction: column;
    font-family: 'Noto Sans', 'Myriad Pro', Calibri, Helvetica, Arial,
        sans-serif;
    overflow: hidden;

    border-style: ${borderStyle};
    border-width: ${borderWidth};
    border-color: ${borderColor};
    border-top-width: ${borderWidthTop};

    color: ${color};
    background-color: ${backgroundColor};

    width: ${width};
    height: ${height};
    display: ${display};

    font-size: ${fontSize};
`;

export const CardBack = styled('div')`
    label: card-back;
    background-color: white;
    border-radius: ${sized(4)};
    border-color: inherit;
    margin: ${sized(3)};
    flex: 1;
    display: flex;
`;

export const CardBackIconContainer = styled('div')`
    label: card-back-icon-container;
    margin: ${sized(3)};
    border: ${sized(1)} solid;
    border-color: inherit;
    border-radius: ${sized(4)};
    flex: 1;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`;

export const CardFrontContentContainer = styled('div')`
    padding: ${sized(2)};
    padding-top: ${sized(1)};
    border-radius: ${sized(2)};
    margin-top: 0px;
    background-color: white;
    border-color: inherit;
    display: flex;
    flex-direction: column;
    flex: 1;
    font-size: inherit;
`;

export const IconFront = styled.div`
    // padding: 0 1mm;
    position: relative;
    width: ${sized(5)};
    height: ${sized(5)};

    img {
        width: ${sized(5)};
        height: ${sized(5)};
    }
`;

export const IconBack = styled.div`
    width: ${sized(24)};
    height: ${sized(24)};
    background-repeat: no-repeat;
    background-size: contain;
    -webkit-filter: invert(1);
    filter: invert(1);

    img {
        width: ${sized(24)};
        height: ${sized(24)};
    }

    .qr-code {
        -webkit-filter: invert(0);
        filter: invert(0);
    }
`;

export const Title = styled.div`
    // padding-left: ${sized(2)};
    font-family: Lora, 'Calisto MT', 'Bookman Old Style', Bookman,
        'Goudy Old Style', Garamond, 'Hoefler Text', 'Bitstream Charter',
        Georgia, serif;
    font-variant: small-caps;
    font-weight: bold;
    background-color: inherit;
    color: white;

    padding: ${sized(1)} 0;

    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: flex-end;

    font-size: ${(e) => e.fontSize}pt;

    .card-pfaction {
        filter: invert(1);
    }

    .card-title-name {
        flex-grow: 10;
        padding-left: ${sized(2)};
    }

    .card-title-code {
        padding-left: ${sized(2)};
        font-size: 8pt;
    }
`;

export const Table = styled('table')`
    width: 100%;
    border: ${sized(2, 'px')} solid;
    border-spacing: 0;
    -webkit-border-horizontal-spacing: 0px;
    -webkit-border-vertical-spacing: 0px;
    border-collapse: collapse;

    .card-table-header {
        text-align: center;
        padding: 0;
        font-weight: 900;
    }

    .card-table-row {
        text-align: center;
        padding: 0;
    }

    .card-table-cell {
        color: black;
        text-align: center;
        padding: 0;
        border: 0;
        border-bottom: ${sized(1, 'px')} solid;
    }
`;
