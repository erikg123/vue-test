import { defineStore } from 'pinia';

import { getUsers } from '../services/users';
import type { ResponseUser } from '../interfaces';

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
    }
  }
});
