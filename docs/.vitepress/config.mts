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
                text: '工具包',
                link: '/pages/packages/simple-map',
                activeMatch: '/pages/packages/',
            },
            // { text: '案例', link: '/pages/examples/gallery' },
        ],

        socialLinks: [
            {
                icon: 'github',
                link: 'https://github.com/huaiyinhcy/monorepo',
            },
        ],

        sidebar: {
            '/pages/packages/': [
                {
                    text: '一些实用工具',
                    items: [
                        {
                            text: 'OpenLayers方法封装',
                            link: '/pages/packages/simple-map',
                        },
                        {
                            text: '坐标转换',
                            link: '/pages/packages/trans-coord',
                        },
                        // { text: '实用方法', link: '/pages/packages/utils' },
                    ],
                },
            ],
            '/pages/examples/': [
                {
                    text: '一些有趣的demo',
                    items: [
                        {
                            text: '展示',
                            link: '/pages/examples/gallery',
                        },
                    ],
                },
            ],
        },
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
