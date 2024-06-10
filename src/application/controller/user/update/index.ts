import { badRequest, forbidden, messageErrorResponse, ok } from '@main/utils';
import { env } from '@main/config';
import { hasUserByEmail, userIsOwner } from '@application/helper';
import { hash } from 'bcrypt';
import { messages } from '@domain/helpers';
import { updateUserSchema } from '@data/validation';
import { userRepository } from '@infra/repository';
import type { Controller } from '@domain/protocols';
import type { Request, Response } from 'express';

interface Body {
  password?: string;
  email?: string;
  name?: string;
  phone?: string;
}

/**
 * @typedef {object} UpdateUserBody
 * @property {string} name
 * @property {string} email
 * @property {string} password
 * @property {string} phone
 */

/**
 * PUT /user/{id}
 * @summary Update User
 * @tags User
 * @security BearerAuth
 * @param {UpdateUserBody} request.body
 * @param {string} id.path.required
 * @return {UpdateResponse} 200 - Successful response - application/json
 * @return {BadRequestResponse} 400 - Bad request response - application/json
 * @return {UnauthorizedResponse} 401 - Unauthorized response - application/json
 * @return {ForbiddenResponse} 403 - Forbidden response - application/json
 */
export const updateUserController: Controller =
  () => async (request: Request, response: Response) => {
    try {
      await updateUserSchema.validate(request, { abortEarly: false });

      if (!userIsOwner(request))
        return forbidden({
          message: { english: 'update this user', portuguese: 'atualizar este usuário' },
          response
        });

      const { email, name, password, phone } = request.body as Body;

      if (await hasUserByEmail(email))
        return badRequest({
          message: messages.default.alreadyExists({ english: 'User', portuguese: 'Usuário' }),
          response
        });

      let newPassword: string | undefined;

      if (typeof password === 'string') {
        const { HASH_SALT } = env;

        const hashedPassword = await hash(password, HASH_SALT);

        newPassword = hashedPassword;
      }

      let newPhone: string | undefined;

      if (typeof phone === 'string') newPhone = phone.replace(/\D/gu, '');

      await userRepository.update(
        { id: request.params.id },
        { email, name, password: newPassword, phone: newPhone }
      );

      return ok({ payload: messages.default.successfullyUpdated, response });
    } catch (error) {
      return messageErrorResponse({
        error,
        response
      });
    }
  };
