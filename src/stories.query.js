import { createEntityQuery } from '@datorama/akita';
import { storiesStore } from './stories.store';

export const storyEntityQuery = createEntityQuery(storiesStore);
export const storiesQuery = storyEntityQuery.selectAll();
