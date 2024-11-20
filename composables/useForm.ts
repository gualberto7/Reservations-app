export const useForm = (form: any) => {
  const nuxtApp: any = useNuxtApp();

  const submit = async (
    url: string,
    options: {
      onSuccess?: (response: any) => void;
      onError?: (error: any) => void;
    } = {}
  ) => {
    form.processing.value = true;
    try {
      const { data } = await nuxtApp.$fetch(url, {
        method: "POST",
        body: form.model,
      });
      form.errors = data.errors;
      if (options.onSuccess) options.onSuccess(data);
    } catch (error) {
      console.log(error);
      if (options.onError) options.onError(error);
    } finally {
      form.processing.value = false;
    }
  };

  return { submit };
};
