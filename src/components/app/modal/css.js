import styled from '@emotion/styled';
import {
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from '@mui/material';
import { DropzoneDialog } from 'material-ui-dropzone';

export const PickerButton = styled(Button)`
    display: flex;
    justify-content: flex-start !important;
    gap: 8px;

    width: 100%;
    opacity: ${(e) => (e.disabled ? '38%' : '100%')};
`;

export const PickerSwatch = styled.div`
    height: 24px;
    width: 24px;

    background-color: ${(e) => e.color || 'black'};
    padding: 2px;

    img {
        height: 24px;
        width: 24px;
        object-fit: contain;
        transform: rotate(${(e) => e.rotation * 15}deg);
    }

    img[src=''] {
        display: none;
    }
`;

export const PickerLabel = styled.span`
    color: black;
`;

export const IconSearchField = styled(TextField)`
    width: 100%;
`;

export const IconGridContainer = styled.div`
    width: 100%;

    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    gap: 10px;
`;

export const IconGridEmpty = styled.div`
    min-width: 120px;
    width: 120px;

    min-height: 150px;

    flex-grow: 0;

    border: none;
`;

export const IconGridItem = styled.div`
    min-width: 120px;
    width: 120px;

    flex-grow: 0;

    border: 2px solid black;
    border-radius: 6px;

    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    align-items: stretch;

    cursor: pointer;
`;

export const IconGridImage = styled.div`
    min-height: 120px;

    flex: 1;

    background-color: ${(e) => e.color || 'black'};
    cursor: inherit;

    img {
        max-height: 120px;
        object-fit: contain;
        transform: rotate(${(e) => e.rotation * 15}deg);
        cursor: inherit;
    }

    img[src=''] {
        display: none;
    }
`;

export const IconGridLabel = styled.div`
    height: 36px;
    // flex: 1;
    flex-shrink: 0;

    text-align: center;
    // font-size: large;
    cursor: inherit;
`;

export const ColorGridContainer = styled.div`
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    gap: 10px;
`;

export const ColorGridRow = styled.div`
    display: flex;
    align-items: center;
    flex-flow: row nowrap;
`;

export const ColorGridLabel = styled.div`
    min-width: 90px;
    max-width: 90px;
    // flex: 1;
`;

export const ColorGridItem = styled.div`
    min-height: 30px;
    min-width: 30px;

    display: flex;
    justify-content: center;
    align-items: center;

    flex: 1;

    background-color: ${(e) => e.color || 'black'};
    border: 4px solid white;

    cursor: pointer;

    :hover {
        border: 4px solid ${(e) => e.color || 'black'};
    }

    span {
        color: ${(e) => e.fontColor || 'white'};
        opacity: 0.75;
    }
`;

export const StyledDialogActions = styled(DialogActions)`
    display: flex;
    justify-content: space-between;
`;

export const StyledDialogTitle = styled(DialogTitle)`
    display: flex;
    justify-content: space-between;
`;

export const StyledDialogContent = styled(DialogContent)`
    overflow: hidden;
    overflow-y: auto !important;
    white-space: pre-line;
`;

export const RotationControls = styled.div``;

export const PageSizeSelect = styled.select`
    width: 20px;
    text-align: right;
    margin-right: 4px;
    border: none;
    border-bottom: 1px solid black;
    appearance: none;
`;

export const FullTextArea = styled.textarea`
    width: 100%;
    height: 100%;
    min-height: 300px;
    resize: none;
`;
