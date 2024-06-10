import { addressRepository } from '@repository/address';
import { forbidden, messageErrorResponse, notFound, ok } from '@main/utils';
import { messages } from '@domain/helpers';
import { propertyRepository } from '@repository/property';
import { updateAddressSchema } from '@data/validation';
import { userIsOwnerOfProperty } from '@application/helper';
import type { Controller } from '@domain/protocols';
import type { Request, Response } from 'express';

export interface InsertAddressBody {
  zipCode: string;
  state: string;
  city: string;
  street: string;
  number: number;
}

/**
 * @typedef {object} UpdateAddressBody
 * @property {string} zipCode
 * @property {string} state
 * @property {string} city
 * @property {string} street
 * @property {number} number
 */

/**
 * PUT /address/{id}
 * @summary Update Address
 * @tags Address
 * @security BearerAuth
 * @param {UpdateAddressBody} request.body
 * @param {integer} id.path.required
 * @return {UpdateResponse} 200 - Successful response - application/json
 * @return {BadRequestResponse} 400 - Bad request response - application/json
 * @return {UnauthorizedResponse} 401 - Unauthorized response - application/json
 * @return {ForbiddenResponse} 403 - Forbidden response - application/json
 */
export const updateAddressController: Controller =
  () => async (request: Request, response: Response) => {
    try {
      await updateAddressSchema.validate(request, { abortEarly: false });

      const property = await propertyRepository.findOne({
        select: { id: true },
        where: { address: { id: request.params.id } }
      });

      if (property === null)
        return notFound({
          entity: {
            english: 'Property',
            portuguese: 'Propriedade'
          },
          response
        });

      if (!(await userIsOwnerOfProperty(request, property.id)))
        return forbidden({
          message: { english: 'update this address', portuguese: 'atualizar este endereço' },
          response
        });

      const { city, number, state, street, zipCode } = request.body as Partial<InsertAddressBody>;

      let formattedNumber: string | undefined;

      if (typeof number !== 'undefined') formattedNumber = String(number);

      await addressRepository.update(
        { id: request.params.id },
        { city, number: formattedNumber, state, street, zipCode }
      );

      return ok({ payload: messages.default.successfullyUpdated, response });
    } catch (error) {
      return messageErrorResponse({ error, response });
    }
  };
