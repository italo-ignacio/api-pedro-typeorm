/* eslint-disable sort-keys-fix/sort-keys-fix */
import { Role } from '@domain/enum';
import { forbidden, messageErrorResponse, notFound, ok } from '@main/utils';
import { hasUserById } from '@application/helper';
import { insertPropertySchema } from '@data/validation';
import { messages } from '@domain/helpers';
import { propertyRepository } from '@infra/repository';
import type { Controller } from '@domain/protocols';
import type { InsertAddressBody } from '@application/controller/address';
import type { Request, Response } from 'express';

interface Body {
  name: string;
  totalArea: number;
  address: InsertAddressBody;
  userId?: string;
}

/**
 * @typedef {object} InsertAddressBody
 * @property {string} zipCode.required
 * @property {string} state.required
 * @property {string} city.required
 * @property {string} street.required
 * @property {number} number.required
 */

/**
 * @typedef {object} InsertPropertyBody
 * @property {string} name.required
 * @property {number} totalArea.required
 * @property {InsertAddressBody} address.required
 */

/**
 * POST /property
 * @summary Insert Property
 * @tags Property
 * @security BearerAuth
 * @param {InsertPropertyBody} request.body.required
 * @return {InsertResponse} 200 - Successful response - application/json
 * @return {BadRequestResponse} 400 - Bad request response - application/json
 */
export const insertPropertyController: Controller =
  () => async (request: Request, response: Response) => {
    try {
      await insertPropertySchema.validate(request, { abortEarly: false });

      const {
        totalArea,
        name,
        address: { city, number, state, street, zipCode },
        userId
      } = request.body as Body;

      if (
        typeof userId !== 'undefined' &&
        request.user.role !== Role.ADMIN &&
        request.user.id !== userId
      )
        return forbidden({
          message: {
            english: 'register a property to another user',
            portuguese: 'cadastrar uma propriedade para outro usuário'
          },
          response
        });

      if (typeof userId !== 'undefined' && !(await hasUserById(userId)))
        return notFound({ entity: { english: 'User', portuguese: 'Usuário' }, response });

      await propertyRepository.save({
        name,
        totalArea,
        user: { id: userId ?? request.user.id },
        address: {
          city,
          state,
          street,
          number: String(number),
          zipCode: zipCode.replace(/\D/gu, '')
        }
      });

      return ok({ payload: messages.default.successfullyCreated, response });
    } catch (error) {
      return messageErrorResponse({ error, response });
    }
  };
