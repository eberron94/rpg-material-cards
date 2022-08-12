import { Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import selectors from '../../../selectors';
import cardUtil from '../../../util/cardUtil';
import styleUtil from '../../../util/styleUtil';
import {
    CardPageButton,
    CardPick,
    Row,
    SelectInput,
    SuperColumn,
    SuperRow,
} from '../css';
import OrderCards from '../dnd';

export default ({ cardId, iconMap, dispatch }) => {
    const disabled = typeof cardId !== 'string' || cardId.length === 0;

    const cardTitle = useSelector(selectors.card.title);
    const index = useSelector(selectors.card.index);
    const deck = useSelector(selectors.cardList);
    const options = useSelector((state) => state.options || null);

    return (
        <SuperRow>
            <SuperColumn>
                <Row>
                    <SelectInput
                        variant='standard'
                        flex={8}
                        value={index}
                        renderValue={() => cardTitle}
                        onChange={(e) => {
                            dispatch.deck.setCurrent(
                                deck[e.target.value || 0]._idv4
                            );
                        }}
                        disabled={disabled}
                    >
                        {deck.map((cc, i) => (
                            <CardPickOption
                                key={cc._idv4}
                                iconMap={iconMap}
                                cardData={cc}
                                options={options}
                                value={i}
                            />
                        ))}
                    </SelectInput>
                    <Row>
                        <Typography>{`${index + 1}/${deck.length}`}</Typography>
                    </Row>
                    <OrderCards
                        iconMap={iconMap}
                        deck={deck}
                        options={options}
                        setOrder={(newOrder) =>
                            dispatch.deck.setOrder(newOrder)
                        }
                        deleteCard={(id) => dispatch.deck.delete(id)}
                        duplicateCard={(id) => dispatch.deck.duplicate(id)}
                        disabled={disabled}
                    />
                </Row>
                <Row>
                    <CardPageButton
                        variant='contained'
                        size='small'
                        color='primary'
                        flex={3}
                        onClick={() => dispatch.deck.createCard()}
                    >
                        Add Card
                    </CardPageButton>
                    <CardPageButton
                        variant='outlined'
                        flex={8}
                        onClick={() => dispatch.deck.duplicate(cardId)}
                        disabled={disabled}
                    >
                        Duplicate Card
                    </CardPageButton>
                    <CardPageButton
                        variant='contained'
                        color='secondary'
                        flex={3}
                        onClick={() => dispatch.deck.delete(cardId)}
                        disabled={disabled}
                    >
                        Delete
                    </CardPageButton>
                </Row>
            </SuperColumn>
        </SuperRow>
    );
};

const CardPickOption = ({ iconMap, cardData, options, ...props }) => {
    const cardStyle = styleUtil.makeCardStyle({ cardData, options });
    const { path, rotation } = cardUtil.iconFront({
        cardData,
        options,
        iconMap,
    });
    return (
        <CardPick cardStyle={cardStyle.front} rotation={rotation} {...props}>
            <span>{cardData.title}</span>
            <img src={path || ''} />
        </CardPick>
    );
};
