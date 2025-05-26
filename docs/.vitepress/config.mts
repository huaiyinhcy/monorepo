import { defineConfig } from 'vitepress';
import { vitepressDemoPlugin } from 'vitepress-demo-plugin';
import UnoCSS from 'unocss/vite';

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: 'huaiyinhcy',
    description: '一些实用小工具',
    base: '/npm-packages/',
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: '首页', link: '/' },
            { text: '坐标转换', link: '/pages/trans-coord' },
            { text: 'OpenLayers方法封装', link: '/pages/simple-map' },
        ],

        socialLinks: [{ icon: 'github', link: 'https://github.com/huaiyinhcy/npm-packages' }],
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
