import type { RoundedBox } from "./lineGenerator";
import { atom } from 'nanostores';

export const boxesStore = atom<[RoundedBox, number][]>([]);