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

import { store } from './data';

const MainPage = () => {
    const [iconMap, setIconMap] = React.useState({});

    React.useEffect(() => {
        const loadedIcons = require('./iconMap.json');
        console.log('loaded', loadedIcons);
        setIconMap(loadedIcons);
    }, []);

    const dispatch = createDispatch(store);

    return (
        <>
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
        </>
    );
};

const PrintPage = () => {
    const [iconMap, setIconMap] = React.useState({});

    React.useEffect(() => {
        const loadedIcons = require('./iconMap.json');
        console.log('loaded', loadedIcons);
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
