import { createEntityQuery } from '@datorama/akita';
import { storiesStore } from './store.js';

export const storyEntityQuery = createEntityQuery(storiesStore);
export const storiesQuery = storyEntityQuery.selectAll();
