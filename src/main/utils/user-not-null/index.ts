import { IsNull } from 'typeorm';

export const userNotNull = (id: string): { user: { finishedAt: any; id: string } } => {
  return { user: { finishedAt: IsNull(), id } };
};
