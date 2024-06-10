import { IsNull } from 'typeorm';
import { userRepository } from '@repository/user';

export const hasUserById = async (id?: string): Promise<boolean> => {
  if (typeof id === 'undefined') return false;

  const user = await userRepository.findOne({
    select: { id: true },
    where: { finishedAt: IsNull(), id }
  });

  if (user === null) return false;

  return true;
};
