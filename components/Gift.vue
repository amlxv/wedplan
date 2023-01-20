<template>
  <div class="">
    <RadioGroup v-model="selectedGiftPackage">
      <RadioGroupLabel class="text-base font-medium text-gray-900"
        >What about giving the others?</RadioGroupLabel
      >

      <div class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
        <RadioGroupOption
          as="template"
          v-for="item in gift"
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
                    as="block"
                    class="mt-1 flex items-center text-sm text-gray-500"
                    v-html="item.description"
                  ></RadioGroupDescription>
                </div>
                <div class="mt-6">
                  <RadioGroupDescription
                    as="span"
                    class="text-sm font-medium text-gray-900"
                    >RM {{ item.price }}/each</RadioGroupDescription
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
  <div class="mt-8 flex justify-between">
    <button
      type="button"
      class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      @click="changeStep('dress')"
    >
      <ChevronLeftIcon class="mr-2 h-5 w-5" aria-hidden="true" />
      Back
    </button>
    <button
      type="button"
      class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      @click="changeStep('others')"
    >
      Add
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
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/vue/20/solid';

const gift = [
  {
    id: 0,
    title: 'Simple Package',
    description:
      '<ul class="mt-2 ml-4 list-disc"><li>Includes a small personalized trinket such as keychains or bottle openers</li><li>A small sweet treat such as chocolates or cand</li><li>Packaged in a clear bag or box</li></ul>',
    price: 6,
  },
  {
    id: 1,
    title: 'DIY Package',
    description:
      '<ul class="mt-2 ml-4 list-disc"><li>Includes materials and instructions for guests to make their own wedding favor such as a scented candle or a plant in a small pot</li></ul>',
    price: 10,
  },
  {
    id: 2,
    title: 'Elegant Package',
    description:
      '<ul class="mt-2 ml-4 list-disc"><li>Includes a small, personalized item such as a picture frame or ornament</li><li>A small, elegant sweet treat such as macarons or truffles</li><li>Packaged in a decorated box or bag</li></ul>',
    price: 14,
  },
];

const selectedGiftPackage = ref(gift[0]);

const { onToggleSelectedService } = defineProps({
  onToggleSelectedService: {
    type: Function,
    required: true,
  },
});

const changeStep = (serviceName: string) => {
  onToggleSelectedService(null, serviceName);
};
</script>
