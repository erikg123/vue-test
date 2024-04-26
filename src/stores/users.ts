import { defineStore } from 'pinia';
import { faker } from '@faker-js/faker';

import { getUsers } from '../services/users';
import type { ResponseUser, User } from '../interfaces';

interface State {
  data: ResponseUser[] | null;
  error: string | null;
  loading: boolean;
}

export const useUsers = defineStore('users', {
  state: (): State => ({
    data: null,
    error: null,
    loading: false
  }),
  actions: {
    async fetchData(): Promise<void> {
      this.loading = true;
      this.error = null;
      try {
        // fake api call
        const data = await getUsers;
        this.data = data;
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'An error occurred';
      } finally {
        this.loading = false;
      }
    },
    addUser(userData: User) {
      this.loading = false;
      this.error = null;
      const newUser: ResponseUser = {
        ...userData,
        userId: faker.string.uuid(),
        registeredAt: new Date()
      };
      // add new user to list instead of posting to server
      setTimeout(() => {
        this.data?.push(newUser);
      }, 2000);
    },
    updateUser(userData: User, userId: string) {
      this.loading = false;
      this.error = null;
      // update user with matching userId
      this.$patch({
        data: this.data?.map((user) => (user.userId === userId ? { ...user, ...userData } : user))
      });
    }
  }
});
