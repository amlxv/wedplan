export const handleTooltipsOnHover = (event: MouseEvent) => {
  const currentElement = event.currentTarget as HTMLElement;
  const position = currentElement.dataset.tooltipsPosition || 'top';

  currentElement.classList.add('relative');

  const tooltips = document.createElement('div');

  tooltips.classList.add(
    'absolute',
    position === 'top' ? '-top-11' : '-bottom-11',
    'left-0',
    'bg-gray-900',
    'text-white',
    'p-2',
    'rounded',
    'text-xs',
    'z-10',
    'font-medium',
    'w-auto',
    'h-auto'
  );

  tooltips.innerText = currentElement.dataset.tooltips as string;

  currentElement.appendChild(tooltips);

  currentElement.addEventListener('mouseleave', () => {
    if (currentElement.contains(tooltips)) {
      currentElement.classList.remove('relative');
      currentElement.removeChild(tooltips);
    }
  });
};
