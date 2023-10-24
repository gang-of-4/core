import { User } from '@prisma/client';

export class UserEntity implements User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  email_verified_at: Date | null;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
