import React from 'react';
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
