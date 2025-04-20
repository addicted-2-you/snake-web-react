import { TArrowKey } from '../model/keys';

export const ARROW_KEYS = [
  'ArrowUp',
  'ArrowRight',
  'ArrowDown',
  'ArrowLeft',
] as const;

export const OPPOSITE_KEYS_MAP: { [key in TArrowKey]: TArrowKey } = {
  ArrowUp: 'ArrowDown',
  ArrowRight: 'ArrowLeft',
  ArrowDown: 'ArrowUp',
  ArrowLeft: 'ArrowRight',
};
