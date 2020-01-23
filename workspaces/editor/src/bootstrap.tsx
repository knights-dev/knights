import './scss/editor.scss';

import Fleur from '@fleur/fleur';
import { FleurContext } from '@fleur/react';
import React from 'react';
import ReactDOM from 'react-dom';

import { AppRoot } from './components/AppRoot';
import { store } from './domains/counter/store';

const app = new Fleur({
    stores: [store],
});

const context = app.createContext();

ReactDOM.render(
    <FleurContext value={context}>
        <AppRoot />
    </FleurContext>,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    document.getElementById('app')!
);

// import('../interp-wasm').then(module => module.greet('Rust'));
