import StyleIcon from '@mui/icons-material/Style';
import { useMediaQuery, useTheme } from '@mui/material';
import { DropzoneDialog } from 'material-ui-dropzone';
import React from 'react';
import { StyledTipButton } from '../css';
import { handleNewData } from './util/loadHelper';

export default ({ dispatch }) => {
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
                    newFile
                        .text()
                        .then(
                            handleNewData(
                                dispatch,
                                newFile?.name,
                                `Could not load file or failed to parse its contents. Make sure the file is a proper json file. It should contain a single card object; an array of card objects; or an object with a "cards" field, which has an array of card objects. A card object must contain a "title", which is a string, and a "contents" array, which only contains strings.`
                            )
                        )
                )
            ).finally(() => {
                handleClose();
            });
        }
    };

    return (
        <>
            <StyledTipButton
                variant='contained'
                onClick={handleClickOpen}
                tooltip={`Add more cards by loading json files.`}
            >
                Upload file
            </StyledTipButton>
            <DropzoneDialog
                fullScreen={fullScreen}
                maxWidth={'lg'}
                fullWidth
                acceptedFiles={['application/json']}
                cancelButtonText={'cancel'}
                submitButtonText={'submit'}
                previewText={'Files'}
                maxFileSize={5000000}
                open={open}
                onClose={handleClose}
                onSave={handleFiles}
                showPreviews={true}
                showFileNamesInPreview={true}
                Icon={StyleIcon}
            />
            {/* <Dialog
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
                    <DropzoneArea
                        Icon={StyleIcon}
                        showPreviewsInDropzone={false}
                        acceptedFiles={['application/json']}
                        dropzoneText={'Drag and drop card files here or click'}
                        filesLimit={10}
                        onChange={handleFiles}
                    />
                </StyledDialogContent>
            </Dialog> */}
        </>
    );
};
