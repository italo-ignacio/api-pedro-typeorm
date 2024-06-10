import { numberRequired, stringRequired } from '@main/utils';
import { yup } from '@infra/yup';

export const flockSchema = yup.object().shape({
  name: stringRequired({
    english: 'name',
    length: 255,
    portuguese: 'nome'
  }),
  propertyId: numberRequired({
    english: 'property id',
    portuguese: 'id da propriedade'
  })
});

export const insertFlockSchema = yup.object().shape({
  body: flockSchema
});
