import './scss/editor.scss';

import Fleur from '@fleur/fleur';
import { FleurContext } from '@fleur/react';
import React from 'react';
import ReactDOM from 'react-dom';
import { Subject } from 'rxjs';

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

const subject = new Subject<number>();

subject.subscribe({
    next(value: number) {
        console.log(`Received: ${value}`);
    },
});

import('../interp-wasm').then(module => {
    module.greet('Rust');
    module.apply((n: number) => subject.next(n));
});
