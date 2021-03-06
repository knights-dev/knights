/* @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useFleurContext, useStore } from '@fleur/react';
import React, { useCallback } from 'react';

import { counterOps } from '../domains/counter/operations';
import { selectCount } from '../domains/counter/selectors';
import { Editor } from './Editor';

export const AppRoot = (): JSX.Element => {
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
        <React.Fragment>
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
        </React.Fragment>
    );
};
