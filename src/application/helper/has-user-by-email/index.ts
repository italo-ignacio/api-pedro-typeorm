import { IsNull } from 'typeorm';
import { userRepository } from '@repository/user';

export const hasUserByEmail = async (email?: string): Promise<boolean> => {
  if (typeof email !== 'string') return false;

  const user = await userRepository.findOne({
    select: { id: true },
    where: { email, finishedAt: IsNull() }
  });

  if (user === null) return false;

  return true;
};
