<template>
  <Listbox as="div">
    <ListboxLabel class="block text-sm font-medium text-gray-700">{{
      label
    }}</ListboxLabel>
    <div class="relative mt-1">
      <ListboxButton
        class="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
        :class="[cart.theme?.focusBorderColor, cart.theme?.focusRingColor]"
      >
        <span class="block truncate capitalize">{{ selectedItem.name }}</span>
        <span
          class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
        >
          <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
      </ListboxButton>

      <transition
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          <ListboxOption
            as="template"
            v-for="item in items"
            :key="item.name"
            :value="item"
            v-slot="{ active, selected }"
          >
            <li
              :class="[
                active
                  ? 'text-white ' + (cart.theme?.bgColor || 'bg-indigo-600')
                  : 'text-gray-900',
                'relative cursor-default select-none py-2 pl-3 pr-9',
              ]"
              @click="onSelect(item)"
            >
              <span
                :class="[
                  selected != item.selected ? 'font-semibold' : 'font-normal',
                  'block truncate capitalize',
                ]"
                >{{ item.name }}
              </span>
              <span
                v-if="selected != item.selected"
                :class="[
                  active
                    ? 'text-white'
                    : cart.theme?.textColor || 'text-indigo-600',
                  'absolute inset-y-0 right-0 flex items-center pr-4',
                ]"
              >
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>

<script setup lang="ts">
import { useGlobalState } from '@/store';
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/vue';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid';

const { cart } = useGlobalState();

const props = defineProps(['label', 'items', 'selectedItem', 'onSelect']);

const { label, items, selectedItem, onSelect } = toRefs(props);
</script>
