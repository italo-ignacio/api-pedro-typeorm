/* eslint-disable sort-keys-fix/sort-keys-fix */
import { IsNull } from 'typeorm';
import { flockRepository } from '@infra/repository';
import { forbidden, messageErrorResponse, ok } from '@main/utils';
import { insertFlockSchema } from '@data/validation';
import { messages } from '@domain/helpers';
import { userIsOwnerOfProperty } from '@application/helper';
import type { Controller } from '@domain/protocols';
import type { Request, Response } from 'express';

interface Body {
  name: string;
  propertyId: string;
}

/**
 * @typedef {object} InsertFlockBody
 * @property {string} name.required
 * @property {string} propertyId.required
 */

/**
 * POST /flock
 * @summary Insert Flock
 * @tags Flock
 * @security BearerAuth
 * @param {InsertFlockBody} request.body.required
 * @return {InsertResponse} 200 - Successful response - application/json
 * @return {BadRequestResponse} 400 - Bad request response - application/json
 */
export const insertFlockController: Controller =
  () => async (request: Request, response: Response) => {
    try {
      await insertFlockSchema.validate(request, { abortEarly: false });

      const { name, propertyId } = request.body as Body;

      if (!(await userIsOwnerOfProperty(request, propertyId)))
        return forbidden({
          message: {
            english: 'register a flock on a property other than your own',
            portuguese: 'registrar um rebanho em uma propriedade que não seja a sua'
          },
          response
        });

      // REFACTOR: If not has only one flock per property

      await flockRepository.update(
        { finishedAt: IsNull(), property: { id: propertyId } },
        { finishedAt: new Date() }
      );

      await flockRepository.insert({
        name,
        property: { id: propertyId }
      });

      return ok({ payload: messages.default.successfullyCreated, response });
    } catch (error) {
      return messageErrorResponse({ error, response });
    }
  };
