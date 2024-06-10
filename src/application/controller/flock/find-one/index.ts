import { flockFindParams } from '@data/search';
import { flockRepository } from '@repository/flock';
import { messageErrorResponse, notFound, ok } from '@main/utils';
import type { Controller } from '@domain/protocols';
import type { Request, Response } from 'express';

/**
 * @typedef {object} FindOneFlockResponse
 * @property {Messages} message
 * @property {string} status
 * @property {Flock} payload
 */

/**
 * GET /flock/{id}
 * @summary Find one Flock
 * @tags Flock
 * @security BearerAuth
 * @param {integer} id.path.required
 * @return {FindOneFlockResponse} 200 - Successful response - application/json
 * @return {BadRequestResponse} 400 - Bad request response - application/json
 * @return {UnauthorizedResponse} 401 - Unauthorized response - application/json
 * @return {NotFoundRequest} 404 - Not found response - application/json
 */
export const findOneFlockController: Controller =
  () => async (request: Request, response: Response) => {
    try {
      const payload = await flockRepository.findOne({
        select: flockFindParams({}),
        where: { id: request.params.id }
      });

      if (payload === null)
        return notFound({
          entity: { english: 'Flock', portuguese: 'Rebanho' },
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
