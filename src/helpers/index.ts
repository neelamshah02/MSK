import { SortingOption } from '../types';
import { SortingDirection } from '../common/enum';

export { default as FormHelper } from './FormHelper';

export const sortObjects = (list: any[], { key, direction }: SortingOption) => {
  if (direction === SortingDirection.NONE) return list;

  function comparator(a, b) {
    a = a[key];
    b = b[key];

    const type = typeof a === 'string' || typeof b === 'string' ? 'string' : 'number';
    return type === 'string' ? a.localeCompare(b) : a - b;
  }

  const result = list.sort(comparator);
  return direction === SortingDirection.ASC ? result : result.reverse();
};
