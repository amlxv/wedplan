<template>
  <div class="">
    <RadioGroup v-model="selectedColor">
      <RadioGroupLabel class="block text-base font-medium text-gray-900 mb-3"
        >Pick a color for your theme</RadioGroupLabel
      >
      <div class="mt-4 flex items-center space-x-3">
        <RadioGroupOption
          as="template"
          v-for="color in colors"
          :key="color.name"
          :value="color"
          v-slot="{ active, checked }"
        >
          <div
            :class="[
              color.selectedColor,
              active && checked ? 'ring ring-offset-1' : '',
              !active && checked ? 'ring-2' : '',
              '-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none',
            ]"
          >
            <RadioGroupLabel as="span" class="sr-only">{{
              color.name
            }}</RadioGroupLabel>
            <span
              aria-hidden="true"
              :class="[
                color.bgColor,
                'h-8 w-8 border border-black border-opacity-10 rounded-full',
              ]"
            />
          </div>
        </RadioGroupOption>
      </div>
    </RadioGroup>
    <div class="mt-4 text-sm text-gray-900">
      {{ selectedColor?.description }}
    </div>
    <div class="mt-8">
      <label
        for="seatPerTable"
        class="block text-base font-medium text-gray-900 mb-3"
        >How many seat per table you prefer?</label
      >
      <div class="relative mt-1 rounded-md shadow-sm">
        <input
          type="text"
          id="seatPerTable"
          class="block w-full rounded-md pr-10 focus:outline-none sm:text-sm"
          :class="[
            seatPerTableError
              ? 'border-red-300 text-red-900 focus:border-red-500 focus:ring-red-500 placeholder-red-300'
              : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500',
          ]"
          aria-invalid="true"
          aria-describedby="seatPerTable-error"
          v-model="seatPerTable"
        />
        <div
          class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
        >
          <ExclamationCircleIcon
            v-if="seatPerTableError"
            class="h-5 w-5 text-red-500"
            aria-hidden="true"
          />
        </div>
      </div>
      <p
        v-if="seatPerTableError"
        class="mt-2 text-sm text-red-600"
        id="seatPerTable-error"
      >
        {{ seatPerTableErrorMessage }}
      </p>
    </div>
  </div>
  <div class="mt-8 flex justify-between">
    <button
      type="button"
      class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      @click="changeStep('venue')"
    >
      <ChevronLeftIcon class="mr-2 h-5 w-5" aria-hidden="true" />
      Back
    </button>
    <button
      type="button"
      class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      @click="changeStep('catering')"
    >
      Hungry?
      <ChevronRightIcon class="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { useGlobalState } from '@/store';
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid';

const colors = [
  {
    name: 'Pink',
    bgColor: 'bg-pink-500',
    selectedColor: 'ring-pink-500',
    description:
      'Rose, a pale tint of red, is often associated with love and romance.',
  },
  {
    name: 'Purple',
    bgColor: 'bg-purple-500',
    selectedColor: 'ring-purple-500',
    description:
      'Luxury, wealth, and wisdom are often associated with lavender and plum shades of purple.',
  },
  {
    name: 'Blue',
    bgColor: 'bg-blue-500',
    selectedColor: 'ring-blue-500',
    description:
      'Trust, loyalty, and wisdom are often associated with navy and sky shades of blue.',
  },
  {
    name: 'Green',
    bgColor: 'bg-green-500',
    selectedColor: 'ring-green-500',
    description:
      'Nature, growth, and harmony are often associated with olive and mint shades of green.',
  },
  {
    name: 'Yellow',
    bgColor: 'bg-yellow-500',
    selectedColor: 'ring-yellow-500',
    description:
      'Sunshine, happiness, and optimism are often associated with lemon and gold shades of yellow.',
  },
];

const { cart } = useGlobalState();

const findSelectedColorInStore = () => {
  if (cart.value.theme.name) {
    return colors.find((color) => color.name === cart.value.theme.name);
  }

  return colors[1];
};

const selectedColor = ref(findSelectedColorInStore());

const seatPerTable = ref(cart.value.seatPerTable);

const seatPerTableError = ref(false);
const seatPerTableErrorMessage = ref('');

const { onToggleSelectedService } = defineProps({
  onToggleSelectedService: {
    type: Function,
    required: true,
  },
});

const changeStep = (serviceName: string) => {
  onToggleSelectedService(null, serviceName);
};

watch(
  () => selectedColor.value,
  (newValue) => {
    cart.value.theme = { ...newValue! };
  }
);

watch(
  () => seatPerTable.value,
  (newValue) => {
    if (isNaN(newValue)) {
      seatPerTableErrorMessage.value = 'Please enter the valid number';
      seatPerTableError.value = true;
    } else if (Number(newValue) < 4) {
      seatPerTableErrorMessage.value = 'Minimum seat per table is 4';
      seatPerTableError.value = true;
    } else {
      seatPerTableError.value = false;
      cart.value.seatPerTable = Number(newValue);
    }
  }
);
</script>
