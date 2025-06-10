import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [dts({ include: ['src'] }), visualizer()],
    build: {
        // 打包后的文件输出目录
        emptyOutDir: true,
        target: 'es2015',
        lib: {
            entry: 'src/index.ts',
            fileName: 'index',
            name: 'utilityMethod',
            formats: ['umd', 'es', 'cjs'],
        },
        rollupOptions: {
            external: [/^ol($|\/.*)/, /^@turf($|\/.*)/, /^lodash($|\/.*)/],
            output: {
                globals: {
                    ol: 'ol',
                    '@turf/turf': 'turf',
                    lodash: '_',
                },
            },
        },
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
});
