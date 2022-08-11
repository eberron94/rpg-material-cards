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
    StyledCheckbox,
    StyledTipButton as Button,
    TextInput,
} from '../css';

export default ({ dispatch }) => {
    const sizeProp = {
        value: useSelector(selectors.defaults.pageHeight).includes('in')
            ? 'in'
            : 'mm',
        onChange: (e) => {
            dispatch.page.setWidth(widthProps.value + e.target.value);
            dispatch.page.setHeight(heightProps.value + e.target.value);
        },
    };

    const widthProps = {
        value: parseFloat(useSelector(selectors.defaults.pageWidth)),
        onChange: (e) =>
            dispatch.page.setWidth(e.target.value + sizeProp.value),
    };

    const heightProps = {
        value: parseFloat(useSelector(selectors.defaults.pageHeight)),
        onChange: (e) =>
            dispatch.page.setHeight(e.target.value + sizeProp.value),
    };

    const rowProps = {
        value: useSelector(selectors.defaults.pageRow),
        onChange: (e) => dispatch.page.setRows(e.target.value),
    };

    const colProps = {
        value: useSelector(selectors.defaults.pageCol),
        onChange: (e) => dispatch.page.setCols(e.target.value),
    };

    const shrinkProps = {
        checked: useSelector(selectors.defaults.shrink),
        onChange: () => dispatch.page.toggleShrink(),
    };

    const makeDefaultSize = (label, width, height) => (
        <Button
            variant='outlined'
            color='primary'
            onClick={() => {
                dispatch.page.setWidth(width);
                dispatch.page.setHeight(height);
            }}
        >
            {label} ({width} x {height})
        </Button>
    );

    const onRotateSize = () => {
        const tempHeight = heightProps.value + sizeProp.value,
            tempWidth = widthProps.value + sizeProp.value;
        dispatch.page.setWidth(tempHeight);
        dispatch.page.setHeight(tempWidth);
    };

    const onRotateUp = () => {
        const tempRow = rowProps.value,
            tempCol = colProps.value;
        dispatch.page.setCols(tempRow);
        dispatch.page.setRows(tempCol);
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
                        onClick={onRotateSize}
                        tooltip='Switch between landscape and portrait orientation'
                    >
                        Rotate orientation
                    </Button>
                </Row>
                <Row>
                    <Label>Rows</Label>
                    <InputContainer>
                        <TextInput
                            type='number'
                            min='1'
                            variant='standard'
                            {...rowProps}
                        />
                    </InputContainer>
                </Row>
                <Row>
                    <Label>Cols</Label>
                    <InputContainer>
                        <TextInput
                            type='number'
                            min='1'
                            variant='standard'
                            {...colProps}
                        />
                    </InputContainer>
                </Row>
                <Row>
                    <Button
                        color='primary'
                        onClick={onRotateUp}
                        tooltip='Swap rows and columns'
                    >
                        Rotate Rows and Columns
                    </Button>
                </Row>
                <Row>
                    <Label>Force Gap</Label>
                    <InputContainer>
                        <StyledCheckbox
                            label={
                                'Forces the pages to have space between cards'
                            }
                            {...shrinkProps}
                        />
                    </InputContainer>
                </Row>
            </Column>
            <Column gap='4'>
                <Row>
                    <LeftLabel>Preset Page Sizes</LeftLabel>
                </Row>
                <Row>{makeDefaultSize('Letter', '8.5in', '11in')}</Row>
                <Row>{makeDefaultSize('Legal', '8.5in', '14in')}</Row>
                <Row>{makeDefaultSize('A3', '297mm', '420mm')}</Row>
                <Row>{makeDefaultSize('A4', '210mm', '297mm')}</Row>
                <Row>{makeDefaultSize('A5', '148mm', '210mm')}</Row>
            </Column>
        </Row>
    );
};
