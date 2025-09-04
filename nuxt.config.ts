// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-09-04',
  devtools: { enabled: false },
  modules: [['nuxt-ssr-lit', { litElementPrefix: ['md-'] }]],
  nitro: {
    prerender: {
      autoSubfolderIndex: false,
    },
    preset: 'cloudflare-pages',
  },
  vite: {
    optimizeDeps: {
      exclude: ['@material/web'],
    },
    $server: {
      build: {
        rollupOptions: {
          output: {
            // Avoid 500 error `dayjs.duration is not a function` on load in production environment
            // https://github.com/nuxt/nuxt/issues/31465#issuecomment-2757840295
            preserveModules: false,
          },
        },
      },
    },
    vue: {
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.includes('md-'),
        },
      },
    },
  },
});
