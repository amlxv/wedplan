<template>
  <section
    aria-labelledby="summary-heading"
    class="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
  >
    <h2 id="summary-heading" class="text-lg font-medium text-gray-900">
      Order summary
    </h2>

    <dl class="mt-6 space-y-4">
      <div v-for="item in services" class="flex items-center justify-between">
        <dt
          class="text-sm text-gray-600 capitalize cursor-pointer hover:underline"
          @click="changeStep(item.name)"
        >
          {{ item.name }}
        </dt>
        <dd class="text-sm font-medium text-gray-900">
          RM {{ calculateServiceCharge(item.name) }}
        </dd>
      </div>

      <div
        class="flex items-center justify-between border-t border-gray-200 pt-4"
      >
        <dt class="text-base font-medium text-gray-900">Order total</dt>
        <dd class="text-base font-medium text-gray-900">
          RM {{ calculateTotal() }}
        </dd>
      </div>
    </dl>

    <div class="mt-6">
      <button
        type="submit"
        class="w-full rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
        :class="[
          cart.theme?.bgColor,
          cart.theme?.bgColorHover,
          cart.theme?.focusRingColor,
        ]"
        @click="bookNow"
      >
        Book Now
      </button>
    </div>
  </section>
  <Alert
    :status="alert.status"
    :title="alert.title"
    :text="alert.text"
    :isOpen="isAlertOpen"
    :buttonText="alert.buttonText"
    :onClose="handleClose"
  />
</template>

<script setup lang="ts">
import { useGlobalState } from '@/store';

const { services, cart } = useGlobalState();

const calculateServiceCharge = (service: string) => {
  switch (service) {
    case 'venue':
      return cart.value.package.price * cart.value.guest;
    case 'catering':
      return cart.value.catering.price * cart.value.guest;
    case 'dress':
      return cart.value.dress.price;
    case 'gift':
      return cart.value.gift.price * cart.value.guest;
    case 'others':
      return Object.values(cart.value.others).reduce(
        (acc, cur) => acc + cur,
        0
      );
    case 'decoration':
      return cart.value.seatPerTable
        ? Math.round(cart.value.guest / cart.value.seatPerTable) * 10
        : 0;
    default:
      return 0;
  }
};

const calculateTotal = () => {
  return (
    cart.value.package.price * cart.value.guest +
    cart.value.catering.price * cart.value.guest +
    cart.value.dress.price +
    cart.value.gift.price * cart.value.guest +
    Object.values(cart.value.others).reduce((acc, cur) => acc + cur, 0) +
    (cart.value.seatPerTable
      ? Math.round(cart.value.guest / cart.value.seatPerTable) * 10
      : 0)
  );
};

const alert = {
  status: '',
  title: '',
  text: '',
  buttonText: '',
};

const { onToggleSelectedService } = defineProps({
  onToggleSelectedService: {
    type: Function,
    required: true,
  },
});

const changeStep = (serviceName: string) => {
  onToggleSelectedService(null, serviceName);
};

const isAlertOpen = ref(false);

const bookNow = () => {
  if (calculateTotal() == 0) {
    alert.status = 'error';
    alert.title = 'Booking failed';
    alert.text = 'Please select at least one service.';
    alert.buttonText = 'Go back';
  } else {
    alert.status = 'success';
    alert.title = 'Booking confirmed';
    alert.text =
      'Your booking has been successfully submitted! A confirmation email has been sent to your email address. Thank you for choosing us!';
    alert.buttonText = 'Go back to dashboard';
  }
  isAlertOpen.value = true;
};

const handleClose = () => {
  isAlertOpen.value = false;
};
</script>
