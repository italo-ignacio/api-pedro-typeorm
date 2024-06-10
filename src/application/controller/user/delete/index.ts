import { forbidden, messageErrorResponse, ok } from '@main/utils';
import { messages } from '@domain/helpers';
import { userIsOwner } from '@application/helper';
import { userRepository } from '@repository/user';
import type { Controller } from '@domain/protocols';
import type { Request, Response } from 'express';

/**
 * DELETE /user/{id}
 * @summary Delete User
 * @tags User
 * @security BearerAuth
 * @param {string} id.path.required
 * @return {DeleteResponse} 200 - Successful response - application/json
 * @return {BadRequestResponse} 400 - Bad request response - application/json
 * @return {UnauthorizedResponse} 401 - Unauthorized response - application/json
 * @return {ForbiddenResponse} 403 - Forbidden response - application/json
 */
export const deleteUserController: Controller =
  () => async (request: Request, response: Response) => {
    try {
      if (!userIsOwner(request))
        return forbidden({
          message: { english: 'delete this user', portuguese: 'deletar este usuário' },
          response
        });

      await userRepository.update({ id: request.params.id }, { finishedAt: new Date() });

      return ok({ payload: messages.default.successfullyDeleted, response });
    } catch (error) {
      return messageErrorResponse({
        error,
        response
      });
    }
  };
