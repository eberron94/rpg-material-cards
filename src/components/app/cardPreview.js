import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import selectors from '../../selectors';
import { CardBack, CardFront } from '../card';
import {
    CardPageButton,
    MissingData,
    PreivewWrapper,
    PreviewArea,
    TogglePreview,
} from './css';

export default ({ iconMap, dispatch }) => {
    const cardData = useSelector(selectors.cardData);
    const options = useSelector((state) => state.options || null);
    const [width, setWidth] = useState(getWidth());
    const [viewBack, setViewBack] = useState(false);
    const scaledWrapper = useRef(null);
    const scaledContent = useRef(null);
    const CardElement = viewBack ? CardBack : CardFront;

    const disabled = !cardData || !options;

    useEffect(widthListenerEffect(setWidth), []);

    //Update scaling factor when card or window change
    useEffect(() => {
        if (scaledWrapper.current && scaledContent.current) {
            applyScaling(scaledWrapper.current, scaledContent.current);
        }
    }, [width, viewBack, cardData, options]);

    const previewControls = (
        <TogglePreview>
            <CardPageButton
                variant='outlined'
                flex={3}
                onClick={() => {
                    dispatch.deck.previousCard();
                    setViewBack(false);
                }}
                disabled={disabled}
            >
                Previous
            </CardPageButton>
            <CardPageButton
                variant='contained'
                color='primary'
                onClick={() => setViewBack(!viewBack)}
                flex={3}
                disabled={disabled}
            >
                View card {!viewBack ? 'back' : 'front'}
            </CardPageButton>
            <CardPageButton
                variant='outlined'
                flex={3}
                onClick={() => {
                    dispatch.deck.nextCard();
                    setViewBack(false);
                }}
                disabled={disabled}
            >
                Next
            </CardPageButton>
        </TogglePreview>
    );

    return (
        <PreivewWrapper>
            {previewControls}
            <PreviewArea ref={scaledWrapper}>
                {cardData && options ? (
                    <CardElement
                        ref={scaledContent}
                        cardData={cardData}
                        options={options}
                        iconMap={iconMap}
                    />
                ) : (
                    <MissingData ref={scaledContent}>
                        <span>No Card Data</span>
                    </MissingData>
                )}
            </PreviewArea>
            {previewControls}
        </PreivewWrapper>
    );
};

const widthListenerEffect = (setWidth) => () => {
    //Change `width` state when window changes size. Used to trigger rescaling preview area

    // timeoutId for debounce mechanism
    let timeoutId = null;
    const resizeListener = () => {
        // prevent execution of previous setTimeout
        clearTimeout(timeoutId);
        // change width from the state object after 50 milliseconds
        timeoutId = setTimeout(() => setWidth(getWidth()), 50);
    };
    // set resize listener
    window.addEventListener('resize', resizeListener);

    // clean up function
    return () => {
        window.removeEventListener('resize', resizeListener);
    };
};

const applyScaling = (scaledWrapper, scaledContent) => {
    scaledContent.style.transform = 'translate(-50%, -50%) scale(1, 1)';

    const { width: cw, height: ch } = scaledContent.getBoundingClientRect();
    const { width: ww, height: wh } = scaledWrapper.getBoundingClientRect();
    const scaler = Math.min(ww / cw, wh / ch) * 0.99;

    scaledContent.style.transform = `translate(-50%, -50%) scale(${scaler}, ${scaler})`;
};

const getWidth = () =>
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
