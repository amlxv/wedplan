<template>
  <div class="">
    <RadioGroup v-model="selectedDressPackage">
      <RadioGroupLabel class="text-base font-medium text-gray-900"
        >Only for you. Choose the best one!</RadioGroupLabel
      >

      <div class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
        <RadioGroupOption
          as="template"
          v-for="item in dress"
          :key="item.id"
          :value="item"
          v-slot="{ checked, active }"
        >
          <div
            :class="[
              checked ? 'border-transparent' : 'border-gray-300',
              active
                ? (cart.theme?.borderColor || 'border-indigo-500') +
                  ' ring-2 ' +
                  (cart.theme?.ringColor || 'ring-indigo-500')
                : '',
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
                    as="block"
                    class="mt-1 flex items-center text-sm text-gray-500"
                    v-html="item.description"
                  ></RadioGroupDescription>
                </div>
                <div class="mt-6">
                  <RadioGroupDescription
                    as="span"
                    class="text-sm font-medium text-gray-900"
                    >RM {{ item.price }}</RadioGroupDescription
                  >
                </div>
              </span>
            </span>
            <CheckCircleIcon
              :class="[
                !checked ? 'invisible' : '',
                'h-5 w-5 ' + (cart.theme?.textColor || 'text-indigo-600'),
              ]"
              aria-hidden="true"
            />
            <span
              :class="[
                active ? 'border' : 'border-2',
                checked
                  ? cart.theme?.borderColor || 'border-indigo-500'
                  : 'border-transparent',
                'pointer-events-none absolute -inset-px rounded-lg',
              ]"
              aria-hidden="true"
            />
          </div>
        </RadioGroupOption>
      </div>
    </RadioGroup>
  </div>
  <div class="mt-8 flex justify-between">
    <button
      type="button"
      class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 pl-3 pr-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      @click="changeStep('catering')"
      :class="[
        cart.theme?.bgColor,
        cart.theme?.bgColorHover,
        cart.theme?.focusRingColor,
      ]"
      data-tooltips="Go Back"
      data-tooltips-position="top"
      @mouseenter="handleTooltipsOnHover"
    >
      <ChevronLeftIcon class="mr-2 h-5 w-5" aria-hidden="true" />
      Back
    </button>
    <button
      type="button"
      class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      @click="changeStep('gift')"
      :class="[
        cart.theme?.bgColor,
        cart.theme?.bgColorHover,
        cart.theme?.focusRingColor,
      ]"
      data-tooltips="Next Step"
      data-tooltips-position="top"
      @mouseenter="handleTooltipsOnHover"
    >
      Next
      <ChevronRightIcon class="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { useGlobalState } from '@/store';
import { handleTooltipsOnHover } from '@/utils/handlers';
import {
  RadioGroup,
  RadioGroupDescription,
  RadioGroupLabel,
  RadioGroupOption,
} from '@headlessui/vue';
import {
  CheckCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/vue/20/solid';

const { cart } = useGlobalState();

const findSelectedDressPackageInStore = () => {
  if (cart.value.dress.title) {
    return dress.find((item) => item.title === cart.value.dress.title);
  }
  return dress[0];
};

const dress = [
  {
    id: 0,
    title: 'Essentials Package',
    description:
      '<ul class="mt-2 ml-4 list-disc"><li>Includes a rental of a classic wedding dress</li><li>A veil or headpiece</li><li>A pair of shoes</li></ul>',
    price: 300,
  },
  {
    id: 1,
    title: 'Deluxe Package',
    description:
      '<ul class="mt-2 ml-4 list-disc"><li>Includes a rental of a designer wedding dress</li><li>A veil or headpiece</li><li>A pair of shoes</li><li>A matching purse or clutch</li><li>Jewelry or accessories</li></ul>',
    price: 800,
  },
  {
    id: 2,
    title: 'Custom Package',
    description:
      '<ul class="mt-2 ml-4 list-disc"><li>Includes a custom-made wedding gown</li><li>A veil or headpiece</li><li>A pair of shoes</li><li>Alterations and fittings</li><li>A matching purse or clutch</li><li>Jewelry or accessories</li></ul>',
    price: 2000,
  },
];

const selectedDressPackage = ref(findSelectedDressPackageInStore());

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
  () => selectedDressPackage.value,
  (newValue) => {
    cart.value.dress = { ...newValue! };
  },
  { immediate: true }
);
</script>
