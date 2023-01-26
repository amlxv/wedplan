<template>
  <ClientOnly>
    <Navbar />

    <div class="bg-white">
      <div class="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8 lg:py-24">
        <div class="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-10">
          <div class="space-y-5 sm:space-y-4">
            <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">
              Meet our team
            </h2>
            <p class="text-lg text-gray-500">
              We understand that planning a wedding can be a daunting task.
              That's why we have put together a team of highly skilled and
              experienced wedding planners to make your special day as smooth
              and stress-free as possible.
            </p>
          </div>
          <div class="lg:col-span-2">
            <ul
              role="list"
              class="space-y-12 sm:grid sm:grid-cols-2 sm:gap-12 sm:space-y-0 lg:gap-x-8"
            >
              <li v-for="person in people" :key="person.name">
                <div class="flex items-center space-x-4 lg:space-x-6">
                  <img
                    class="h-16 w-16 rounded-full lg:h-20 lg:w-20"
                    :src="person.imageUrl"
                    alt=""
                  />
                  <div class="space-y-1 text-lg font-medium leading-6">
                    <h3>{{ person.name }}</h3>
                    <p class="text-indigo-600" :class="cart.theme?.textColor">
                      {{ person.role }}
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { useGlobalState } from '@/store';
const { cart } = useGlobalState();

const people = [
  {
    name: 'Yamin',
    role: 'UI Designer',
    imageUrl: '/assets/img/avatars/yamin.png',
  },
  {
    name: 'Ayreeq',
    role: 'UX Designer',
    imageUrl: '/assets/img/avatars/ayreeq.png',
  },
  {
    name: 'Ashraff',
    role: 'Front-end Developer',
    imageUrl: '/assets/img/avatars/ashraff.png',
  },
  {
    name: 'Amrie',
    role: 'Graphic Designer',
    imageUrl: '/assets/img/avatars/amrie.png',
  },
  {
    name: 'Amirul',
    role: 'Full-Stack Developer',
    imageUrl: '/assets/img/avatars/amirul.png',
  },
];
</script>

<style>
@import '/assets/fonts/inter/inter.css';
</style>
