//https://netbasal.com/supercharge-your-svelte-state-management-with-akita-f1f9de5ef43d

import { createEntityStore } from '@datorama/akita';

const initialState = [{
    id: 1,
    color: 'red',
    title: 'Initial State',
    tasks: []
}];

export const storiesStore = createEntityStore(initialState, {
    name: "stories"
});
