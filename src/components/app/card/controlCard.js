import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import selectors from '../../../selectors';
import { cape } from '../../../util/dataUtil';
import {
    ContentArea,
    InputContainer,
    Label,
    Row,
    SelectInput,
    TextInput,
} from '../css';
import { ColorPicker, IconPicker } from '../modal';

export default ({ cardId, iconMap, dispatch }) => {
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
                .map((e) =>
                    e
                        .trim()
                        .replace(/(\\\|)/g, '~#~')
                        .replace(/ *\| */g, ' | ')
                        .replace(/~#~/g, '\\|')
                )
                .filter((e) => e)
        );
    }, [body]);

    const bodyProps = {
        value: body,
        ref: useRef(),
        onChange: (e) => setBody(e.target.value),
        onKeyDown: (e) => {
            e.preventDefault();
            const startSelect = e.target.selectionStart;
            const endSelect = e.target.selectionEnd;

            // Check for valid key positions
            if (!e.ctrlKey || e.key === 'Control' || startSelect === endSelect)
                return;

            const {
                start,
                selected,
                end,
                isBoldItalics,
                isBold,
                isItalics,
                isUnderlined,
                isStriked,
                isStrikedUnderlined,
            } = getTextSelection(body, startSelect, endSelect);

            // Check that something is selected
            if (selected.length === 0) return;

            let textArr;

            const finish = () => {
                setBody(textArr.join(''));
                setTimeout(
                    () =>
                        bodyProps.ref.current.setSelectionRange(
                            textArr[0].length,
                            textArr[0].length + textArr[1].length
                        ),
                    100
                );
            };

            switch (e.key) {
                case 'b':
                    if (!isBold && !isBoldItalics)
                        textArr = [start + '**', selected, '**' + end];
                    else textArr = unbold(start, selected, end);
                    return finish();
                case 'i':
                    if (!isItalics && !isBoldItalics)
                        textArr = [start + '*', selected, '*' + end];
                    else textArr = unitalics(start, selected, end);
                    return finish();
                case 's':
                    if (!isStriked && !isStrikedUnderlined)
                        textArr = [start + '~~', selected, '~~' + end];
                    else textArr = unbold(start, selected, end);
                    return finish();
                case 'u':
                    if (!isUnderlined && !isStrikedUnderlined)
                        textArr = [start + '~', selected, '~' + end];
                    else textArr = unitalics(start, selected, end);
                    return finish();
            }
        },
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

const getTextSelection = (text, start, end) => {
    const startArr = text.substring(0, start).split('');
    const selectedArr = text.substring(start, end).split('');
    const endArr = text.substring(end).split('');

    // Trim out whitespaces
    while (' *_'.includes(selectedArr.at(-1))) {
        endArr.unshift(selectedArr.pop());
    }

    while (' *_'.includes(selectedArr.at(0))) {
        startArr.push(selectedArr.shift());
    }

    const surr1 = [startArr.slice(-1).join(''), endArr.slice(0, 1).join('')];
    const surr2 = [startArr.slice(-2).join(''), endArr.slice(0, 2).join('')];
    const surr3 = [startArr.slice(-3).join(''), endArr.slice(0, 3).join('')];

    const isBoldItalics =
        surr3.every((e) => e === '***' || e === '___') && surr3[0] === surr3[1];

    const isBold =
        surr2.every((e) => e === '**' || e === '__') && surr2[0] === surr2[1];

    const isItalics =
        surr1.every((e) => e === '*' || e === '_') && surr1[0] === surr1[1];

    const isStrikedUnderlined =
        surr3.every((e) => e === '~~~') && surr3[0] === surr3[1];
    const isStriked = surr2.every((e) => e === '~~') && surr2[0] === surr2[1];
    const isUnderlined = surr1.every((e) => e === '~') && surr1[0] === surr1[1];

    return {
        start: startArr.join(''),
        selected: selectedArr.join(''),
        end: endArr.join(''),

        isStrikedUnderlined,
        isStriked: isStriked && !isStrikedUnderlined,
        isUnderlined: isUnderlined && !isStriked && !isStrikedUnderlined,

        isBoldItalics,
        isBold: isBold && !isBoldItalics,
        isItalics: isItalics && !isBold && !isBoldItalics,
    };
};

const unbold = (start, selected, end) => {
    start = start.slice(0, -2);
    end = end.substring(2);
    return [start, selected, end];
};

const unitalics = (start, selected, end) => {
    start = start.slice(0, -1);
    end = end.substring(1);
    return [start, selected, end];
};
