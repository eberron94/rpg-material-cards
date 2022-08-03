import { MuiThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createDispatch } from './actions';
import {
    CardOptions,
    CardPreview,
    DeckOptions,
    PrintPreview,
} from './components/app';

import { createTheme, ThemeProvider } from '@mui/material';
import { indigo, red } from '@mui/material/colors';
import { store } from './data';

const MainPage = () => {
    const [iconMap, setIconMap] = React.useState({});

    React.useEffect(() => {
        const loadedIcons = require('./iconMap.json');
        setIconMap(loadedIcons);
    }, []);

    const dispatch = createDispatch(store);

    const theme = createTheme({
        palette: {
            primary: {
                main: indigo[500],
            },
            secondary: {
                main: red[300],
            },
        },
        overrides: {
            MuiDropzoneSnackbar: {
                errorAlert: {
                    backgroundColor: '#AFA',
                    color: '#000',
                },
                successAlert: {
                    backgroundColor: '#FAA',
                    color: '#000',
                },
            },
        },
    });

    return (
        <MuiThemeProvider theme={theme}>
            <ThemeProvider theme={theme}>
                <DeckOptions iconMap={iconMap} dispatch={dispatch} />
                <CardOptions
                    className='generator'
                    iconMap={iconMap}
                    dispatch={dispatch}
                />
                <CardPreview
                    className='render'
                    iconMap={iconMap}
                    dispatch={dispatch}
                />
            </ThemeProvider>
        </MuiThemeProvider>
    );
};

const PrintPage = () => {
    const [iconMap, setIconMap] = React.useState({});

    React.useEffect(() => {
        const loadedIcons = require('./iconMap.json');
        setIconMap(loadedIcons);
    }, []);

    return <PrintPreview iconMap={iconMap} />;
};

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<MainPage />} />
                <Route path='/print' element={<PrintPage />} />
            </Routes>
        </BrowserRouter>
    </Provider>,
    document.querySelector('#root')
);
