//https://netbasal.com/supercharge-your-svelte-state-management-with-akita-f1f9de5ef43d

import { createEntityStore } from '@datorama/akita';

//create store with initial state and name
export const storiesStore = createEntityStore([], {
    name: "stories"
});
