import { createStore } from 'polotno/model/store';

export const store = createStore({
    key: 'vnvCAfGkpYs-vZp6I45q',
    showCredit: true,
});

export const page = store.addPage();
page.set({
    width: 1000, // in pixels. You can use 'auto' to inherit width from the store
    height: 1000, // in pixels. You can use 'auto' to inherit height from the store
});