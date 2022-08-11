import React from 'react';
import { useSelector } from 'react-redux';
import selectors from '../../../selectors';
import { AppContainer } from '../css';
import ControlCard from './controlCard';
import ControlDeck from './controlDeck';

export default (props) => {
    const cardId = useSelector(selectors.card.id);
    return (
        <AppContainer>
            <ControlDeck cardId={cardId} {...props} />
            <ControlCard cardId={cardId} {...props} />
        </AppContainer>
    );
};
