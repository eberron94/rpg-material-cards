import { InputAdornment, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { initialState } from '../../data/model';
import selectors from '../../selectors';
import {
    AppContainer,
    Column,
    InputContainer,
    Label,
    LeftLabel,
    Row,
    SelectInput,
    StyledTipButton as Button,
    SuperColumn,
    TextInput,
} from './css';
import { ColorPicker, ConfirmDialog, IconPicker, PasteLoad, FileLoad } from './modal';

export default (props) => {
    return (
        <AppContainer>
            <SuperColumn>
                <DataManagement {...props} />
                <Row>
                    <Typography variant='h4'>Page Size Settings</Typography>
                </Row>
                <PaperSize {...props} />

                <Row>
                    <Typography variant='h4'>Card Size Settings</Typography>
                </Row>
                <CardSize {...props} />

                <Row>
                    <Typography variant='h4'>Default Values</Typography>
                </Row>
                <DefaultSettings {...props} />
            </SuperColumn>
        </AppContainer>
    );
};

const DataManagement = ({ dispatch }) => {
    const handleDeleteAll = () => dispatch.deck.deleteAll();
    const handleResetOptions = () => dispatch.deck.resetOptions();

    const sampleProps = {
        title: 'Are you sure you want to add the sample cards?',
        message:
            'This will add all the sample cards to the current deck. You can delete them later.',
        onConfirm: () => dispatch.deck.addCardsFromData(initialState().cards),
    };

    const deleteAllProps = {
        title: 'Are you sure you want to delete all cards?',
        message:
            'This action cannot be undone. All cards will be removed from current deck.',
        warning: true,
        onConfirm: handleDeleteAll,
    };

    const resetOptionProps = {
        title: 'Are you sure you want to reset print size, card size, and default values?',
        message: `This action cannot be undone.
            All settings for printing, card size, and default values will be reset.`,
        warning: true,
        onConfirm: handleResetOptions,
    };

    return (
        <Column>
            <Row>
                <Button variant='outlined'>Open Help</Button>
                <ConfirmDialog variant='outlined' {...sampleProps}>
                    Load Sample
                </ConfirmDialog>
                <Button variant='contained'>Switch Deck</Button>
            </Row>
            <Row>
                <PasteLoad dispatch={dispatch} />
                <FileLoad dispatch={dispatch}/>

                <Button variant='contained'>Save to File</Button>
            </Row>
            <Row>
                <ConfirmDialog
                    variant='contained'
                    color='secondary'
                    {...deleteAllProps}
                >
                    Delete All
                </ConfirmDialog>
                <ConfirmDialog
                    variant='contained'
                    color='secondary'
                    {...resetOptionProps}
                >
                    Reset Default and Printing
                </ConfirmDialog>
            </Row>
            <Button variant='contained' href='/print'>
                Generate Pages to Print
            </Button>
        </Column>
    );
};

const DefaultSettings = ({ dispatch, iconMap }) => {
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
                    <Label>Default Icon</Label>
                    <InputContainer>
                        <IconPicker {...iconProps} iconMap={iconMap} />
                    </InputContainer>
                </Row>

                <Row>
                    <Label>Default Color</Label>
                    <InputContainer>
                        <ColorPicker {...colorProps} />
                    </InputContainer>
                </Row>
            </Column>
        </Row>
    );
};

const CardSize = ({ dispatch }) => {
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

const PaperSize = ({ dispatch }) => {
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
