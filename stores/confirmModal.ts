interface confirmModal {
  title: string;
  message: string;
  yesLabel: string;
  noLabel: string;
  response: boolean | null;
  show: boolean;
}

export const useConfirmModalStore = defineStore("confirmModal", () => {
  const confirmModal = reactive<confirmModal>({
    title: "",
    message: "",
    yesLabel: "Confirm",
    noLabel: "Cancel",
    response: null,
    show: false,
  });
  const confirm = async (
    title: string,
    message: string,
    yesLabel?: string,
    noLabel?: string
  ) => {
    confirmModal.title = title;
    confirmModal.message = message;
    if (yesLabel) confirmModal.yesLabel = yesLabel;
    if (noLabel) confirmModal.noLabel = noLabel;

    confirmModal.show = true;

    // Loop until the user responds
    while (confirmModal.response === null) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    return confirmModal.response;
  };

  const confirmState = computed(() => confirmModal);

  return {
    confirm: confirm,
    confirmModal: confirmState,
  };
});
