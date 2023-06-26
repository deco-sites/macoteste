import { signal } from "@preact/signals";

const freeShipping = signal<number>(0);

const state = freeShipping
export const useFreeShipping = () => state