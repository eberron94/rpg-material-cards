import React from 'react';
import { useSelector } from 'react-redux';
import selectors from '../../selectors';
import cardUtil from '../../util/cardUtil';
import { cape } from '../../util/dataUtil';
import styleUtil from '../../util/styleUtil';
import {
    AppContainer,
    CardPageButton,
    CardPick,
    ContentArea,
    InputContainer,
    Label,
    Row,
    SelectInput,
    SuperColumn,
    SuperRow,
    TextInput,
} from './css';
import OrderCards from './dnd';
import { ColorPicker, IconPicker } from './picker';

export default (props) => {
    const cardId = useSelector(selectors.card.id);
    return (
        <AppContainer>
            <DeckControls cardId={cardId} {...props} />
            <CardControls cardId={cardId} {...props} />
        </AppContainer>
    );
};

const DeckControls = ({ cardId, iconMap, dispatch }) => {
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

const CardControls = ({ cardId, iconMap, dispatch }) => {
    const disabled = typeof cardId !== 'string' || cardId.length === 0;

    // Track content array and body freeform string seperatly
    const currentContent = useSelector(selectors.card.body);
    const [body, setBody] = React.useState(cape(currentContent).join('\n\n'));

    React.useEffect(() => {
        //When card id changes, update displayed content
        setBody(cape(currentContent).join('\n\n'));
    }, [cardId]);

    React.useEffect(() => {
        //When body changes, dispatch formatted changes to card state
        dispatch.card.setBody(
            body
                .split('\n')
                .map((e) => e.trim().replace(/ *\| */g, ' | '))
                .filter((e) => e)
        );
    }, [body]);

    const bodyProps = {
        value: body,
        onChange: (e) => setBody(e.target.value),
        disabled,
    };

    const nameProps = {
        value: useSelector(selectors.card.title) || '',
        onChange: (e) => dispatch.card.setTitle(e.target.value),
        disabled,
    };

    const titleFontProps = {
        value: useSelector(selectors.card.titleFont) || '',
        onChange: (e) => dispatch.card.setTitleFont(e.target.value),
        disabled,
    };

    const bodyFontProps = {
        value: useSelector(selectors.card.bodyFont) || '',
        onChange: (e) => dispatch.card.setBodyFont(e.target.value),
        disabled,
    };

    const countProps = {
        value: useSelector(selectors.card.count) || '',
        onChange: (e) => dispatch.card.setCount(e.target.value),
        disabled,
    };

    const qrProps = {
        value: useSelector(selectors.card.qr) || '',
        onChange: (e) => dispatch.card.setQR(e.target.value),
        disabled,
    };

    const colorProps = {
        value: useSelector(selectors.card.color) || '',
        defaultValue: useSelector(selectors.defaults.color) || '',
        onChange: (newColor) => dispatch.card.setColor(newColor),
        disabled,
    };

    const iconFrontProps = {
        value: useSelector(selectors.card.iconFront) || '',
        onChange: (newIcon) => dispatch.card.setIconFront(newIcon),
        disabled,
        defaultMessage: 'deck icon',
        defaultIcon: useSelector(selectors.defaults.icon),
        color: colorProps.value || colorProps.defaultValue,
    };

    const iconBackProps = {
        value: useSelector(selectors.card.iconBack) || '',
        onChange: (newIcon) => dispatch.card.setIconBack(newIcon),
        disabled,
        defaultMessage: 'front icon',
        defaultIcon: iconFrontProps.value || iconFrontProps.defaultIcon,
        color: colorProps.value || colorProps.defaultValue,
    };

    console.log('colorprops', colorProps);

    return (
        <>
            <Row>
                <Label>Name</Label>
                <InputContainer>
                    <TextInput variant='standard' {...nameProps} />
                </InputContainer>
            </Row>

            <Row>
                <Label>Title Font</Label>
                <InputContainer>
                    <SelectInput native variant='standard' {...titleFontProps}>
                        <option value=''>default font</option>
                        <option value='16'>16pt font</option>
                        <option value='15'>15pt font</option>
                        <option value='14'>14pt font</option>
                        <option value='13'>13pt font</option>
                        <option value='12'>12pt font</option>
                        <option value='11'>11pt font</option>
                        <option value='10'>10pt font</option>
                    </SelectInput>
                </InputContainer>
            </Row>

            <Row>
                <Label>Body Font</Label>
                <InputContainer>
                    <SelectInput native variant='standard' {...bodyFontProps}>
                        <option value=''>default font</option>
                        <option value='11'>11pt font</option>
                        <option value='10'>10pt font</option>
                        <option value='9'>9pt font</option>
                        <option value='8'>8pt font</option>
                        <option value='7.5'>7.5pt font</option>
                        <option value='7'>7pt font</option>
                        <option value='6.5'>6.5pt font</option>
                        <option value='6'>6pt font</option>
                        <option value='5'>5pt font</option>
                    </SelectInput>
                </InputContainer>
            </Row>

            <Row>
                <Label>Count</Label>
                <InputContainer>
                    <TextInput
                        type='number'
                        min='1'
                        variant='standard'
                        {...countProps}
                    />
                </InputContainer>
            </Row>

            <Row>
                <Label>QR Code</Label>
                <InputContainer>
                    <TextInput variant='standard' {...qrProps} />
                </InputContainer>
            </Row>

            <Row>
                <Label>Icon Front</Label>
                <InputContainer>
                    <IconPicker {...iconFrontProps} iconMap={iconMap} />
                </InputContainer>
            </Row>

            <Row>
                <Label>Icon Back</Label>
                <InputContainer>
                    <IconPicker {...iconBackProps} iconMap={iconMap} />
                </InputContainer>
            </Row>

            <Row>
                <Label>Color</Label>
                <InputContainer>
                    <ColorPicker {...colorProps} />
                </InputContainer>
            </Row>

            <Row align='flex-start'>
                <Label>Content</Label>
                <ContentArea {...bodyProps} />
            </Row>
        </>
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
