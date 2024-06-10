import { Between, ILike, IsNull, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';

interface GetPageAndLimitInput<QueryType extends string> {
  query: {
    [key in QueryType]?: string;
  } & {
    orderBy?: QueryType;
    sort?: 'asc' | 'desc';
    startDate?: string;
    endDate?: string;
    history?: string;
  };
  list: QueryType[];
}

interface GetPageAndLimitOutput {
  order: object;
  where: object;
}

const isObjectEmpty = (obj: object): boolean => Object.keys(obj).length === 0;

const getDate = (item: string, isEnd?: boolean): Date | null => {
  const date = new Date(item?.trim());

  if (isNaN(date.getTime())) return null;

  if (date.toISOString().endsWith('T00:00:00.000Z')) {
    if (isEnd ?? false) {
      date.setTime(date.getTime() + date.getTimezoneOffset() * 60000);
      date.setUTCHours(23, 59, 59, 999);
      return date;
    }

    return date;
  }

  if (isEnd ?? false) {
    date.setSeconds(59, 999);
    return date;
  }

  date.setSeconds(0, 0);
  return date;
};

interface queryProps {
  orderBy: string;
  sort?: 'asc' | 'desc';
}

const checkOrder = (query: queryProps, list: string[]): boolean =>
  typeof query.sort === 'string' &&
  (query.sort === 'asc' || query.sort === 'desc') &&
  (query.orderBy === 'createdAt' ||
    query.orderBy === 'id' ||
    query.orderBy === 'updatedAt' ||
    list.includes(query.orderBy));

export const getGenericFilter = <QueryType extends string>({
  query,
  list
}: GetPageAndLimitInput<QueryType>): GetPageAndLimitOutput => {
  const orderBy = {};
  const where: object = {};

  if (String(query.history) !== 'true') Object.assign(where, { finishedAt: IsNull() });

  let startDate = null;
  let endDate = null;

  if (typeof query.startDate === 'string') startDate = getDate(query.startDate);

  if (typeof query.endDate === 'string') endDate = getDate(query.endDate, true);

  if (endDate !== null && startDate !== null)
    Object.assign(where, { createdAt: Between(startDate, endDate) });
  else if (endDate !== null) Object.assign(where, { createdAt: LessThanOrEqual(endDate) });
  else if (startDate !== null) Object.assign(where, { createdAt: MoreThanOrEqual(startDate) });

  if (typeof query.orderBy === 'string' && checkOrder(query as queryProps, list))
    Object.assign(orderBy, { [query.orderBy]: query.sort });
  // 2024-06-10T16:44:06.505Z  -  2024-06-10T17:19:23.388Z
  for (const item of list)
    if (typeof query[item] === 'string')
      if (item.endsWith('MoreThan'))
        Object.assign(where, {
          [item.replace('MoreThan', '')]: MoreThanOrEqual(Number(query[item]))
        });
      else if (item.endsWith('LessThan'))
        Object.assign(where, {
          [item.replace('LessThan', '')]: LessThanOrEqual(Number(query[item]))
        });
      else if (item.endsWith('Id'))
        Object.assign(where, { [item.replace('Id', '')]: { id: query[item] } });
      else if (item === 'zipCode' || item === 'phone')
        Object.assign(where, { [item]: ILike(`%${query[item]?.replace(/\D/gu, '') ?? ''}%`) });
      else Object.assign(where, { [item]: ILike(`%${query[item] ?? ''}%`) });

  if (isObjectEmpty(orderBy)) Object.assign(orderBy, { createdAt: 'desc' });

  return { order: orderBy, where };
};
