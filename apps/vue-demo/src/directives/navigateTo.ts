import { Directive } from 'vue';
import router from '../router';

export const navigateToDirective: Directive = {
  mounted(el: HTMLElement, binding) {
    const path = binding.value;
    el.style.cursor = 'pointer';

    el.addEventListener('click', () => {
      router.push(path);
    });
  },
};
