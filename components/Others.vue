<template>
  <h1 class="text-base font-medium text-gray-900 mb-4">
    Boost your experience!
  </h1>
  <fieldset class="border-t border-b border-gray-200">
    <div class="divide-y divide-gray-200">
      <div class="relative flex items-start py-4" v-for="item in others">
        <div class="min-w-0 flex-1 text-sm">
          <label :for="item.id" class="font-medium text-gray-700">{{
            item.name
          }}</label>
          <p :id="item.id + '-description'" class="text-gray-500">
            {{ item.description }}
          </p>
        </div>
        <div class="ml-3 flex h-5 items-center">
          <input
            :id="item.id"
            :aria-describedby="item.id + '-description'"
            type="checkbox"
            class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
            :class="[cart.theme?.textColor, cart.theme?.focusRingColor]"
            :checked="(selectedOther as any)[item.id]"
            @click="toggleSelectOther(item.id)"
          />
        </div>
      </div>
    </div>
  </fieldset>
  <div class="mt-8 flex justify-between">
    <button
      type="button"
      class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 pl-3 pr-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      @click="changeStep('gift')"
      :class="[
        cart.theme?.bgColor,
        cart.theme?.bgColorHover,
        cart.theme?.focusRingColor,
      ]"
    >
      <ChevronLeftIcon class="mr-2 h-5 w-5" aria-hidden="true" />
      Back
    </button>
  </div>
</template>

<script setup lang="ts">
import { useGlobalState } from '@/store';
import { ChevronLeftIcon } from '@heroicons/vue/20/solid';

const { onToggleSelectedService } = defineProps({
  onToggleSelectedService: {
    type: Function,
    required: true,
  },
});

const { cart } = useGlobalState();

const selectedOther = ref(cart.value.others);

const others = [
  {
    id: 'kompang',
    name: 'Kompang',
    description:
      'Add traditional live music with Kompang for your wedding celebration.',
    price: 250,
  },
  {
    id: 'emcee',
    name: 'Emcee',
    description:
      'Hire a professional emcee to keep your wedding program flowing smoothly.',
    price: 300,
  },
  {
    id: 'dj',
    name: 'Music DJ',
    description:
      'Enhance your wedding with a professional DJ for music entertainment.',
    price: 350,
  },
  {
    id: 'photography',
    name: 'Photography',
    description:
      'Capture your special moments with professional wedding photography services.',
    price: 200,
  },
  {
    id: 'videography',
    name: 'Videography',
    description:
      'Preserve your memories with professional videography services for your wedding.',
    price: 300,
  },
];

const changeStep = (serviceName: string) => {
  onToggleSelectedService(null, serviceName);
};

const toggleSelectOther = (id: string) => {
  (!(cart.value.others as any)[id] as boolean)
    ? ((cart.value.others as any)[id] = others.find(
        (item) => item.id === id
      )?.price)
    : ((cart.value.others as any)[id] = 0);
};
</script>
