import { createGradient } from './index';
import type { PresetsHandleLegends } from './types';

export const presetsColors = {
    morandi: [
        '#D77B7B', // 柔和的红色
        '#D89B6A', // 柔和的橙色
        '#E3D28D', // 柔和的黄色
        '#A8CBA0', // 柔和的绿色
        '#A0D2E8', // 柔和的青色
        '#7C9ED9', // 柔和的蓝色
        '#A57BBE', // 柔和的紫色
    ],
};

export const presetsHandleLegends: PresetsHandleLegends = {
    default: params => {
        const { legends, colors = presetsColors.morandi } = params;
        const canvas = createGradient(colors);
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error("Can't create gradient");
        const width = canvas.width;
        const height = canvas.height;
        const y = height / 2; // 垂直
        const len = legends.length;
        return legends.map((legend, index) => {
            const x = (index / len) * width; // 水平方向的 x 坐标
            const data = ctx.getImageData(x, y, 1, 1).data;
            return {
                ...legend,
                color: `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`,
            };
        });
    },
};
