import { Role, User } from '@prisma/client';

export class UserEntity implements User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  role_id: Role['id'];
  email_verified_at: Date;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
