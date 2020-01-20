/* @jsx jsx */
import { jsx } from '@emotion/core';
import { useFleurContext, useStore } from '@fleur/react';
import React, { useCallback } from 'react';

import { counterOps } from '../domains/counter/operations';
import { selectCount } from '../domains/counter/selectors';

export const AppRoot: React.FC = () => {
    const context = useFleurContext();

    const inc = useCallback(() => {
        context.executeOperation(counterOps.increase, 1);
    }, []);

    const dec = useCallback(() => {
        context.executeOperation(counterOps.decrease, 1);
    }, []);

    const count = useStore(getStore => {
        return selectCount(getStore);
    });

    return (
        <React.Fragment>
            <p css={{ color: '#008888' }}>Count: {count}</p>
            <button onClick={inc}>inc</button>
            <button onClick={dec}>dec</button>
        </React.Fragment>
    );
};
