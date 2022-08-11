import styled from '@emotion/styled';
import {
    Accordion,
    Button,
    IconButton,
    Checkbox,
    FormControlLabel,
    MenuItem,
    NativeSelect,
    Select,
    TextField,
    Tooltip,
} from '@mui/material';

export const AppContainer = styled.div`
    max-width: 30vw;
    min-width: 25vw;
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    gap: 20px;
`;

export const SuperRow = styled.div`
    display: flex;
    flex-flow: row nowrap;
    gap: 10px;

    width: 100%;
`;

export const SuperColumn = styled.div`
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    gap: ${(e) => e.gap || 20}px;
    justify-content: flex-start;
    align-items: flex-start;
    font-size: 16pt;
`;

export const Column = styled(SuperColumn)`
    width: 100%;
    flex: ${(e) => e.flex || 1};
    justify-content: ${(e) => e.align || 'center'};
`;

export const Row = styled(SuperRow)`
    align-items: ${(e) => e.align || 'center'};

    flex: ${(e) => e.flex || 1};
`;

export const Label = styled.div`
    text-align: right;
    font-weight: 800;

    flex: 1;
`;

export const LeftLabel = styled.div`
    font-weight: 800;

    flex: 1;
`;

export const InputContainer = styled.div`
    flex: 4;
`;

export const TextInput = styled(TextField)`
    width: 100%;
`;

export const SelectInput = styled(Select)`
    width: 100%;
    flex: ${(e) => e.flex || 1};
`;

export const CardPageButton = styled(Button)`
    flex: ${(e) => e.flex || 1};
`;

export const ContentArea = styled.textarea`
    flex: 4;
    height: 100%;
    min-height: 600px;
    max-height: 800px;
    padding: 8px;

    resize: none;
`;

export const PreivewWrapper = styled.div`
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
`;

export const PreviewArea = styled.div`
    label: preview-area;
    padding: 20px;
    resize: both;
    position: relative;
    height: calc(100vh - 200px);
    max-height: 90vh;
    min-width: 30vw;
    user-select: none;
`;

export const TogglePreview = styled.div`
    label: toggle-preview;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    gap: 4px;
`;

export const MissingData = styled.div`
    color: red;
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    transform-origin: center center;
    text-align: center;

    width: 120px;
    height: 120px;

    display: flex;
    justify-content: center;
    align-items: center;
`;

export const CardPick = styled(({ cardStyle, ...props }) => (
    <MenuItem {...props} />
))`
    label: card-pick;
    display: flex;
    justify-content: space-between;

    color: #fff;
    background-color: ${({ cardStyle }) =>
        cardStyle?.backgroundColor || 'black'} !important;

    img {
        height: 24px;
        width: 24px;
        object-fit: contain;
        transform: rotate(${(e) => e.rotation * 15}deg);
    }

    img[src=''] {
        display: none;
    }
`;

export const StyledTipButton = styled(({ tooltip, icon, ...props }) => {
    const ButtonElement = icon ? IconButton : Button;
    return tooltip ? (
        <Tooltip title={tooltip} arrow>
            <ButtonElement {...props} />
        </Tooltip>
    ) : (
        <ButtonElement {...props} />
    );
})`
    width: 100%;
    flex: 1;

    @media print {
        display: none;
    }
`;

export const StyledAccordian = styled(Accordion)`
    width: 100%;
    flex: 1;
`;

export const StyledCheckbox = styled(({ checked, onChange, ...props }) => {
    return (
        <FormControlLabel
            control={<Checkbox checked={checked} onChange={onChange} />}
            {...props}
        />
    );
})``;
