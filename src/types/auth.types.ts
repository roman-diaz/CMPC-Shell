export type Role = 'ADMIN' | 'AUDITOR';

export type User = {
  email: string;
  roles: Role[];
  permissions: string[];
  id: string;
  name: string;
};

export type Session = {
  user: User;
  token: string;
};
