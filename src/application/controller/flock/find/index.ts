import { flockFindParams } from '@data/search';
import { flockListQueryFields } from '@data/validation';
import { flockRepository } from '@infra/repository';
import { getGenericFilter, getPagination, messageErrorResponse, ok } from '@main/utils';
import type { Controller } from '@domain/protocols';
import type { Request, Response } from 'express';
import type { flockQueryFields } from '@data/validation';

/**
 * @typedef {object} FindFlockPayload
 * @property {array<Flock>} content
 * @property {integer} totalElements
 * @property {integer} totalPages
 */

/**
 * @typedef {object} FindFlockResponse
 * @property {Messages} message
 * @property {string} status
 * @property {FindFlockPayload} payload
 */

/**
 * GET /flock
 * @summary Find Flocks
 * @tags Flock
 * @security BearerAuth
 * @param {string} name.query
 * @param {number} propertyId.query
 * @param {integer} page.query
 * @param {integer} limit.query
 * @param {string} startDate.query (Ex: 2024-01-01).
 * @param {string} endDate.query (Ex: 2024-01-01).
 * @param {string} orderBy.query - enum:id,name,propertyId,totalCalves,totalCows,totalHeifers,totalOthers,createdAt,updatedAt
 * @param {string} sort.query - enum:asc,desc
 * @param {boolean} history.query
 * @return {FindFlockResponse} 200 - Successful response - application/json
 * @return {BadRequestResponse} 400 - Bad request response - application/json
 * @return {UnauthorizedResponse} 401 - Unauthorized response - application/json
 */
export const findFlockController: Controller =
  () =>
  async ({ query }: Request, response: Response) => {
    try {
      const { skip, take } = getPagination({ query });
      const { order, where } = getGenericFilter<flockQueryFields>({
        list: flockListQueryFields,
        query
      });

      const [content, totalElements] = await flockRepository.findAndCount({
        order,
        select: flockFindParams({}),
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
