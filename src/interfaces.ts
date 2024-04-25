export interface User {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  birthdate: string;
}

export interface ResponseUser extends User {
  userId: string;
  registeredAt: Date;
}
