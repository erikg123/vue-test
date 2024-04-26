<script setup lang="ts">
import AddData from '../components/AddData.vue';
import DataTable from '../components/DataTable.vue';
</script>

<template>
  <main>
    <AddData />
    <DataTable :is-editable="true" />
  </main>
</template>
