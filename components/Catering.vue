<template>
  <div class="">
    <RadioGroup v-model="selectedCateringPackage">
      <RadioGroupLabel class="text-base font-medium text-gray-900"
        >What are you craving for?</RadioGroupLabel
      >

      <div class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
        <RadioGroupOption
          as="template"
          v-for="item in catering"
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
                    >RM {{ item.price }}/person</RadioGroupDescription
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
      @click="changeStep('decoration')"
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
      @click="changeStep('dress')"
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

const catering = [
  {
    id: 0,
    title: 'Basic Package',
    description:
      '<ul class="mt-2 ml-4 list-disc"><li>Includes a selection of sandwiches and wraps (e.g. turkey and cheese, chicken salad, veggie wrap)</li><li>A variety of chips and snacks (e.g. potato chips, pretzels, popcorn)</li><li>Assorted drinks (e.g. water, soda, juice)</li></ul>',
    price: 40,
  },
  {
    id: 1,
    title: 'Deluxe Package',
    description:
      '<ul class="mt-2 ml-4 list-disc"><li>A variety of appetizers (e.g. bruschetta, spinach and artichoke dip, mini quiches)</li><li>A choice of entrees (e.g. grilled chicken, fish, or beef)</li><li>A selection of sides (e.g. roasted vegetables, mashed potatoes, pasta salad)</li><li>A variety of desserts (e.g. cheesecake, tiramisu, fruit tarts)</li></ul>',
    price: 120,
  },
  {
    id: 2,
    title: 'Premium Package',
    description:
      '<ul class="mt-2 ml-4 list-disc"><li>A variety of hors d\'oeuvres (e.g. shrimp cocktail, crab cakes, mini beef wellington)</li><li>A choice of entrees (e.g. filet mignon, lamb chops, or salmon)</li><li>A selection of sides (e.g. truffle mashed potatoes, grilled asparagus, wild rice pilaf)</li><li>A variety of desserts (e.g. chocolate fountain, macarons, crème brûlée)</li></ul>',
    price: 200,
  },
];

const findSelectedCateringPackageInStore = () => {
  if (cart.value.catering.title) {
    return catering.find((item) => item.title === cart.value.catering.title);
  }
  return catering[0];
};

const selectedCateringPackage = ref(findSelectedCateringPackageInStore());

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
  () => selectedCateringPackage.value,
  (newValue) => {
    cart.value.catering = { ...newValue! };
  },
  { immediate: true }
);
</script>
