/* eslint-disable no-undefined */
import { ValidationError } from 'yup';
import { errorLogger } from '@main/utils/error-logger';
import { formatYupError } from '@main/utils/yup-resolver-errors';
import { messages, statusCodeList } from '@domain/helpers';
import type { PrettyYupError } from '@main/utils/yup-resolver-errors';
import type { Response } from 'express';
import type { messageTypeResponse } from '@domain/errors';

export const created = ({
  response,
  payload = {}
}: {
  response: Response;
  payload?: object;
}): Response =>
  response.status(statusCodeList.CREATED).json({
    errors: [],
    message: messages.default.ok,
    payload,
    status: 'request successfully'
  });

export const ok = ({
  response,
  payload = {}
}: {
  response: Response;
  payload?: object;
}): Response =>
  response.status(statusCodeList.OK).json({
    errors: [],
    message: messages.default.ok,
    payload,
    status: 'request successfully'
  });

export const badRequest = ({
  response,
  message = messages.default.badRequest,
  errors = [],
  payload = {}
}: {
  response: Response;
  message?: messageTypeResponse;
  errors?: PrettyYupError[] | [];
  payload?: object;
}): Response =>
  response.status(statusCodeList.BAD_REQUEST).json({
    errors,
    message,
    payload,
    status: 'bad request'
  });

export const notFound = ({
  entity,
  response,
  message = messages.default.notFound(entity),
  payload = {},
  errors = []
}: {
  entity: messageTypeResponse;
  response: Response;
  message?: messageTypeResponse;
  payload?: object;
  errors?: PrettyYupError[] | [];
}): Response =>
  response.status(statusCodeList.NOT_FOUND).json({
    errors,
    message,
    payload,
    status: 'not found'
  });

export const unauthorized = ({
  response,
  message = messages.default.unauthorized,
  errors = [],
  payload = {}
}: {
  response: Response;
  message?: messageTypeResponse;
  errors?: PrettyYupError[] | [];
  payload?: object;
}): Response =>
  response.status(statusCodeList.NOT_AUTHORIZED).json({
    errors,
    message,
    payload,
    status: 'unauthorized'
  });

export const forbidden = ({
  response,
  message,
  errors = [],
  payload = {}
}: {
  response: Response;
  message: {
    english: string;
    portuguese: string;
  };
  errors?: PrettyYupError[] | [];
  payload?: object;
}): Response =>
  response.status(statusCodeList.FORBIDDEN).json({
    errors,
    message: messages.auth.notPermission(message),
    payload,
    status: 'forbidden'
  });

export const timeout = ({
  response,
  message = messages.default.timeout,
  errors = [],
  payload = {}
}: {
  response: Response;
  message?: messageTypeResponse;
  errors?: PrettyYupError[] | [];
  payload?: object;
}): Response =>
  response.status(statusCodeList.TIMEOUT).json({
    errors,
    message,
    payload,
    status: 'timeout'
  });

export const validationErrorResponse = ({
  error,
  response
}: {
  error: ValidationError;
  response: Response;
}): Response =>
  badRequest({
    errors: formatYupError(error),
    message: messages.default.validationErrorResponse,
    response
  });

export const messageErrorResponse = ({
  error,
  response
}: {
  error: unknown;
  response: Response;
}): Response => {
  errorLogger(error);

  if (error instanceof ValidationError) return validationErrorResponse({ error, response });

  const newError = error as { message?: string; meta?: { cause: string; modelName: string } };
  let message: messageTypeResponse | undefined;

  if (error instanceof Error)
    message =
      typeof newError.message === 'undefined'
        ? undefined
        : {
            english: newError.message,
            portuguese: 'Erro interno do servidor...'
          };

  return badRequest({
    message,
    response
  });
};
