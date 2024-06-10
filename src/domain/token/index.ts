import type { Role } from '@domain/enum';

export interface tokenInput {
  id: string;
  name: string;
  email: string;
  role: Role;
}
