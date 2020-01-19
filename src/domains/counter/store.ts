import { reducerStore } from '@fleur/fleur';

import { counterActions } from './actions';

interface State {
    count: number;
}

export const store = reducerStore<State>('counterStore', () => ({
    count: 0,
}))
    .listen(counterActions.increase, (draft, payload) => {
        draft.count += payload.amount;
    })
    .listen(counterActions.decrease, (draft, payload) => {
        draft.count -= payload.amount;
    });
