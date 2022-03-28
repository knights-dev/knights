import { css } from '@emotion/react';
import { useFleurContext, useStore } from '@fleur/react';
import { useCallback, useEffect } from 'react';
import { Subject } from 'rxjs';

import init, { exec } from '../../../interp-wasm';
import { counterOps } from '../domains/counter/operations';
import { selectCount } from '../domains/counter/selectors';
import { Editor } from './Editor';

export const AppRoot: React.VFC = () => {
    useEffect(() => {
        const errorSubject = new Subject<Error>();

        const subscription = errorSubject.subscribe({
            next(err: Error) {
                console.error(err);
            },
        });

        init().then(() => {
            const error = (err: Error): void => errorSubject.next(err);
            exec(error, JSON.stringify({ _type: 'lit_int', val: 42 }));
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const context = useFleurContext();

    const inc = useCallback(() => {
        context.executeOperation(counterOps.increase, 1);
    }, []);

    const dec = useCallback(() => {
        context.executeOperation(counterOps.decrease, 1);
    }, []);

    const count = useStore((getStore) => {
        return selectCount(getStore);
    });

    return (
        <>
            <p
                css={css`
                    color: #088;
                `}
            >
                Count: {count}
            </p>
            <button onClick={inc}>inc</button>
            <button onClick={dec}>dec</button>
            <Editor />
        </>
    );
};
