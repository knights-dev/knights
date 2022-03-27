import { operations } from '@fleur/fleur';

import { counterActions } from './actions';

export const counterOps = operations({
    increase(ctx, amount: number) {
        ctx.dispatch(counterActions.increase, { amount });
    },
    decrease(ctx, amount: number) {
        ctx.dispatch(counterActions.decrease, { amount });
    },
});
