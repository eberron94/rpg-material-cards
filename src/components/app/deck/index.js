import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Checkbox,
    InputAdornment,
    Typography,
} from '@mui/material';
import { saveAs } from 'file-saver';
import React from 'react';
import { useSelector } from 'react-redux';
import { initialState } from '../../../data/model';
import selectors from '../../../selectors';
import {
    AppContainer,
    Column,
    InputContainer,
    Label,
    LeftLabel,
    Row,
    SelectInput,
    StyledAccordian,
    StyledCheckbox,
    StyledTipButton as Button,
    SuperColumn,
    TextInput,
} from '../css';
import {
    ColorPicker,
    ConfirmDialog,
    FileLoad,
    IconPicker,
    PasteLoad,
} from '../modal';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { jsonifyDeck, minifyDeck } from '../../../util/dataUtil';
import DataManager from './dataManager';
import SettingDefaultValue from './settingDefaultValue';
import SettingCardSize from './settingCardSize';
import SettingPageSize from './settingPageSize';

export default (props) => {
    const [pageAccord, setPageAccord] = React.useState(false);
    const [cardAccord, setCardAccord] = React.useState(true);
    const [defaultAccord, setDefaultAccord] = React.useState(true);

    return (
        <AppContainer>
            <SuperColumn>
                <DataManager {...props} />
                <StyledAccordian
                    expanded={pageAccord}
                    onChange={() => setPageAccord(!pageAccord)}
                    variant='outlined'
                >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant='h4'>Page Size Settings</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <SettingPageSize {...props} />
                    </AccordionDetails>
                </StyledAccordian>

                <StyledAccordian
                    expanded={cardAccord}
                    onChange={() => setCardAccord(!cardAccord)}
                    variant='outlined'
                >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant='h4'>Card Size Settings</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <SettingCardSize {...props} />
                    </AccordionDetails>
                </StyledAccordian>

                <StyledAccordian
                    expanded={defaultAccord}
                    onChange={() => setDefaultAccord(!defaultAccord)}
                    variant='outlined'
                >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant='h4'>Default Values</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <SettingDefaultValue {...props} />
                    </AccordionDetails>
                </StyledAccordian>
            </SuperColumn>
        </AppContainer>
    );
};
