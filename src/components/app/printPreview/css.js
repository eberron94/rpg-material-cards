import styled from '@emotion/styled';

export const Page = styled.div`
    page-break-after: always;
    break-after: always;
    margin: 0 auto;

    position: absolute;
    top: ${(e) => (e.pageNum || 0) * 100}%;
    left: 0;

    height: ${(e) => e.height + e.unit || 0};
    width: ${(e) => e.width + e.unit || 0};

    max-height: ${(e) => e.height + e.unit || 0};
    max-width: ${(e) => e.width + e.unit || 0};

    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;

    @media screen {
        border: dashed 8px rgba(255,0,0,0.5);
        top: ${(e) => (e.pageNum || 0) * e.height * 1.05 + e.unit};
    }
`;

export const PrintRow = styled.div`
    label: print-card-row;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    flex: ${(e) => e.flex || 0};
`;

export const PrintCardWrapper = styled.div`
    label: print-card-wrapper;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
`;

export const PrintCardArea = styled.div`
    label: print-card-area;
    padding: ${(e) => e.padding || 0}px;
    resize: both;
    position: relative;

    max-height: ${(e) => e.height || 0};
    max-width: ${(e) => e.width || 0};

    user-select: none;
`;

export const BlankCard = styled.div`
    label: blank-card;

    background-color: gray;
    height: ${(e) => e.height || 0};
    width: ${(e) => e.width || 0};
`;
