<template>
  <ClientOnly>
    <Navbar />

    <main class="mt-8 pb-8">
      <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 class="sr-only">Page title</h1>
        <!-- Main 3 column grid -->
        <div class="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
          <!-- Left column -->
          <div class="grid grid-cols-1 gap-4 lg:col-span-2">
            <section aria-labelledby="section-1-title">
              <h2 class="sr-only" id="section-1-title">Section title</h2>
              <div class="rounded-lg bg-white">
                <div class="p-6">
                  <SelectMenu
                    class="mb-4"
                    label="Pick a service:"
                    :items="services"
                    :selectedItem="selectedService"
                    :onSelect="handleServiceSelect"
                  />

                  <div class="border rounded p-6">
                    <component
                      :is="getTabComponent(selectedService)"
                      :onToggleSelectedService="handleServiceSelect"
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>

          <!-- Right column -->
          <div class="grid grid-cols-1 gap-4">
            <section aria-labelledby="section-2-title">
              <h2 class="sr-only" id="section-2-title">Section title</h2>
              <div class="overflow-hidden rounded-lg bg-white">
                <div class="p-6">
                  <Cart />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  </ClientOnly>
</template>

<script setup lang="ts">
import { useGlobalState } from '@/store';

/** Import components for tabs pagination */
const Venue = resolveComponent('Venue');
const Catering = resolveComponent('Catering');
const Decoration = resolveComponent('Decoration');
const Dress = resolveComponent('Dress');
const Deejay = resolveComponent('Deejay');
const Kompang = resolveComponent('Kompang');
const Photography = resolveComponent('Photography');
const Videography = resolveComponent('Videography');
const Emcee = resolveComponent('Emcee');
const Gift = resolveComponent('Gift');

const { services } = useGlobalState();

/**
 * Required to initialize the selected service to
 * make the child component react to any changes applied
 */
let selectedService = services.value.find((service) => service.selected);

/** Handle service selection & update the selected service locally */
const handleServiceSelect = (service: any = null, serviceName: string = '') => {
  services.value.forEach((service) => (service.selected = false));
  if (serviceName) {
    service = services.value.find((service) => service.name === serviceName);
  }
  service.selected = true;
  selectedService = service;
};

/**
 * Get the component to be rendered based on the selected service
 * This code is quite messy, but this is better than registering
 * all components globally to improve the performance.
 */
const getTabComponent = (service: any) => {
  switch (service.name) {
    case 'venue':
      return Venue;
    case 'catering':
      return Catering;
    case 'decoration':
      return Decoration;
    case 'dress':
      return Dress;
    case 'deejay':
      return Deejay;
    case 'kompang':
      return Kompang;
    case 'photography':
      return Photography;
    case 'videography':
      return Videography;
    case 'emcee':
      return Emcee;
    case 'gift':
      return Gift;
    default:
      return Venue;
  }
};
</script>

<style>
@import '/assets/fonts/inter/inter.css';
</style>
