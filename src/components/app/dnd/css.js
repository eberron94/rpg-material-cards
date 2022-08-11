import styled from '@emotion/styled';
import { DialogActions, DialogContent, DialogTitle } from '@mui/material';

export const StyledDialogTitle = styled(DialogTitle)`
    display: flex;
    justify-content: space-between;
`;

export const StyledDialogContent = styled(DialogContent)`
    overflow: hidden;
    overflow-y: auto !important;
`;

export const StyledDialogActions = styled(DialogActions)`
    display: flex;
    justify-content: space-around;
    gap: 10px;
`;

export const DragAreaContainer = styled.div`
    background-color: ${(e) => (e.dragging === 'true' ? '#90caf9' : '')};
    padding: 20px;
`;

export const ItemDragContainer = styled.div`
    background-color: ${(e) => e.color || 'black'};
    color: white;
    userselect: none;
    padding: 16px;
    margin: 0 0 8px 0;
    border-radius: 4px;
    border: ${(e) => (e.dragging === 'true' ? 'dashed white' : 'solid gray')}
        4px;
    user-select: none;

    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const ItemDrag = styled.div`
    background-color: ${(e) => e.color || 'black'};
    color: white;
    userselect: none;

    margin: 0 0 8px 0;
    border-radius: 4px;
    border: ${(e) => (e.dragging === 'true' ? 'dashed white' : 'solid gray')}
        4px;
    user-select: none;

    display: flex;
    justify-content: space-between;
    align-items: center;

    font-size: 32px;

    span {
        padding: 16px;
        flex: 4;
    }

    img {
        flex: 1;
        height: 40px;
        width: 40px;
        object-fit: contain;
        transform: rotate(${(e) => e.rotation * 15}deg);
    }

    img[src=''] {
        display: none;
    }
`;

export const ItemDragControl = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: space-between;
    flex-flow: row nowrap;

    padding-right: 16px;

    svg {
        color: white;
    }

    button {
        flex: 1;
        flex-grow: 50%;
        padding: 0;
    }
`;

