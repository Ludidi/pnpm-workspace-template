import type { Ref } from 'vue';
import { ref, onBeforeUpdate } from 'vue';

export function useRefs<T = HTMLElement>(): [Ref<T[]>, (index: number) => (el: T) => void] {
  const refs = ref([]) as Ref<T[]>;

  onBeforeUpdate(() => {
    refs.value = [];
  });

  const setRefs = (index: number) => (el: T) => {
    refs.value[index] = el;
  };

  return [refs, setRefs];
}
