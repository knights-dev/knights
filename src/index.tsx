import Fleur, { action, actions, operations, reducerStore, selector } from '@fleur/fleur';
import { FleurContext, useFleurContext, useStore } from '@fleur/react';
import React, { useCallback } from 'react';
import ReactDOM from 'react-dom';

interface State {
    count: number;
}

const counterActions = actions('Counter', {
    increase: action<{ amount: number }>(),
    decrease: action<{ amount: number }>(),
});

const counterOps = operations({
    increase(ctx, amount: number) {
        ctx.dispatch(counterActions.increase, { amount });
    },
    decrease(ctx, amount: number) {
        ctx.dispatch(counterActions.decrease, { amount });
    },
});

const store = reducerStore<State>('counterStore', () => ({
    count: 0,
}))
    .listen(counterActions.increase, (draft, payload) => {
        draft.count += payload.amount;
    })
    .listen(counterActions.decrease, (draft, payload) => {
        draft.count -= payload.amount;
    });

const selectCount = selector(getState => getState(store).count);

const App: React.FC = () => {
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
        <>
            <p>Count: {count}</p>
            <button onClick={inc}>inc</button>
            <button onClick={dec}>dec</button>
        </>
    );
};

const app = new Fleur({
    stores: [store],
});

const context = app.createContext();

ReactDOM.render(
    <FleurContext value={context}>
        <App />
    </FleurContext>,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    document.getElementById('app')!
);
