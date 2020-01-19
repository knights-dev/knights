import { selector } from '@fleur/fleur';

import { store } from './store';

export const selectCount = selector(getState => getState(store).count);
