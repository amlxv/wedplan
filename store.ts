import { createGlobalState, useStorage } from '@vueuse/core';

export const useGlobalState = createGlobalState(() => {
  const services = useStorage('services', [
    { name: 'venue', selected: true },
    { name: 'decoration', selected: false },
    { name: 'catering', selected: false },
    { name: 'dress', selected: false },
    { name: 'gift', selected: false },
    { name: 'others', selected: false },
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
      bgColorHover: '',
      ringColor: '',
      focusRingColor: '',
      borderColor: '',
      focusBorderColor: '',
      textColor: '',
      description: '',
    },
    seatPerTable: 0,
    catering: {
      id: 0,
      title: '',
      description: '',
      price: 0,
    },
    dress: {
      id: 0,
      title: '',
      description: '',
      price: 0,
    },
    gift: {
      id: 0,
      title: '',
      description: '',
      price: 0,
    },
    others: {
      kompang: 0,
      emcee: 0,
      dj: 0,
      photography: 0,
      videography: 0,
    },
  });

  return {
    services,
    cart,
  };
});
