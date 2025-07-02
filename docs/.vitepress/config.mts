import { defineConfig } from 'vitepress';
import { vitepressDemoPlugin } from 'vitepress-demo-plugin';
import UnoCSS from 'unocss/vite';

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: 'huaiyinhcy',
    description: '一些实用工具',
    base: '/monorepo/',
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: '首页', link: '/' },
            {
                text: 'simple-map',
                link: '/pages/simple-map',
            },
            { text: 'trans-coord', link: '/pages/trans-coord' },
        ],

        socialLinks: [
            {
                icon: 'github',
                link: 'https://github.com/huaiyinhcy/monorepo',
            },
        ],
    },
    markdown: {
        config(md) {
            md.use(vitepressDemoPlugin);
        },
    },
    vite: {
        plugins: [UnoCSS()],
        server: {
            host: '0.0.0.0',
        },
    },
});
