import { addressFindParams } from '@data/search';
import { addressListQueryFields } from '@data/validation';
import { addressRepository } from '@infra/repository';
import { getGenericFilter, getPagination, messageErrorResponse, ok } from '@main/utils';
import type { Controller } from '@domain/protocols';
import type { Request, Response } from 'express';
import type { addressQueryFields } from '@data/validation';

/**
 * @typedef {object} FindAddressPayload
 * @property {array<Address>} content
 * @property {integer} totalElements
 * @property {integer} totalPages
 */

/**
 * @typedef {object} FindAddressResponse
 * @property {Messages} message
 * @property {string} status
 * @property {FindAddressPayload} payload
 */

/**
 * GET /address
 * @summary Find Address
 * @tags Address
 * @security BearerAuth
 * @param {string} city.query
 * @param {string} number.query
 * @param {string} state.query
 * @param {string} street.query
 * @param {string} zipCode.query
 * @param {integer} page.query
 * @param {integer} limit.query
 * @param {string} startDate.query (Ex: 2024-01-01).
 * @param {string} endDate.query (Ex: 2024-01-01).
 * @param {string} orderBy.query - enum:id,city,number,state,street,zipCode,createdAt,updatedAt
 * @param {string} sort.query - enum:asc,desc
 * @param {boolean} history.query
 * @return {FindAddressResponse} 200 - Successful response - application/json
 * @return {BadRequestResponse} 400 - Bad request response - application/json
 * @return {UnauthorizedResponse} 401 - Unauthorized response - application/json
 */
export const findAddressController: Controller =
  () =>
  async ({ query }: Request, response: Response) => {
    try {
      const { skip, take } = getPagination({ query });
      const { order, where } = getGenericFilter<addressQueryFields>({
        list: addressListQueryFields,
        query
      });

      const [content, totalElements] = await addressRepository.findAndCount({
        order,
        select: addressFindParams({}),
        skip,
        take,
        where
      });

      return ok({
        payload: {
          content,
          totalElements,
          totalPages: Math.ceil(totalElements / take)
        },
        response
      });
    } catch (error) {
      return messageErrorResponse({ error, response });
    }
  };
