import { saveAs } from 'file-saver';
import React from 'react';
import { useSelector } from 'react-redux';
import { initialState } from '../../../data/model';
import selectors from '../../../selectors';
import { jsonifyDeck } from '../../../util/dataUtil';
import { Column, Row, StyledTipButton as Button } from '../css';
import { CardFileLoad, ConfirmDialog, PasteCardLoad, SwapDeck } from '../modal';

export default ({ dispatch, iconMap }) => {
    const state = useSelector(selectors.state);

    const sampleProps = {
        title: 'Are you sure you want to add the sample cards?',
        message:
            'This will add all the sample cards to the current deck. You can delete them later.',
        onConfirm: () => dispatch.deck.addCardsFromData(initialState().cards),
    };

    const deleteAllProps = {
        title: 'Are you sure you want to delete all cards?',
        message:
            'This action cannot be undone. All cards will be removed from current deck.',
        warning: true,
        onConfirm: () => dispatch.deck.deleteAll(),
    };

    const resetOptionProps = {
        title: 'Are you sure you want to reset print size, card size, and default values?',
        message: `This action cannot be undone.
            All settings for printing, card size, and default values will be reset.`,
        warning: true,
        onConfirm: () => dispatch.deck.resetOptions(),
    };

    const saveProps = {
        onClick: (e) => {
            let fileName = 'rpg-material';

            const file = new Blob([jsonifyDeck(state, 4)], {
                type: 'application/json;charset=utf-8',
            });

            saveAs(file, fileName);
        },
    };

    return (
        <Column>
            <Row>
                <Button variant='outlined'>Open Help</Button>
                <ConfirmDialog variant='outlined' {...sampleProps}>
                    Load Sample
                </ConfirmDialog>
                <SwapDeck dispatch={dispatch} iconMap={iconMap} />
            </Row>
            <Row>
                <PasteCardLoad dispatch={dispatch} />
                <CardFileLoad dispatch={dispatch} />

                <Button variant='contained' {...saveProps}>
                    Save Deck
                </Button>
            </Row>
            <Row>
                <ConfirmDialog
                    variant='contained'
                    color='secondary'
                    {...deleteAllProps}
                >
                    Delete All Cards
                </ConfirmDialog>
                <ConfirmDialog
                    variant='contained'
                    color='secondary'
                    {...resetOptionProps}
                >
                    Reset Default and Printing
                </ConfirmDialog>
            </Row>
            <Button variant='contained' href='/print'>
                Generate Pages to Print
            </Button>
        </Column>
    );
};
