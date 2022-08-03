import styled from '@emotion/styled';

const sized =
    (num, unit) =>
    ({ cardStyle = { scale: 1, sizeUnit: 'mm' } }) => {
        const val = num * (cardStyle.scale || 1) + (unit || cardStyle.sizeUnit);
        return val;
    };

export const BoxContainer = styled.div`
    display: flex;
    flex-flow: row wrap;
    gap: ${sized(3, 'px')} ${sized(3, 'px')};
`;

export const BoxSVG = styled.svg`
    height: ${(e) => e.size};
    width: ${(e) => e.size};
`;

export const D20Table = styled.table``;

export const D20Score = styled.td`
    text-align: center;
`;

export const DescriptionContainer = styled.div`
    margin-top: ${sized(5, 'px')};
    margin-bottom: 0em;
    font-size: inherit;
    color: black;
`;

export const DescriptionName = styled.h4`
    display: inline;
    font-size: inherit;
    font-style: italic;

    ::after {
        content: '. ';
    }
`;

export const Fill = styled.span`
    flex: ${(e) => e.flex};
`;

export const IconInlineContainer = styled.div`
    display: flex;
    justify-content: ${(e) => e.display};
`;

export const IconInline = styled.div`
    height: ${(e) => e.size};
    min-height: ${(e) => e.size};
    width: ${(e) => e.size};
    background-color: ${(e) => e.color};
    background-size: auto 80%;
    background-repeat: no-repeat;
    background-position: center center;
    position: relative;
    border-radius: ${(e) => e.rounded};
`;

export const BulletListContainer = styled.ul`
    font-size: inherit;
    color: black;
    padding-left: ${sized(16, 'px')};
    padding-bottom: 0;
    margin-bottom: 0;
    margin-top: 0;
`;

export const CheckListContainer = styled(BulletListContainer)`
    list-style: none;

    li:before {
        content: '☐';
        position: absolute;
        top: 50%;
        left: ${sized(-6, 'px')};
        -webkit-transform: translate(-100%, -50%);
        -ms-transform: translate(-100%, -50%);
        transform: translate(-100%, -50%);
    }
`;

export const ListItem = styled.li`
    margin-bottom: 0;
    margin-top: 0;
    font-size: inherit;
    line-height: normal;
    position: relative;
`;

export const PropertyContainer = styled.div`
    text-indent: ${sized(-5, 'px')};
    margin-left: ${sized(5, 'px')};
    margin-right: ${sized(10, 'px')};
    font-size: inherit;
    color: black;
    display: flex;
    gap: ${sized(3)};
`;

export const PropertyFlex = styled.div`
    flex-grow: 1;
    flex-basis: 50%;
`;

export const PropertyName = styled.h4`
    display: inline;
    font-size: inherit;

    ::after {
        content: ' ';
    }
`;

export const PFTraitContainer = styled.div`
    margin-bottom: ${sized(2, 'px')};

    .card-pftrait-uncommon {
        background-color: #c45500;
    }

    .card-pftrait-rare {
        background-color: #0c1466;
    }

    .card-pftrait-unique {
        background-color: #800080;
    }
`;

export const PFTrait = styled.span`
    border-color: #d8c483;
    border-style: double;
    border-width: ${sized(2, 'px')};
    color: white;
    font-style: normal;
    font-variant: small-caps;
    text-transform: uppercase;
    font-weight: bold;
    padding-right: ${sized(5, 'px')};
    padding-left: ${sized(5, 'px')};
    text-align: left;
    text-indent: 0em;
    display: inline-block;
    margin: 0;
    background-color: #522e2c;
    line-height: ${sized(10, 'px')};
`;

export const Ruler = styled.svg`
    width: 100%;
    height: ${sized(0.5, 'mm')};
    margin-top: ${sized(1, 'mm')};
    margin-bottom: ${sized(1, 'mm')};
`;

export const Section = styled.h3`
    border-bottom: ${sized(1, 'px')} solid;
    font-variant: small-caps;
    font-weight: normal;
    margin: 0;
    margin-bottom: ${sized(1, 'mm')};

    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: flex-end;
`;

export const SectionText = styled.span`
    color: ${({ cardStyle }) => cardStyle.color};
    // font-size: ${(e) => e.fontSize};
`;

export const Subtitle = styled.div`
    height: ${sized(18, 'px')};
    margin: 0;
    line-height: ${sized(18, 'px')};
    font-family: 'Noto Sans', 'Myriad Pro', Calibri, Helvetica, Arial,
        sans-serif;
    font-style: italic;
`;

export const TextContainer = styled.div`
    margin-top: 0.5em;
    margin-bottom: 0em;
    font-size: inherit;
    color: black;
    text-align: ${(e) => e.textAlign};
    hyphens: ${(e) => e.hyphens};
`;

export const Text = styled.p`
    display: inline;
`;
