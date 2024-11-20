export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.$fetch = (url: string, options: RequestInit = {}) => {
    const token = localStorage.getItem("token");
    if (token) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    return $fetch(url, options);
  };
  nuxtApp.provide("fetch", nuxtApp.$fetch);
});
