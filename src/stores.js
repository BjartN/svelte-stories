import { writable } from 'svelte/store';

export const pageStore = writable('main');
export const storyStore = writable(undefined);
