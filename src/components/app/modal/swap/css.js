import styled from '@emotion/styled';
import {
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from '@mui/material';
import { DropzoneDialog } from 'material-ui-dropzone';
import { Children } from 'react';
import { Column, Row } from '../../css';

export const DeckDialogContent = styled(DialogContent)`
    overflow-y: auto !important;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-content: space-between;
    align-items: center;
    gap: 4px;
`;



export const DeckCard = styled.div`
    flex: 0 1 calc(25% - 24px);
    background-color: ${(e) => e.color};
    color: white;
    padding: 10px;

    // box-shadow: 0 0 0 4px ${(e) => (e.current ? 'black' : 'gray')} inset;

    width: 180px;
    height: 180px;

    display: flex;
    flex-flow: column nowrap;
    justify-content: space-around;
    align-content: space-around;
    align-items: center;
    gap: 4px;
`;

export const DeckInfo = styled.div`
    flex: ${(e) => e.flex || 1};
`;

export const DeckControlColumn = styled(Column)`
    label: deck-control-column;
    background-color: white;
    border-radius: 8px;
    color: black;
    text-align: center;
    min-height: 100px;
`;

export const DeckIcon = styled.img`
    height: 40px;
    width: 40px;
    object-fit: contain;
    transform: rotate(${(e) => e.rotation * 15}deg);
`;
