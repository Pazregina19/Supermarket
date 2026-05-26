export interface User {

  _id?: string;

  username: string;

  email: string;

  password?: string;

  phone?: string;

  address?: string;

  role: 'client'
      | 'supermarket'
      | 'courier'
      | 'admin';

  createdAt?: string;

  updatedAt?: string;

}