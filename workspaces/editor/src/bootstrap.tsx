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

const errorSubject = new Subject<Error>();

errorSubject.subscribe({
    next(err: Error) {
        console.error(err);
    },
});

import('../interp-wasm').then(module => {
    const error = (err: Error): void => errorSubject.next(err);
    module.exec(error, JSON.stringify({ _type: 'lit_int', val: 42 }));
});
