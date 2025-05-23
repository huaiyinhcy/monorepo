import Theme from 'vitepress/theme';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import 'virtual:uno.css';
import './style.css';

export default {
    ...Theme,
    enhanceApp({ app }) {
        app.use(ElementPlus);
    },
};
