import CloseIcon from '@mui/icons-material/Close';
import {
    Button,
    ButtonGroup,
    Dialog,
    DialogContent,
    IconButton,
    Pagination,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import React from 'react';
import textUtil from '../../../util/textUtil';
import {
    IconGridContainer,
    IconGridEmpty,
    IconGridImage,
    IconGridItem,
    IconGridLabel,
    IconSearchField,
    PageSizeSelect,
    PickerButton,
    PickerLabel,
    PickerSwatch,
    RotationControls,
    StyledDialogActions,
    StyledDialogContent,
    StyledDialogTitle,
} from './css';

export default ({
    value: rawValue = 'plain-square',
    iconMap,
    onChange,
    defaultMessage,
    defaultIcon,
    color,
    disabled,
    ...props
}) => {
    const [value = '', rawRotation = ''] = rawValue ? rawValue.split('#') : [];
    const startingRotation = Number(rawRotation) / 15 || 0;

    const [open, setOpen] = React.useState(false);
    const [searchInput, setSearchInput] = React.useState('');
    const [rotation, setRotation] = React.useState(startingRotation);
    const [page, setPage] = React.useState(0);
    const [pageSize, setPageSize] = React.useState(24);

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));

    // Reset search, page, and rotation when opening modal (new value is passed in)
    React.useEffect(() => {
        setSearchInput('');
        setPage(0);
        setRotation(startingRotation);
    }, [value]);

    // Reset Page when search changes
    React.useEffect(() => {
        setPage(0);
    }, [searchInput]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const rotateIcon = (deg) => () => {
        setRotation(rotation + deg >= 24 ? 0 : rotation + deg);
    };

    const updateIcon = (newIcon) => {
        const rotString =
            rotation !== 0 && rotation < 24 ? '#' + rotation * 15 : '';
        if (typeof onChange === 'function') onChange(newIcon + rotString);
        handleClose();
    };

    const { path, id } = iconMap[value] || iconMap[defaultIcon] || {};

    // Perform string search matchings for icon id
    const searchString = searchInput.split(' ').join('-');
    const matchingIcons = Object.values(iconMap)
        .filter(({ id }) => id.includes(searchString))
        .sort(sortIcons(value));

    const maximumPages = Math.ceil(matchingIcons.length / pageSize);

    // Filter matched icons to current page
    let pagedIcons = matchingIcons
        .filter(filterCurrentPage(page, pageSize))
        .map((icon) => ({
            ...icon,
            name: searchInput
                ? icon.id.split(searchString).join('***' + searchString + '***')
                : icon.id,
            current: icon.id === id,
            rotation,
        }));

    return (
        <>
            <PickerButton
                variant='text'
                onClick={handleClickOpen}
                disabled={disabled}
            >
                <PickerSwatch rotation={rotation} color={color}>
                    <img src={path || ''} />
                </PickerSwatch>
                <PickerLabel>{value || 'Using ' + defaultMessage}</PickerLabel>
            </PickerButton>
            <Dialog
                fullScreen={fullScreen}
                maxWidth={'lg'}
                fullWidth
                open={open}
                onClose={handleClose}
            >
                <StyledDialogTitle>
                    <span>Select an Icon</span>
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </StyledDialogTitle>
                <IconSearch
                    searchInput={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
                <DialogContent dividers>
                    <IconDisplay
                        icons={pagedIcons}
                        pageSize={pageSize}
                        onChange={updateIcon}
                        color={color}
                        defaultMessage={defaultMessage}
                    />
                </DialogContent>
                <StyledDialogActions>
                    <PageSizeControls
                        value={pageSize}
                        onChange={(e) => setPageSize(e)}
                    />
                    <RotationControls>
                        Rotate
                        <ButtonGroup variant='text'>
                            <Button onClick={rotateIcon(1)}>15&deg;</Button>
                            <Button onClick={rotateIcon(3)}>45&deg;</Button>
                            <Button onClick={rotateIcon(6)}>90&deg;</Button>
                            <Button onClick={rotateIcon(99)}>Reset</Button>
                        </ButtonGroup>
                    </RotationControls>
                    <Pagination
                        count={maximumPages}
                        showFirstButton
                        showLastButton
                        page={page + 1}
                        onChange={(e, newValue) => setPage(newValue - 1)}
                    />
                </StyledDialogActions>
            </Dialog>
        </>
    );
};

const sortIcons = (value) => (a, b) => {
    return a.id === value ? -1 : b.id === value ? 1 : 0;
};

const filterCurrentPage = (page, pageSize) => (_, i) =>
    i >= page * pageSize && i < (page + 1) * pageSize;

const IconSearch = ({ searchInput, onChange }) => {
    return (
        <StyledDialogContent>
            <div>
                Select an icon. You can search by the name of the icon. All
                icons are credited to{' '}
                <a target='_blank' href='https://game-icons.net/'>
                    game-icons.net
                </a>
                . You should use their site for a more detailed search function.
            </div>
            <IconSearchField
                label='Search for an Icon'
                variant='standard'
                value={searchInput}
                onChange={onChange}
            />
        </StyledDialogContent>
    );
};

const IconDisplay = ({
    icons = [],
    pageSize,
    onChange,
    color,
    defaultMessage,
    ...props
}) => {
    let display = icons.map(({ id, name, path, rotation }) => (
        <IconGridItem
            key={id}
            onClick={typeof onChange === 'function' ? () => onChange(id) : null}
        >
            <IconGridImage rotation={rotation} color={color}>
                <img src={path || ''} />
            </IconGridImage>
            <IconGridLabel>
                {textUtil.stylize(name === 'default' ? defaultMessage : name)}
            </IconGridLabel>
        </IconGridItem>
    ));

    // Pad paged Icons
    if (display.length < pageSize) {
        display = display.concat(
            Array(pageSize - display.length)
                .fill(0)
                .map((_, i) => <IconGridEmpty key={'e' + i} />)
        );
    }

    return <IconGridContainer {...props}>{display}</IconGridContainer>;
};

const PageSizeControls = ({ value, onChange }) => {
    return (
        <div>
            <PageSizeSelect
                value={value}
                label='Page Size'
                onChange={
                    typeof onChange === 'function'
                        ? (e) => onChange(e.target.value)
                        : null
                }
            >
                <option value={8}>8</option>
                <option value={16}>16</option>
                <option value={24}>24</option>
                <option value={32}>32</option>
            </PageSizeSelect>
            icons per page
        </div>
    );
};
