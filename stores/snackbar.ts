export const useSnackbarStore = defineStore("snackbar", () => {
  const snackbar = reactive({
    show: false,
    message: "",
    type: "success",
  });

  const show = (message: string, type: string) => {
    snackbar.message = message;
    snackbar.type = type;
    snackbar.show = true;
    setTimeout(() => {
      hide();
    }, 3000);
  };

  const hide = () => {
    snackbar.show = false;
  };

  const snackbarState = computed(() => snackbar);

  return {
    snackbar: snackbarState,
    show,
    hide,
  };
});
