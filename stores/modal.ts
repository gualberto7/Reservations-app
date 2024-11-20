export const useModalStore = defineStore("modal", () => {
  const modal = reactive({
    show: false,
    component: null as string | null,
    arg: {},
  });

  const show = (component: string, arg: any) => {
    modal.component = component;
    modal.arg = arg;
    modal.show = true;
  };

  const hide = () => {
    modal.component = null;
    modal.show = false;
  };

  const modalState = computed(() => modal);

  return {
    modal: modalState,
    show,
    hide,
  };
});
