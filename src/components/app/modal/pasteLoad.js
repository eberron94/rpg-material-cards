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
import { handleNewData } from './util/loadHelper';

export default ({ dispatch }) => {
    const [open, setOpen] = React.useState(false);
    const [json, setJson] = React.useState('');
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));

    const handleClickOpen = () => {
        setJson('');
        setOpen(true);
    };

    const handleClose = () => {
        setJson('');
        setOpen(false);
    };

    const handleLoad = () => {
        handleNewData(
            dispatch,
            json,
            'Invalid JSON. Pasted text should be a single card object; an array of card objects; or an object with a "cards" field, which has an array of card objects. A card object must contain a "title", which is a string, and a "contents" array, which only contains strings.'
        )(json);
        handleClose();
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
