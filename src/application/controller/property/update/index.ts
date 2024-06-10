import { forbidden, messageErrorResponse, ok } from '@main/utils';
import { messages } from '@domain/helpers';
import { propertyRepository } from '@infra/repository';
import { updatePropertySchema } from '@data/validation';
import { userIsOwnerOfProperty } from '@application/helper';
import type { Controller } from '@domain/protocols';
import type { Request, Response } from 'express';

interface Body {
  name?: string;
  totalArea?: number;
}

/**
 * @typedef {object} UpdatePropertyBody
 * @property {string} name
 * @property {number} totalArea
 */

/**
 * PUT /property/{id}
 * @summary Update Property
 * @tags Property
 * @security BearerAuth
 * @param {UpdatePropertyBody} request.body
 * @param {integer} id.path.required
 * @return {UpdateResponse} 200 - Successful response - application/json
 * @return {BadRequestResponse} 400 - Bad request response - application/json
 * @return {UnauthorizedResponse} 401 - Unauthorized response - application/json
 * @return {ForbiddenResponse} 403 - Forbidden response - application/json
 */
export const updatePropertyController: Controller =
  () => async (request: Request, response: Response) => {
    try {
      await updatePropertySchema.validate(request, { abortEarly: false });

      if (!(await userIsOwnerOfProperty(request)))
        return forbidden({
          message: { english: 'update this property', portuguese: 'atualizar esta propriedade' },
          response
        });

      const { name, totalArea } = request.body as Body;

      await propertyRepository.update({ id: request.params.id }, { name, totalArea });

      return ok({ payload: messages.default.successfullyUpdated, response });
    } catch (error) {
      return messageErrorResponse({
        error,
        response
      });
    }
  };
