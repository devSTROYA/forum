import { shallowEqualArrays, shallowEqualObjects } from 'shallow-equal';

export class ShallowEqual {
  static compareObject(firstObject: object, objectToCompare: object): boolean {
    return shallowEqualObjects(firstObject, objectToCompare);
  }

  static compareArray(firstArray: string[], arrayToCompare: string[]): boolean;
  static compareArray(firstArray: number[], arrayToCompare: number[]): boolean;
  static compareArray(firstArray: unknown[], arrayToCompare: unknown[]): boolean {
    return shallowEqualArrays(firstArray, arrayToCompare);
  }
}
