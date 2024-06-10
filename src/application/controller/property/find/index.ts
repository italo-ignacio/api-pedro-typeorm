import { IsNull } from 'typeorm';
import { getGenericFilter, getPagination, messageErrorResponse, ok } from '@main/utils';
import { propertyFindParams } from '@data/search';
import { propertyListQueryFields } from '@data/validation';
import { propertyRepository } from '@repository/property';
import type { Controller } from '@domain/protocols';
import type { Request, Response } from 'express';
import type { propertyQueryFields } from '@data/validation';

/**
 * @typedef {object} FindPropertyPayload
 * @property {array<Property>} content
 * @property {integer} totalElements
 * @property {integer} totalPages
 */

/**
 * @typedef {object} FindPropertyResponse
 * @property {Messages} message
 * @property {string} status
 * @property {FindPropertyPayload} payload
 */

/**
 * GET /property
 * @summary Find Properties
 * @tags Property
 * @security BearerAuth
 * @param {string} name.query
 * @param {number} totalAreaMoreThan.query
 * @param {number} totalAreaLessThan.query
 * @param {integer} userId.query
 * @param {integer} page.query
 * @param {integer} limit.query
 * @param {string} startDate.query (Ex: 2024-01-01).
 * @param {string} endDate.query (Ex: 2024-01-01).
 * @param {string} orderBy.query - enum:id,name,totalArea,createdAt,updatedAt
 * @param {string} sort.query - enum:asc,desc
 * @param {boolean} history.query
 * @return {FindPropertyResponse} 200 - Successful response - application/json
 * @return {BadRequestResponse} 400 - Bad request response - application/json
 * @return {UnauthorizedResponse} 401 - Unauthorized response - application/json
 */
export const findPropertyController: Controller =
  () =>
  async ({ query }: Request, response: Response) => {
    try {
      const { skip, take } = getPagination({ query });
      const { order, where } = getGenericFilter<propertyQueryFields>({
        list: propertyListQueryFields,
        query
      });

      const [content, totalElements] = await propertyRepository.findAndCount({
        order,
        select: propertyFindParams({}),
        skip,
        take,
        where: {
          ...where,
          user: { finishedAt: IsNull() }
        }
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
