import { flockRepository, projectRepository } from '@infra/repository';
import { forbidden, messageErrorResponse, ok } from '@main/utils';
import { messages } from '@domain/helpers';
import { updateFlockSchema } from '@data/validation';
import { userIsOwnerOfFlock } from '@application/helper';
import type { Controller } from '@domain/protocols';
import type { Request, Response } from 'express';

interface Body {
  name?: string;
}

/**
 * @typedef {object} UpdateFlockBody
 * @property {string} name
 */

/**
 * PUT /flock/{id}
 * @summary Update Flock
 * @tags Flock
 * @security BearerAuth
 * @param {UpdateFlockBody} request.body
 * @param {string} id.path.required
 * @return {UpdateResponse} 200 - Successful response - application/json
 * @return {BadRequestResponse} 400 - Bad request response - application/json
 * @return {UnauthorizedResponse} 401 - Unauthorized response - application/json
 * @return {ForbiddenResponse} 403 - Forbidden response - application/json
 */
export const updateFlockController: Controller =
  () => async (request: Request, response: Response) => {
    try {
      await updateFlockSchema.validate(request, { abortEarly: false });

      if (!(await userIsOwnerOfFlock(request)))
        return forbidden({
          message: { english: 'update this flock', portuguese: 'atualizar este rebanho' },
          response
        });

      const project = await projectRepository.count({
        where: { flock: { id: request.params.id } }
      });

      const { name } = request.body as Body;

      // Case has a project create a new flock
      if (project > 0) {
        await flockRepository.update({ id: request.params.id }, { finishedAt: new Date() });

        const oldFlock = await flockRepository.findOne({
          select: { name: true, property: { id: true } },
          where: { id: request.params.id }
        });

        await flockRepository.insert({
          name: name ?? oldFlock!.name,
          property: { id: oldFlock!.id }
        });
      } else await flockRepository.update({ id: request.params.id }, { name });

      return ok({ payload: messages.default.successfullyUpdated, response });
    } catch (error) {
      return messageErrorResponse({ error, response });
    }
  };
