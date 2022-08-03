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
import {
    ColorGridContainer,
    ColorGridItem,
    ColorGridLabel,
    ColorGridRow,
    PickerButton,
    PickerLabel,
    PickerSwatch,
    StyledDialogTitle,
} from './css';

const colorIndex = [900, 800, 700, 600, 500, 400, 300, 200];

export default ({ value, defaultValue, onChange, disabled }) => {
    const [open, setOpen] = React.useState(false);

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const updateColor = (newColor) => {
        if (typeof onChange === 'function') onChange(newColor);
        handleClose();
    };

    return (
        <>
            <PickerButton
                onClick={handleClickOpen}
                variant='text'
                disabled={disabled}
            >
                <PickerSwatch
                    color={!value && defaultValue ? defaultValue : value}
                ></PickerSwatch>
                <PickerLabel>
                    {value === '' ? 'Default' : value || 'ERROR'}
                </PickerLabel>
            </PickerButton>
            <Dialog
                fullScreen={fullScreen}
                maxWidth={'lg'}
                fullWidth
                open={open}
                onClose={handleClose}
            >
                <StyledDialogTitle>
                    <span>Select a color</span>
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </StyledDialogTitle>
                <DialogContent dividers>
                    <ColorGridContainer>
                        {defaultValue ? (
                            <ColorRow
                                hue=''
                                onClick={updateColor}
                                defaultColor={defaultValue}
                            />
                        ) : null}
                        <ColorRow hue='black' onClick={updateColor} />
                        <ColorRow hue='grey' onClick={updateColor} />
                        <ColorRow hue='blueGrey' onClick={updateColor} />

                        <ColorRow hue='red' onClick={updateColor} />
                        <ColorRow hue='pink' onClick={updateColor} />
                        <ColorRow hue='purple' onClick={updateColor} />
                        <ColorRow hue='deepPurple' onClick={updateColor} />
                        <ColorRow hue='indigo' onClick={updateColor} />
                        <ColorRow hue='blue' onClick={updateColor} />
                        <ColorRow hue='lightBlue' onClick={updateColor} />
                        <ColorRow hue='cyan' onClick={updateColor} />
                        <ColorRow hue='teal' onClick={updateColor} />
                        <ColorRow hue='green' onClick={updateColor} />
                        <ColorRow hue='lightGreen' onClick={updateColor} />
                        <ColorRow hue='lime' onClick={updateColor} />
                        <ColorRow hue='yellow' onClick={updateColor} />
                        <ColorRow hue='amber' onClick={updateColor} />
                        <ColorRow hue='orange' onClick={updateColor} />
                        <ColorRow hue='deepOrange' onClick={updateColor} />
                        <ColorRow hue='brown' onClick={updateColor} />
                    </ColorGridContainer>
                </DialogContent>
            </Dialog>
        </>
    );
};

const ColorRow = ({ hue, ...props }) => {
    let colorGrid;
    if (hue === '') {
        colorGrid = <ColorItem color='' {...props} />;
    } else if (hue === 'black') {
        colorGrid = <ColorItem color='#000000' {...props} />;
    } else {
        colorGrid = colorIndex.map((shade, i) => (
            <ColorItem key={i} color={color[hue][shade]} {...props} />
        ));
    }
    return (
        <ColorGridRow>
            <ColorGridLabel>{getColorName(hue)}</ColorGridLabel>
            {colorGrid}
        </ColorGridRow>
    );
};

const ColorItem = ({ onClick, color, defaultColor, ...props }) => (
    <ColorGridItem
        {...props}
        color={!color && defaultColor ? defaultColor : color}
        onClick={typeof onClick === 'function' ? () => onClick(color) : null}
    >
        <span>A</span>
    </ColorGridItem>
);

const getColorName = (id) => {
    switch (id) {
        case 'common':
            return 'Black'.toUpperCase();
        case 'deepPurple':
            return 'Deep Purple'.toUpperCase();
        case 'lightBlue':
            return 'Light Blue'.toUpperCase();
        case 'lightGreen':
            return 'Light Green'.toUpperCase();
        case 'deepOrange':
            return 'Deep Orange'.toUpperCase();
        case 'blueGrey':
            return 'blue Grey'.toUpperCase();

        case '':
            return 'default'.toUpperCase();
        default:
            return String(id).toUpperCase();
    }
};
