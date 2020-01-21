import { action, actions } from '@fleur/fleur';

export const counterActions = actions('Counter', {
    increase: action<{ amount: number }>(),
    decrease: action<{ amount: number }>(),
});
