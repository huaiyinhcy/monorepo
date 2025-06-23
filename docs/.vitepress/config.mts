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
                text: '工具集',
                link: '/pages/packages/simple-map',
                activeMatch: '/pages/packages/',
            },
            // { text: '示例', link: '/pages/examples/gallery' },
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
                            text: 'simple-map',
                            link: '/pages/packages/simple-map',
                        },
                        {
                            text: 'trans-coord',
                            link: '/pages/packages/trans-coord',
                        },
                        { text: 'utils', link: '/pages/packages/utils' },
                    ],
                },
            ],
            '/pages/examples/': [
                {
                    text: '一些有趣的示例',
                    items: [
                        {
                            text: '',
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
