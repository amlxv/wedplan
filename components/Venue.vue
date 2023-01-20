<template>
  <div class="">
    <RadioGroup v-model="selectedVenuePackage">
      <RadioGroupLabel class="text-base font-medium text-gray-900"
        >Select your desired package</RadioGroupLabel
      >

      <div class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
        <RadioGroupOption
          as="template"
          v-for="item in venue"
          :key="item.id"
          :value="item"
          v-slot="{ checked, active }"
        >
          <div
            :class="[
              checked ? 'border-transparent' : 'border-gray-300',
              active ? 'border-indigo-500 ring-2 ring-indigo-500' : '',
              'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none',
            ]"
          >
            <span class="flex flex-1">
              <span class="flex flex-col justify-between">
                <div class="">
                  <RadioGroupLabel
                    as="span"
                    class="block text-sm font-medium text-gray-900"
                    >{{ item.title }}</RadioGroupLabel
                  >
                  <RadioGroupDescription
                    as="span"
                    class="mt-1 flex items-center text-sm text-gray-500"
                    >{{ item.description }}</RadioGroupDescription
                  >
                </div>
                <div class="mt-6">
                  <RadioGroupDescription
                    as="span"
                    class="text-sm font-medium text-gray-900"
                    >RM {{ item.price }}/person</RadioGroupDescription
                  >
                </div>
              </span>
            </span>
            <CheckCircleIcon
              :class="[!checked ? 'invisible' : '', 'h-5 w-5 text-indigo-600']"
              aria-hidden="true"
            />
            <span
              :class="[
                active ? 'border' : 'border-2',
                checked ? 'border-indigo-500' : 'border-transparent',
                'pointer-events-none absolute -inset-px rounded-lg',
              ]"
              aria-hidden="true"
            />
          </div>
        </RadioGroupOption>
      </div>
    </RadioGroup>
  </div>
  <div class="mt-8">
    <label
      for="numberOfGuests"
      class="block text-base font-medium text-gray-900 mb-3"
      >How many guests will attend?</label
    >
    <div class="relative mt-1 rounded-md shadow-sm">
      <input
        type="text"
        id="numberOfGuests"
        class="block w-full rounded-md pr-10 focus:outline-none sm:text-sm"
        :class="[
          numberOfGuestError
            ? 'border-red-300 text-red-900 focus:border-red-500 focus:ring-red-500 placeholder-red-300'
            : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500',
        ]"
        placeholder="100"
        aria-invalid="true"
        aria-describedby="numberOfGuest-error"
        v-model="numberOfGuests"
      />
      <div
        class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
      >
        <ExclamationCircleIcon
          v-if="numberOfGuestError"
          class="h-5 w-5 text-red-500"
          aria-hidden="true"
        />
      </div>
    </div>
    <p
      v-if="numberOfGuestError"
      class="mt-2 text-sm text-red-600"
      id="numberOfGuest-error"
    >
      {{ numberOfGuestErrorMessage }}
    </p>
  </div>
  <div class="mt-8 flex justify-end">
    <button
      type="button"
      class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      @click="changeStep('decoration')"
    >
      I'm sure!
      <ChevronRightIcon class="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
    </button>
  </div>
</template>

<script setup lang="ts">
import {
  RadioGroup,
  RadioGroupDescription,
  RadioGroupLabel,
  RadioGroupOption,
} from '@headlessui/vue';
import {
  CheckCircleIcon,
  ChevronRightIcon,
  ExclamationCircleIcon,
} from '@heroicons/vue/20/solid';

import { useGlobalState } from '@/store';

const { cart } = useGlobalState();

const venue = [
  {
    id: 0,
    title: 'Premier',
    description:
      'A classic and elegant wedding experience with basic amenities and experienced staff.',
    price: 50,
  },
  {
    id: 1,
    title: 'Diamond',
    description:
      'A luxury wedding experience with added amenities, chef-prepared meal, and a complimentary suite for the couple.',
    price: 250,
  },
  {
    id: 2,
    title: 'Luxury',
    description:
      'The ultimate luxury wedding experience with premium amenities, professional photography and videography, and luxury transportation.',
    price: 800,
  },
];

const findSelectedVenuePackageInStore = () => {
  if (cart.value.package.title) {
    return venue.find((item) => item.title === cart.value.package.title);
  }
  return venue[0];
};

const selectedVenuePackage = ref(findSelectedVenuePackageInStore());

const numberOfGuestError = ref(false);

const { onToggleSelectedService } = defineProps({
  onToggleSelectedService: {
    type: Function,
    required: true,
  },
});

const changeStep = (serviceName: string) => {
  onToggleSelectedService(null, serviceName);
};

const numberOfGuests = ref(cart.value.guest);
const numberOfGuestErrorMessage = ref('');

watch(
  () => selectedVenuePackage.value,
  (newValue) => {
    cart.value.package = { ...newValue! };
  },
  { deep: true }
);

watch(
  () => numberOfGuests.value,
  (newValue) => {
    if (isNaN(newValue)) {
      numberOfGuestErrorMessage.value = 'Please enter the valid number';
      numberOfGuestError.value = true;
    } else if (Number(newValue) < 48) {
      numberOfGuestErrorMessage.value = 'Minimum guests is 48 person.';
      numberOfGuestError.value = true;
    } else {
      numberOfGuestError.value = false;
      cart.value.guest = Number(newValue);
    }
  }
);
</script>
