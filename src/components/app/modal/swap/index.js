import {
    Dialog,
    DialogContent,
    Divider,
    IconButton,
    TextField,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import React from 'react';
import { Column, Row, StyledTipButton } from '../../css';
import {
    FullTextArea,
    StyledDialogActions,
    StyledDialogContent,
    StyledDialogTitle,
} from '../css';
import CloseIcon from '@mui/icons-material/Close';
import {
    isValidCard,
    jsonifyDeck,
    loadStorage,
    minifyDeck,
    saveStorage,
} from '../../../../util/dataUtil';
import { handleNewData } from '../util/loadHelper';
import { duplicateDeckState, initDeck } from '../../../../data/model';
import selectors from '../../../../selectors';
import { useSelector } from 'react-redux';
import {
    DeckCard,
    DeckControlColumn,
    DeckDialogContent,
    DeckDivider,
    DeckIcon,
    DeckInfo,
} from './css';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { ConfirmDialog, DeckFileLoad, FileLoad } from '..';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import DownloadIcon from '@mui/icons-material/Download';
import { saveAs } from 'file-saver';
import CallMergeIcon from '@mui/icons-material/CallMerge';

export default ({ dispatch, iconMap }) => {
    const [open, setOpen] = React.useState(false);
    const [decks, setDecks] = React.useState([]);

    const currentDeck = useSelector(selectors.state);

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));

    const handleClickOpen = () => {
        const loadedDecks = loadStorage('deckList');
        setDecks(loadedDecks);
        setOpen(true);
    };

    const handleClose = () => {
        setDecks([]);
        setOpen(false);
    };

    const handleNew = () => {
        setDecks([...decks, minifyDeck(initDeck())]);
    };

    const handleUpload = (newDeck) => {
        setDecks([...decks, minifyDeck(duplicateDeckState(newDeck))]);
    };

    const deckDisplayProps = {
        onCopy: (id) => () => {
            if (id === currentDeck._idv4) {
                setDecks(
                    decks.concat([duplicateDeckState(currentDeck, ' (copy)')])
                );
            } else {
                setDecks(
                    decks.flatMap((d) =>
                        d._idv4 === id
                            ? [d, duplicateDeckState(d, ' (copy)')]
                            : [d]
                    )
                );
            }
        },
        onSwap: (id) => () => {
            const tempDeck = decks.find((d) => d._idv4 === id);
            if (tempDeck) {
                setDecks(
                    decks.filter((d) => d._idv4 !== id).concat([currentDeck])
                );
                dispatch.deck.setDeck(tempDeck);
            }
        },
        onDelete: (id) => () => {
            setDecks(decks.filter((d) => d._idv4 !== id));
        },
        onDownload: (id) => () => {
            const tempDeck = decks.find((d) => d._idv4 === id);
            if (tempDeck) {
                let fileName = tempDeck.name || 'rpg-material';
                const file = new Blob([jsonifyDeck(tempDeck, 4)], {
                    type: 'application/json;charset=utf-8',
                });

                saveAs(file, fileName);
            }
        },
        onMerge: (id) => () => {
            const tempDeck = decks.find((d) => d._idv4 === id);
            if (tempDeck && tempDeck.cards.length) {
                dispatch.deck.addCardsFromData(tempDeck.cards);
            }
        },
        iconMap,
    };

    React.useEffect(() => {
        if (Array.isArray(decks) && decks.length > 0)
            saveStorage('deckList', decks);
    }, [decks]);

    const display = decks
        .sort(sortByName)
        .map((d) => (
            <DeckDisplayCard key={d._idv4} deck={d} {...deckDisplayProps} />
        ));

    return (
        <>
            <StyledTipButton
                variant='contained'
                onClick={handleClickOpen}
                tooltip={`.`}
            >
                Manage Decks
            </StyledTipButton>
            <Dialog
                fullScreen={fullScreen}
                maxWidth={'lg'}
                fullWidth
                open={open}
                onClose={handleClose}
            >
                <StyledDialogTitle>
                    <span>Select a stored deck</span>
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </StyledDialogTitle>
                <DeckDialogContent dividers>
                    <DeckDisplayCard
                        deck={currentDeck}
                        current
                        {...deckDisplayProps}
                    />
                    <DeckDivider />
                    {display}
                </DeckDialogContent>
                <StyledDialogActions>
                    <StyledTipButton onClick={handleNew}>
                        <AddIcon fontSize='medium' />
                        New Deck
                    </StyledTipButton>
                    <DeckFileLoad onLoad={handleUpload} />
                </StyledDialogActions>
            </Dialog>
        </>
    );
};

const DeckDisplayCard = ({
    iconMap = {},
    deck = {},
    onSwap,
    onDelete,
    onCopy,
    onDownload,
    onMerge,
    current,
}) => {
    const { name, _idv4, cards, options } = deck;
    const { default_icon: iconId = 'ace', default_color: color } =
        options || {};

    return (
        <DeckCard current={current} color={color}>
            <Row>
                <DeckInfo>{name}</DeckInfo>
                <DeckIcon src={iconMap[iconId]?.path} />
            </Row>
            <DeckInfo>{cards.length} cards</DeckInfo>
            <DeckControlColumn>
                {!current ? (
                    <Row>
                        <StyledTipButton
                            onClick={onSwap(_idv4)}
                            disabled={current}
                            tooltip={`Stow the current deck and edit this one.`}
                        >
                            <EditIcon />
                        </StyledTipButton>

                        <ConfirmDialog
                            onConfirm={onMerge(_idv4)}
                            disabled={current}
                            message={`You are about to copy ${cards.length} cards from this deck into the deck you are currently editing.`}
                            tooltip={`Copy this decks cards into the current deck.`}
                        >
                            <CallMergeIcon />
                        </ConfirmDialog>

                        <ConfirmDialog
                            onConfirm={onDelete(_idv4)}
                            disabled={current}
                            message={`You are about to delete this deck and its ${cards.length} cards. This cannot be undone. Be sure to save this deck if you want it back later.`}
                            tooltip={`Delete this deck.`}
                        >
                            <DeleteIcon />
                        </ConfirmDialog>
                    </Row>
                ) : (
                    <Row>
                        <DeckInfo>Your current deck</DeckInfo>
                    </Row>
                )}
                <Row>
                    <StyledTipButton
                        onClick={onCopy(_idv4)}
                        tooltip={`Duplicate this deck.`}
                    >
                        <ContentCopyIcon />
                    </StyledTipButton>

                    <StyledTipButton
                        onClick={onDownload(_idv4)}
                        tooltip={`Download this deck.`}
                    >
                        <DownloadIcon />
                    </StyledTipButton>
                </Row>
            </DeckControlColumn>
        </DeckCard>
    );
};

const sortByName = (a, b) => {
    const aa = String(a?.name || ''),
        bb = String(b?.name || '');
    return aa.localeCompare(bb);
};
