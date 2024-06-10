export type propertyQueryFields =
  | 'name'
  | 'totalArea'
  | 'totalAreaLessThan'
  | 'totalAreaMoreThan'
  | 'userId';

export const propertyListQueryFields: propertyQueryFields[] = [
  'name',
  'totalAreaMoreThan',
  'totalAreaLessThan',
  'totalArea',
  'userId'
];
