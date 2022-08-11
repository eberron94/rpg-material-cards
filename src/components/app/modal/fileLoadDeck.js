import FileUploadIcon from '@mui/icons-material/FileUpload';
import StyleIcon from '@mui/icons-material/Style';
import { useMediaQuery, useTheme } from '@mui/material';
import { DropzoneDialog } from 'material-ui-dropzone';
import React from 'react';
import { StyledTipButton } from '../css';

export default ({ onLoad }) => {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleFiles = (newFiles) => {
        if (Array.isArray(newFiles) && newFiles.length > 0) {
            Promise.allSettled(
                newFiles.map((newFile) =>
                    newFile.text().then((rawData) => {
                        try {
                            const data = JSON.parse(rawData);
                            if (
                                typeof data === 'object' &&
                                Array.isArray(data.cards) &&
                                typeof data.options === 'object'
                            )
                                onLoad(data);
                        } catch (err) {
                            console.error(err);
                        }
                    })
                )
            ).finally(() => {
                handleClose();
            });
        }
    };

    let openButton = (
        <StyledTipButton
            onClick={handleClickOpen}
            tooltip={`Add a deck from a json file.`}
        >
            <FileUploadIcon /> Upload deck
        </StyledTipButton>
    );

    return (
        <>
            {openButton}
            <DropzoneDialog
                fullScreen={fullScreen}
                maxWidth={'lg'}
                fullWidth
                filesLimit={1}
                acceptedFiles={['application/json']}
                cancelButtonText={'cancel'}
                submitButtonText={'submit'}
                previewText={'Deck'}
                maxFileSize={5000000}
                open={open}
                onClose={handleClose}
                onSave={handleFiles}
                showPreviews={true}
                showFileNamesInPreview={true}
                Icon={StyleIcon}
            />
        </>
    );
};
