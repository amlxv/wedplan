<template>
  <Disclosure as="item" class="bg-white shadow" v-slot="{ open }">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 justify-between">
        <div class="flex">
          <div class="-ml-2 mr-2 flex items-center md:hidden">
            <!-- Mobile menu button -->
            <DisclosureButton
              class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span class="sr-only">Open main menu</span>
              <Bars3Icon
                v-if="!open"
                class="block h-6 w-6"
                aria-hidden="true"
              />
              <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
          <div class="flex flex-shrink-0 items-center">
            <NuxtLink to="/">
              <img
                class="block h-12 w-auto lg:hidden"
                src="/assets/img/logo.png"
                alt="WedPlan"
              />
              <img
                class="hidden h-12 w-auto lg:block"
                src="/assets/img/logo.png"
                alt="WedPlan"
              />
            </NuxtLink>
          </div>
          <div class="hidden md:ml-6 md:flex md:space-x-8">
            <NuxtLink
              v-for="item in navigation"
              :to="item.path"
              class="inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium"
              :class="{
                'border-indigo-500 text-gray-900': item.current,
                'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700':
                  !item.current,
              }"
              >{{ item.name }}</NuxtLink
            >
          </div>
        </div>
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <button
              type="button"
              class="relative inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              @click="reset"
            >
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <DisclosurePanel class="md:hidden">
      <div class="space-y-1 pt-2 pb-3">
        <DisclosureButton
          v-for="item in navigation"
          as="a"
          class="block border-l-4 py-2 pl-3 pr-4 text-base font-medium sm:pl-5 sm:pr-6"
          :class="{
            'border-indigo-500 bg-indigo-50 text-indigo-700': item.current,
            'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700':
              !item.current,
          }"
        >
          <NuxtLink :to="item.path">{{ item.name }}</NuxtLink>
        </DisclosureButton>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline';

const navigation = reactive([
  { name: 'Home', path: '/', current: true },
  { name: 'Team', path: '/team', current: false },
  { name: 'Projects', path: '/projects', current: false },
  { name: 'Calendar', path: '/calendar', current: false },
]);

const currentRoute = useRoute();

const reset = () => {
  localStorage.clear();
  location.reload();
};

watch(
  () => currentRoute.path,
  (path) => navigation.forEach((item) => (item.current = item.path === path))
);
</script>
