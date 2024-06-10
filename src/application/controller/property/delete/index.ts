import { forbidden, messageErrorResponse, ok } from '@main/utils';
import { messages } from '@domain/helpers';
import { propertyRepository } from '@repository/property';
import { userIsOwnerOfProperty } from '@application/helper';
import type { Controller } from '@domain/protocols';
import type { Request, Response } from 'express';

/**
 * DELETE /property/{id}
 * @summary Delete Property
 * @tags Property
 * @security BearerAuth
 * @param {string} id.path.required
 * @return {DeleteResponse} 200 - Successful response - application/json
 * @return {BadRequestResponse} 400 - Bad request response - application/json
 * @return {UnauthorizedResponse} 401 - Unauthorized response - application/json
 * @return {ForbiddenResponse} 403 - Forbidden response - application/json
 */
export const deletePropertyController: Controller =
  () => async (request: Request, response: Response) => {
    try {
      if (!(await userIsOwnerOfProperty(request)))
        return forbidden({
          message: { english: 'delete this property', portuguese: 'deletar esta propriedade' },
          response
        });

      await propertyRepository.update({ id: request.params.id }, { finishedAt: new Date() });

      return ok({ payload: messages.default.successfullyDeleted, response });
    } catch (error) {
      return messageErrorResponse({
        error,
        response
      });
    }
  };
