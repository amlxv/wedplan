<template>
  <div class="bg-gray-100">
    <ul>
      <li v-for="service in services">
        {{ service.name }} - Total: RM {{ service.total }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useGlobalState } from '@/store';

const { services } = useGlobalState();
</script>
