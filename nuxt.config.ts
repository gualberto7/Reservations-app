// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: [
    "nuxt-mongoose",
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    "nuxt-echarts",
    "nuxt-nodemailer",
    "@nuxt/test-utils/module",
  ],
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  plugins: ["~/plugins/fetch.ts"],
  mongoose: {
    uri: process.env.NUXT_MONGODB_URI,
    options: {},
    modelsDir: "models",
    devtools: true,
  },
  runtimeConfig: {
    jwtSecret: process.env.NUXT_JWT_SECRET,
    jwtExpiresIn: process.env.NUCT_JWT_EXPIRES_IN,
  },
  nitro: {
    experimental: {
      websocket: true,
    },
  },
  echarts: {
    renderer: ["svg", "canvas"],
    charts: ["BarChart", "LineChart", "PieChart"],
    components: [
      "DatasetComponent",
      "GridComponent",
      "TooltipComponent",
      "ToolboxComponent",
      "LegendComponent",
    ],
    features: ["LabelLayout", "UniversalTransition"],
  },
  nodemailer: {
    from: process.env.NUXT_EMAIL_FROM,
    host: process.env.NUXT_EMAIL_HOST,
    port: process.env.NUXT_EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.NUXT_EMAIL_USER,
      pass: process.env.NUXT_EMAIL_PASS,
    },
  },
});
