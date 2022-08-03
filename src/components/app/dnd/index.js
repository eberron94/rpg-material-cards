import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    Button,
    ButtonGroup,
    Dialog,
    IconButton,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import cardUtil from '../../../util/cardUtil';
import {
    DragAreaContainer,
    ItemDrag,
    ItemDragContainer,
    ItemDragControl,
    StyledDialogActions,
    StyledDialogContent,
    StyledDialogTitle,
} from './css';

export default (props) => {
    const { setOrder, deck, disabled } = props;
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSort = (sortMethod) => () => {
        if (typeof setOrder === 'function' && Array.isArray(deck))
            setOrder(deck.sort(sortMethod));
    };

    return (
        <>
            <Button variant='outlined' onClick={handleClickOpen} disabled={disabled}>
                Organize cards
            </Button>
            <Dialog
                fullScreen={fullScreen}
                maxWidth={'lg'}
                fullWidth
                open={open}
                onClose={handleClose}
            >
                <StyledDialogTitle>
                    <span>Drag cards to order them</span>
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </StyledDialogTitle>
                <StyledDialogContent>
                    You can also use the sorting buttons below.
                </StyledDialogContent>
                <StyledDialogContent dividers>
                    <DND {...props} />
                </StyledDialogContent>
                <StyledDialogActions>
                    <ButtonGroup>
                        <Button onClick={handleSort(sortByName(false))}>
                            Sort by Title
                        </Button>
                        <Button onClick={handleSort(sortByName(true))}>
                            Reverse Title
                        </Button>
                    </ButtonGroup>
                    <ButtonGroup>
                        <Button onClick={handleSort(sortByIcon(false))}>
                            Sort by Icon
                        </Button>
                        <Button onClick={handleSort(sortByIcon(true))}>
                            Reverse Icon
                        </Button>
                    </ButtonGroup>
                    <ButtonGroup>
                        <Button onClick={handleSort(sortByColor(false))}>
                            Sort by Color
                        </Button>
                        <Button onClick={handleSort(sortByColor(true))}>
                            Reverse Color
                        </Button>
                    </ButtonGroup>
                </StyledDialogActions>
            </Dialog>
        </>
    );
};

const sortByName =
    (invert = false) =>
    (a, b) => {
        const aa = String(a?.title || ''),
            bb = String(b?.title || '');
        return (
            (invert ? -1 : 1) *
            aa.localeCompare(bb, undefined, {
                numeric: true,
                sensitivity: 'base',
            })
        );
    };

const sortByIcon =
    (invert = false) =>
    (a, b) => {
        const aa = String(a?.icon_front || a?.icon_back || ''),
            bb = String(b?.icon_front || b?.icon_back || '');
        return (
            (invert ? -1 : 1) *
            aa.localeCompare(bb, undefined, {
                numeric: true,
                sensitivity: 'base',
            })
        );
    };

const sortByColor =
    (invert = false) =>
    (a, b) => {
        const aa = String(a?.color || ''),
            bb = String(b?.color || '');
        return (invert ? -1 : 1) * aa.localeCompare(bb);
    };

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const DND = ({
    iconMap,
    deck,
    options,
    setOrder,
    deleteCard,
    duplicateCard,
}) => {
    const onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const temp = reorder(
            deck,
            result.source.index,
            result.destination.index
        );

        if (typeof setOrder === 'function') setOrder(temp);
        else console.log('setOrder is incorrect', setOrder);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd} style={{ overflow: 'scroll-x' }}>
            <Droppable droppableId='droppable'>
                {(provided, snapshot) => (
                    <DragAreaContainer
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        dragging={Boolean(snapshot.isDraggingOver).toString()}
                    >
                        {deck.map((cardData, index) => {
                            const packedData = {
                                cardData,
                                options,
                                iconMap,
                            };
                            const { path } = cardUtil.iconFront(packedData);
                            const color = cardUtil.colorFront(packedData);

                            return (
                                <Draggable
                                    key={cardData._idv4}
                                    draggableId={cardData._idv4}
                                    index={index}
                                >
                                    {(provided, snapshot) => (
                                        <ItemDrag
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            dragging={Boolean(
                                                snapshot.isDragging
                                            ).toString()}
                                            color={color}
                                        >
                                            <span>{cardData.title}</span>

                                            <img src={path || ''} />
                                            <ItemDragControl>
                                                <IconButton>
                                                    <DeleteIcon
                                                        onClick={() =>
                                                            deleteCard(
                                                                cardData._idv4
                                                            )
                                                        }
                                                    />
                                                </IconButton>
                                                <IconButton>
                                                    <ContentCopyIcon
                                                        onClick={() =>
                                                            duplicateCard(
                                                                cardData._idv4
                                                            )
                                                        }
                                                    />
                                                </IconButton>
                                            </ItemDragControl>
                                        </ItemDrag>
                                    )}
                                </Draggable>
                            );
                        })}
                        {provided.placeholder}
                    </DragAreaContainer>
                )}
            </Droppable>
        </DragDropContext>
    );
};
