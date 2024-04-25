<script setup lang="ts">
import { ref } from 'vue';

import { useUsers } from '../stores/users';
import EditTableRow from './EditTableRow.vue';

const selectedUserId = ref<string>('');

const users = useUsers();
users.fetchData();

defineProps<{
  isEditable: boolean;
}>();

const handleRowClick = ({ userId }: { userId: string }) => {
  selectedUserId.value = userId;
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
          <tr :class="{ 'cursor-pointer': isEditable }" @click="isEditable && handleRowClick(user)">
            <td class="whitespace-nowrap px-6 py-3">{{ user.username }}</td>
            <td class="whitespace-nowrap px-6 py-3">{{ user.email }}</td>
            <td class="whitespace-nowrap px-6 py-3">{{ user.firstName }}</td>
            <td class="whitespace-nowrap px-6 py-3">{{ user.lastName }}</td>
            <td class="whitespace-nowrap px-6 py-3">{{ user.birthdate }}</td>
            <td class="whitespace-nowrap px-6 py-3">
              {{ user.registeredAt.toLocaleDateString() }}
            </td>
          </tr>
          <tr v-if="selectedUserId === user.userId">
            <td :colspan="Object.keys(user).length"></td>
            <EditTableRow :userId="user.userId" />
          </tr>
        </template>
      </tbody>
    </table>
  </main>
</template>
