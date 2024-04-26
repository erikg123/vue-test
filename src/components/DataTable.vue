<script setup lang="ts">
import { ref } from 'vue';

import { useUsers } from '../stores/users';
import type { ResponseUser } from '../interfaces';

const selectedUserId = ref<string>('');
const updateUser = ref<ResponseUser>();

const users = useUsers();
users.fetchData();

defineProps<{
  isEditable: boolean;
}>();

const handleRowClick = (user: ResponseUser) => {
  selectedUserId.value = user.userId;
  updateUser.value = { ...user };
};

const handleSaveClick = () => {
  if (!updateUser.value) return;
  users.updateUser(updateUser.value, selectedUserId.value);
  selectedUserId.value = '';
  updateUser.value = undefined;
};

const handleCancelClick = () => {
  selectedUserId.value = '';
  updateUser.value = undefined;
};
</script>

<template>
  <main>
    <p class="text-3xl" v-if="users.loading && !users.data">Hämtar data...</p>
    <table class="w-full whitespace-nowrap" v-if="users.data">
      <thead>
        <tr class="bg-gray-100">
          <th
            class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
          >
            Användarnamn
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
          >
            Epost
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
          >
            Förnamn
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
          >
            Efternamn
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
          >
            Födelsedatum
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
          >
            Registrerad
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200 bg-white">
        <template v-for="user in users.data" :key="user.userId">
          <template v-if="selectedUserId !== user.userId">
            <tr
              :class="{ 'cursor-pointer': isEditable }"
              @click="isEditable && handleRowClick(user)"
            >
              <td class="whitespace-nowrap px-6 py-3">{{ user.username }}</td>
              <td class="whitespace-nowrap px-6 py-3">{{ user.email }}</td>
              <td class="whitespace-nowrap px-6 py-3">{{ user.firstName }}</td>
              <td class="whitespace-nowrap px-6 py-3">{{ user.lastName }}</td>
              <td class="whitespace-nowrap px-6 py-3">{{ user.birthdate }}</td>
              <td class="whitespace-nowrap px-6 py-3">
                {{ user.registeredAt.toLocaleDateString() }}
              </td>
            </tr>
          </template>
          <template v-if="selectedUserId === user.userId && updateUser">
            <tr>
              <td class="whitespace-nowrap px-6 py-3">
                <input
                  type="text"
                  class="max-w-60 rounded border p-1"
                  v-model="updateUser.username"
                />
              </td>
              <td class="whitespace-nowrap px-6 py-3">
                <input
                  type="email"
                  class="max-w-60 rounded border p-1"
                  v-model="updateUser.email"
                />
              </td>
              <td class="whitespace-nowrap px-6 py-3">
                <input
                  type="text"
                  class="max-w-60 rounded border p-1"
                  v-model="updateUser.firstName"
                />
              </td>
              <td class="whitespace-nowrap px-6 py-3">
                <input
                  type="text"
                  class="max-w-60 rounded border p-1"
                  v-model="updateUser.lastName"
                />
              </td>
              <td class="whitespace-nowrap px-6 py-3">
                <input
                  type="date"
                  class="max-w-60 rounded border p-1"
                  v-model="updateUser.birthdate"
                />
              </td>
              <td class="whitespace-nowrap px-6 py-3">
                {{ user.registeredAt.toLocaleDateString() }}
              </td>
            </tr>
            <tr>
              <td :colspan="Object.keys(user).length">
                <div class="flex gap-4 p-4">
                  <button
                    class="w-28 rounded border border-black px-4 py-2 font-bold"
                    @click="handleSaveClick"
                  >
                    Spara
                  </button>
                  <button
                    class="w-28 rounded border border-black px-4 py-2 font-bold"
                    @click="handleCancelClick"
                  >
                    Avbryt
                  </button>
                </div>
              </td>
            </tr>
          </template>
        </template>
      </tbody>
    </table>
  </main>
</template>
