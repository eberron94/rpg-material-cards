import { InputAdornment } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import selectors from '../../../selectors';
import {
    Column,
    InputContainer,
    Label,
    LeftLabel,
    Row,
    SelectInput,
    StyledTipButton as Button,
    TextInput,
} from '../css';

export default ({ dispatch }) => {
    const sizeProp = {
        value: useSelector(selectors.defaults.cardSizeUnit),
        onChange: (e) => {
            dispatch.deck.setWidth(widthProps.value + e.target.value);
            dispatch.deck.setHeight(heightProps.value + e.target.value);
        },
    };

    const widthProps = {
        value: parseFloat(useSelector(selectors.defaults.cardWidth)),
        onChange: (e) =>
            dispatch.deck.setWidth(e.target.value + sizeProp.value),
    };

    const heightProps = {
        value: parseFloat(useSelector(selectors.defaults.cardHeight)),
        onChange: (e) =>
            dispatch.deck.setHeight(e.target.value + sizeProp.value),
    };

    const makeDefaultSize = (label, width, height) => (
        <Button
            variant='outlined'
            color='primary'
            size='small'
            onClick={() => {
                dispatch.deck.setWidth(width);
                dispatch.deck.setHeight(height);
            }}
        >
            {label} ({width} x {height})
        </Button>
    );

    const onRotate = () => {
        const tempHeight = heightProps.value + sizeProp.value,
            tempWidth = widthProps.value + sizeProp.value;
        dispatch.deck.setWidth(tempHeight);
        dispatch.deck.setHeight(tempWidth);
    };

    return (
        <Row align='flex-start'>
            <Column>
                <Row>
                    <Label>Width</Label>
                    <InputContainer>
                        <TextInput
                            type='number'
                            min='1'
                            variant='standard'
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        {sizeProp.value}
                                    </InputAdornment>
                                ),
                            }}
                            {...widthProps}
                        />
                    </InputContainer>
                </Row>
                <Row>
                    <Label>Height</Label>
                    <InputContainer>
                        <TextInput
                            type='number'
                            min='1'
                            variant='standard'
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        {sizeProp.value}
                                    </InputAdornment>
                                ),
                            }}
                            {...heightProps}
                        />
                    </InputContainer>
                </Row>
                <Row>
                    <Label>Unit</Label>
                    <InputContainer>
                        <SelectInput native variant='standard' {...sizeProp}>
                            <option value=''>Millimeter</option>
                            <option value='in'>Inch</option>
                        </SelectInput>
                    </InputContainer>
                </Row>
                <Row>
                    <Button
                        color='primary'
                        onClick={onRotate}
                        tooltip='Switch between landscape and portrait orientation'
                    >
                        Rotate orientation
                    </Button>
                </Row>
            </Column>
            <Column gap='4'>
                <Row>
                    <LeftLabel>Preset Card Sizes</LeftLabel>
                </Row>
                <Row>{makeDefaultSize('Business Card', '2in', '3.5in')}</Row>
                <Row>{makeDefaultSize('Playing Card', '2.5in', '3.5in')}</Row>
                <Row>{makeDefaultSize('Flash Card', '3in', '5in')}</Row>
                <Row>{makeDefaultSize('Postcard', '4.25in', '5.5in')}</Row>
                <Row>{makeDefaultSize('Index Card', '5in', '6in')}</Row>
                <Row>{makeDefaultSize('A5', '148mm', '210mm')}</Row>
                <Row>{makeDefaultSize('A6', '105mm', '148mm')}</Row>
            </Column>
        </Row>
    );
};
