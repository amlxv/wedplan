import { createGlobalState, useStorage } from '@vueuse/core';

export const useGlobalState = createGlobalState(() => {
  const services = useStorage('services', [
    { name: 'venue', selected: true, total: 0 },
    { name: 'decoration', selected: false, total: 0 },
    { name: 'catering', selected: false, total: 0 },
    { name: 'dress', selected: false, total: 0 },
    { name: 'gift', selected: false, total: 0 },
    { name: 'others', selected: false, total: 0 },
    // { name: 'deejay', selected: false, total: 0 },
    // { name: 'kompang', selected: false, total: 0 },
    // { name: 'photography', selected: false, total: 0 },
    // { name: 'videography', selected: false, total: 0 },
    // { name: 'emcee', selected: false, total: 0 },
  ]);

  const cart = useStorage('cart', {
    package: {
      id: 0,
      title: '',
      description: '',
      price: 0,
    },
    guest: 0,
    theme: {
      name: '',
      bgColor: '',
      selectedColor: '',
    },
    seatPerTable: 0,
  });

  return {
    services,
    cart,
  };
});
