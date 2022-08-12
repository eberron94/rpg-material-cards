import ClearAllIcon from '@mui/icons-material/ClearAll';
import DeleteIcon from '@mui/icons-material/Delete';
import HelpIcon from '@mui/icons-material/Help';
import InfoIcon from '@mui/icons-material/Info';
import PrintIcon from '@mui/icons-material/Print';
import React from 'react';
import { useSelector } from 'react-redux';
import { initialState, sampleDeck } from '../../../data/model';
import selectors from '../../../selectors';
import {
    Column,
    Row,
    StyledTipButton as Button,
    StyledTipButton,
} from '../css';
import { CardFileLoad, ConfirmDialog, PasteCardLoad, SwapDeck } from '../modal';

export default ({ dispatch, iconMap }) => {
    const state = useSelector(selectors.state);

    const sampleProps = {
        tooltip: `Add sample cards to the deck.`,
        title: 'Are you sure you want to add the sample cards?',
        message:
            'This will add all the sample cards to the current deck. You can delete them later.\nThe sample cards explain how each content line works.',
        onConfirm: () => dispatch.deck.addCardsFromData(sampleDeck().cards),
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

    return (
        <Column>
            <Row>
                <StyledTipButton variant='outlined' disabled>
                    <HelpIcon />
                    Help
                </StyledTipButton>
                <ConfirmDialog variant='outlined' {...sampleProps}>
                    <InfoIcon /> Sample
                </ConfirmDialog>
                <SwapDeck dispatch={dispatch} iconMap={iconMap} />
            </Row>
            <Row>
                <PasteCardLoad dispatch={dispatch} />
                <CardFileLoad dispatch={dispatch} />
            </Row>
            <Row>
                <ConfirmDialog
                    variant='contained'
                    color='secondary'
                    {...deleteAllProps}
                >
                    <DeleteIcon />
                    Delete All Cards
                </ConfirmDialog>
                <ConfirmDialog
                    variant='contained'
                    color='secondary'
                    {...resetOptionProps}
                >
                    <ClearAllIcon />
                    Clear Settings
                </ConfirmDialog>
            </Row>
            <Button variant='contained' href='/print'>
                <PrintIcon />
                Generate Pages
            </Button>
        </Column>
    );
};
