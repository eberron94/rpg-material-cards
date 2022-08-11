import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import React from 'react';
import { AppContainer, StyledAccordian, SuperColumn } from '../css';
import DataManager from './dataManager';
import SettingCardSize from './settingCardSize';
import SettingDefaultValue from './settingDefaultValue';
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
