import { faker } from '@faker-js/faker';

import type { ResponseUser } from '../interfaces';

export const getUsers = new Promise<ResponseUser[]>((resolve, reject) => {
  try {
    setTimeout(() => {
      const userList: ResponseUser[] = faker.helpers.multiple(createRandomUser, {
        count: 100
      });
      resolve(userList);
    }, 2000);
  } catch (error) {
    reject(new Error('Failed to fetch users'));
  }
});

const createRandomUser = (): ResponseUser => {
  return {
    userId: faker.string.uuid(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    birthdate: faker.date.birthdate(),
    registeredAt: faker.date.past()
  };
};
