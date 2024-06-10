import { badRequest, messageErrorResponse, ok } from '@main/utils';
import { env } from '@main/config';
import { hasUserByEmail } from '@application/helper';
import { hash } from 'bcrypt';
import { insertUserSchema } from '@data/validation';
import { messages } from '@domain/helpers';
import { userRepository } from '@infra/repository';
import type { Controller } from '@domain/protocols';
import type { Request, Response } from 'express';

interface Body {
  name: string;
  email: string;
  password: string;
  phone: string;
}

/**
 * @typedef {object} InsertUserBody
 * @property {string} name.required
 * @property {string} email.required
 * @property {string} password.required
 * @property {string} phone.required
 */

/**
 * POST /user
 * @summary Insert User
 * @tags User
 * @example request - payload example
 * {
 *   "name": "support",
 *   "phone": "(00) 00000-0000",
 *   "email": "support@support",
 *   "password": "123456"
 * }
 * @param {InsertResponse} request.body.required
 * @return {InsertResponse} 200 - Successful response - application/json
 * @return {BadRequestResponse} 400 - Bad request response - application/json
 */
export const insertUserController: Controller =
  () => async (request: Request, response: Response) => {
    try {
      await insertUserSchema.validate(request, { abortEarly: false });

      const { email, name, password, phone } = request.body as Body;

      if (await hasUserByEmail(email))
        return badRequest({
          message: messages.default.alreadyExists({ english: 'User', portuguese: 'Usuário' }),
          response
        });

      const { HASH_SALT } = env;

      const hashedPassword = await hash(password, HASH_SALT);

      await userRepository.insert({
        email,
        name,
        password: hashedPassword,
        phone: phone.replace(/\D/gu, '')
      });

      return ok({ payload: messages.default.successfullyCreated, response });
    } catch (error) {
      return messageErrorResponse({ error, response });
    }
  };
