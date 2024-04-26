<script setup lang="ts">
import { ref } from 'vue';

import { useUsers } from '../stores/users';
import type { User } from '../interfaces';

const users = useUsers();

const newUser = ref<User>({
  username: '',
  email: '',
  firstName: '',
  lastName: '',
  birthdate: ''
});

const handleSubmitClick = () => {
  users.addUser(newUser.value);
};
</script>

<template>
  <form class="mb-4 flex w-screen flex-col p-4" v-if="users.data">
    <label for="username">Användarnamn:</label>
    <input
      id="username"
      type="text"
      class="max-w-60 rounded border p-1"
      v-model="newUser.username"
    />

    <label for="email">Epost:</label>
    <input id="email" type="email" class="max-w-60 rounded border p-1" v-model="newUser.email" />

    <label for="firstName">Förnamn:</label>
    <input
      id="firstName"
      type="text"
      class="max-w-60 rounded border p-1"
      v-model="newUser.firstName"
    />

    <label for="lastName">Efternamn:</label>
    <input
      id="lastName"
      type="text"
      class="max-w-60 rounded border p-1"
      v-model="newUser.lastName"
    />

    <label for="birthdate">Födelsedatum:</label>
    <input
      id="birthdate"
      type="date"
      class="max-w-60 rounded border p-1"
      v-model="newUser.birthdate"
    />

    <button
      class="mt-4 w-28 rounded border border-black px-4 py-2 font-bold"
      @click.prevent="handleSubmitClick"
      :disabled="users.loading"
    >
      Lägg till
    </button>
  </form>
</template>
