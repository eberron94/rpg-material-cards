import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import selectors from '../../../selectors';
import { CardBack, CardEmpty, CardFront } from '../../card';
import { StyledTipButton } from '../css';

import { Page, PrintCardArea, PrintCardWrapper, PrintRow } from './css';

export default ({ iconMap }) => {
    const cards = useSelector(selectors.cardList);
    const options = useSelector((state) => state.options || null);
    const rowCount = options.page_rows;
    const colCount = options.page_columns;
    const isDouble = options.card_arrangement === 'doublesided';

    const pageSizeData = {
        width: parseFloat(useSelector(selectors.defaults.pageWidth)),
        height: parseFloat(useSelector(selectors.defaults.pageHeight)),
        unit: useSelector(selectors.defaults.pageSizeUnit),
    };

    const cardAreaData = {
        width: parseFloat(useSelector(selectors.defaults.pageWidth)) / colCount,
        height:
            parseFloat(useSelector(selectors.defaults.pageHeight)) / rowCount,
        unit: useSelector(selectors.defaults.pageSizeUnit),
        iconMap,
        options,
    };

    console.log(cards);

    const Blank = ({ ...props }) => (
        <SingleCard {...props} blank {...cardAreaData} cardData={{}} />
    );

    const pageListFront = pagify(
        cards.flatMap((cardData, i) =>
            Array(cardData.count || 1)
                .fill(0)
                .map((_, ii) => (
                    <SingleCard
                        key={'front-' + i + '.' + ii}
                        {...cardAreaData}
                        cardData={cardData}
                    />
                ))
        ),
        colCount,
        rowCount,
        Blank
    );

    const pageListBack = pagify(
        cards.flatMap((cardData, i) =>
            Array(cardData.count || 1)
                .fill(0)
                .map((_, ii) => (
                    <SingleCard
                        key={'back-' + i + '.' + ii}
                        back
                        {...cardAreaData}
                        cardData={cardData}
                    />
                ))
        ),
        colCount,
        rowCount,
        Blank
    );

    const collatedPages = [];
    pageListFront.forEach((front, index) => {
        const frontNum = index * (isDouble ? 2 : 1);
        const backNum = frontNum + 1;
        const frontPage = (
            <SinglePage
                key={'front' + index}
                pageNum={frontNum}
                rows={front}
                {...pageSizeData}
            />
        );
        const backPage = (
            <SinglePage
                key={'back' + index}
                back
                pageNum={backNum}
                rows={pageListBack[index]}
                {...pageSizeData}
            />
        );
        collatedPages.push(frontPage);

        if (isDouble) collatedPages.push(backPage);
    });

    return <div onLoad={window.print()}>{collatedPages}</div>;
};

const SinglePage = ({ rows, back, ...props }) => {
    return (
        <Page {...props}>
            {rows.map((row, i) => (
                <PrintRow key={i}>{back ? row.reverse() : row}</PrintRow>
            ))}
        </Page>
    );
};

const pagify = (cardList, xCount, yCount, Blank) => {
    const rows = rowify(cardList, xCount, Blank);
    const blankRow = Array(xCount)
        .fill(0)
        .map((_, i) => <Blank key={i} />);
    const pages = colify(rows, yCount, blankRow);

    return pages;
};

const rowify = (cardList, rowSize, Blank) => {
    const allRows = [];
    let tempRow = [];

    cardList.forEach((data) => {
        tempRow.push(data);
        if (tempRow.length === rowSize) {
            allRows.push(tempRow);
            tempRow = [];
        }
    });

    if (tempRow.length) {
        let i = 0;
        while (tempRow.length < rowSize) {
            tempRow.push(<Blank key={i++} />);
        }
        allRows.push(tempRow);
    }

    return allRows;
};

const colify = (rowList, colSize, blankRow) => {
    const allCols = [];
    let tempCol = [];

    rowList.forEach((data) => {
        tempCol.push(data);
        if (tempCol.length === colSize) {
            allCols.push(tempCol);
            tempCol = [];
        }
    });

    if (tempCol.length) {
        while (tempCol.length < colSize) {
            tempCol.push(blankRow);
        }
        allCols.push(tempCol);
    }

    return allCols;
};

const SingleCard = ({
    width,
    height,
    unit,
    iconMap,
    cardData,
    options,
    back,
    blank,
}) => {
    const scaledWrapper = useRef(null);
    const scaledContent = useRef(null);

    //Update scaling factor when card or window change
    useEffect(() => {
        if (scaledWrapper.current && scaledContent.current) {
            applyScaling(
                scaledWrapper.current,
                scaledContent.current,
                Boolean(options.shrink)
            );
        }
    }, [width, height, cardData, options]);

    const CardElement = blank ? CardEmpty : back ? CardBack : CardFront;

    return (
        <PrintCardWrapper>
            <PrintCardArea
                ref={scaledWrapper}
                width={width + unit}
                height={height + unit}
            >
                <CardElement
                    ref={scaledContent}
                    cardData={cardData}
                    options={options}
                    iconMap={iconMap}
                />
            </PrintCardArea>
        </PrintCardWrapper>
    );
};

const calcScaler = (content, wrapper) => {
    const { width: cw, height: ch } = content;
    const { width: ww, height: wh } = wrapper;
    const scaler = Math.min(ww / cw, wh / ch, 1);
    console.log('scaler', scaler, cw, ch, ww, wh);
    return scaler;
};

const applyScaling = (scaledWrapper, scaledContent, shrink) => {
    scaledContent.style.transform = 'translate(-50%, -50%) scale(1, 1)';

    let scaler = calcScaler(
        scaledContent.getBoundingClientRect(),
        scaledWrapper.getBoundingClientRect()
    );

    if (scaler < 1 && shrink) scaler = scaler * 0.99;

    scaledContent.style.transform = `translate(-50%, -50%) scale(${scaler}, ${scaler})`;
};
