import React from 'react';
import { useSelector } from 'react-redux';
import selectors from '../../../selectors';
import {
    Column,
    InputContainer,
    Label,
    Row,
    SelectInput,
    TextInput,
} from '../css';
import { ColorPicker, IconPicker } from '../modal';

export default ({ dispatch, iconMap }) => {
    const titleFontProps = {
        value: useSelector(selectors.defaults.titleFont) || '',
        onChange: (e) => dispatch.deck.setDefaultTitleFont(e.target.value),
    };

    const bodyFontProps = {
        value: useSelector(selectors.defaults.bodyFont) || '',
        onChange: (e) => dispatch.deck.setDefaultBodyFont(e.target.value),
    };

    const colorProps = {
        value: useSelector(selectors.defaults.color) || '',
        onChange: (newColor) => dispatch.deck.setDefaultColor(newColor),
    };

    const iconProps = {
        value: useSelector(selectors.defaults.icon) || '',
        onChange: (newIcon) => dispatch.deck.setDefaultIcon(newIcon),
        defaultMessage: 'system default',
        defaultIcon: 'ace',
        color: colorProps.value,
    };

    const nameProps = {
        value: useSelector(selectors.defaults.name) || '',
        onChange: (e) => dispatch.deck.setName(e.target.value),
    };

    return (
        <Row>
            <Column>
                <Row>
                    <Label>Default Title Font</Label>
                    <InputContainer>
                        <SelectInput
                            native
                            variant='standard'
                            {...titleFontProps}
                        >
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
                    <Label>Default Body Font</Label>
                    <InputContainer>
                        <SelectInput
                            native
                            variant='standard'
                            {...bodyFontProps}
                        >
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
            </Column>
            <Column>
                <Row>
                    <Label>Deck Name</Label>
                    <InputContainer>
                        <TextInput variant='standard' {...nameProps} />
                    </InputContainer>
                </Row>
                <Row>
                    <Label>Deck Icon</Label>
                    <InputContainer>
                        <IconPicker {...iconProps} iconMap={iconMap} />
                    </InputContainer>
                </Row>

                <Row>
                    <Label>Deck Color</Label>
                    <InputContainer>
                        <ColorPicker {...colorProps} />
                    </InputContainer>
                </Row>
            </Column>
        </Row>
    );
};
