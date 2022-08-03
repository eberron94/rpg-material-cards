import {
    Dialog,
    DialogContent,
    IconButton,
    TextField,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import React from 'react';
import { StyledTipButton } from '../css';
import {
    FullTextArea,
    StyledDialogActions,
    StyledDialogContent,
    StyledDialogTitle,
} from './css';
import CloseIcon from '@mui/icons-material/Close';
import { isValidCard } from '../../../util/dataUtil';

export default ({ dispatch }) => {
    const [open, setOpen] = React.useState(false);
    const [json, setJson] = React.useState('');
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleLoad = () => {
        try {
            const data = JSON.parse(json);

            // handle array of cards
            if (Array.isArray(data)) {
                dispatch.deck.addCardsFromData(data.filter(isValidCard));
                setOpen(false);
                return;
            }

            // handle single card
            if (typeof data === 'object' && isValidCard(data)) {
                dispatch.deck.addCardsFromData(data);
                setOpen(false);
                return;
            }

            // handle full object
            if (typeof data === 'object' && Array.isArray(data.cards)) {
                dispatch.deck.addCardsFromData(data.cards.filter(isValidCard));
                setOpen(false);
                return;
            }

            alert(
                'Invalid JSON. Pasted text should be a single card object; an array of card objects; or an object with a "cards" field, which has an array of card objects. A card object must contain a "title", which is a string, and a "contents" array, which only contains strings'
            );
        } catch (err) {
            alert('JSON could not be parsed');
            console.error(err);
        }
    };

    return (
        <>
            <StyledTipButton
                variant='contained'
                onClick={handleClickOpen}
                tooltip={`Add more cards by pasting in a json block.`}
            >
                Paste Cards
            </StyledTipButton>
            <Dialog
                fullScreen={fullScreen}
                maxWidth={'lg'}
                fullWidth
                open={open}
                onClose={handleClose}
            >
                <StyledDialogTitle>
                    <span>Paste Card JSON</span>
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </StyledDialogTitle>
                <StyledDialogContent dividers>
                    <FullTextArea
                        onChange={(e) => setJson(e.target.value)}
                        onFocus={(e) => e.target.select()}
                    />
                </StyledDialogContent>
                <StyledDialogActions>
                    <StyledTipButton onClick={handleLoad}>Load</StyledTipButton>
                </StyledDialogActions>
            </Dialog>
        </>
    );
};
