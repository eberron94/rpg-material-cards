import CloseIcon from '@mui/icons-material/Close';
import {
    Dialog,
    DialogContent,
    IconButton,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import * as color from '@mui/material/colors';
import React from 'react';
import { StyledTipButton } from '../css';
import {
    ColorGridContainer,
    ColorGridItem,
    ColorGridLabel,
    ColorGridRow,
    PickerButton,
    PickerLabel,
    PickerSwatch,
    StyledDialogActions,
    StyledDialogContent,
    StyledDialogTitle,
} from './css';

export default ({
    title = 'Are you sure?',
    message = 'This action cannot be undone!',
    onConfirm,
    warning,
    ...props
}) => {
    const [open, setOpen] = React.useState(false);

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClickOpen = (e) => {
        if (e.ctrlKey || e.metaKey) onConfirm();
        else setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = () => {
        if (typeof onConfirm === 'function') onConfirm();

        handleClose();
    };

    return (
        <>
            <StyledTipButton
                onClick={handleClickOpen}
                variant='text'
                {...props}
            />
            <Dialog
                fullScreen={fullScreen}
                maxWidth={'sm'}
                fullWidth
                open={open}
                onClose={handleClose}
            >
                <StyledDialogTitle>
                    <span>{title}</span>
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </StyledDialogTitle>
                <StyledDialogContent dividers>{message}</StyledDialogContent>
                <StyledDialogActions>
                    <StyledTipButton
                        variant='contained'
                        color={warning ? 'error' : 'primary'}
                        onClick={handleConfirm}
                    >
                        Yes
                    </StyledTipButton>
                    <StyledTipButton onClick={handleClose}>No</StyledTipButton>
                </StyledDialogActions>
            </Dialog>
        </>
    );
};
