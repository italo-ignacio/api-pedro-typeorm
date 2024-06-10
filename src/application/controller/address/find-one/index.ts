import { addressFindParams } from '@data/search';
import { addressRepository } from '@infra/repository';
import { messageErrorResponse, notFound, ok } from '@main/utils';
import type { Controller } from '@domain/protocols';
import type { Request, Response } from 'express';

/**
 * @typedef {object} FindOneAddressResponse
 * @property {Messages} message
 * @property {string} status
 * @property {Address} payload
 */

/**
 * GET /address/{id}
 * @summary Find one Address
 * @tags Address
 * @security BearerAuth
 * @param {integer} id.path.required
 * @return {FindOneAddressResponse} 200 - Successful response - application/json
 * @return {BadRequestResponse} 400 - Bad request response - application/json
 * @return {UnauthorizedResponse} 401 - Unauthorized response - application/json
 * @return {NotFoundRequest} 404 - Not found response - application/json
 */
export const findOneAddressController: Controller =
  () => async (request: Request, response: Response) => {
    try {
      const payload = await addressRepository.findOne({
        select: addressFindParams({}),
        where: { id: request.params.id }
      });

      if (payload === null)
        return notFound({
          entity: { english: 'Address', portuguese: 'Endereço' },
          response
        });

      return ok({
        payload,
        response
      });
    } catch (error) {
      return messageErrorResponse({ error, response });
    }
  };
