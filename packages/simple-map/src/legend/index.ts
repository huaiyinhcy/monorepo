import type { CreateLegend } from './types';
import { legendPresets } from '../presets';

const createGradient = (colors: string[]) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error("Can't create gradient");

    // 创建线性渐变
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0); // 从左到右的渐变

    // 添加颜色节点
    colors.forEach((color, index) => {
        gradient.addColorStop(index / (colors.length - 1), color);
    });

    // 使用渐变填充 canvas
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    return canvas;
};

const getColorFromGradient = (
    canvas: HTMLCanvasElement,
    index: number,
    gradingNum: number
) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error("Can't get gradient");
    const imageData = ctx.getImageData(
        ((canvas.width - 1) * index) / (gradingNum - 1),
        canvas.height / 2,
        1,
        1
    );
    return `rgba(${imageData.data[0]}, ${imageData.data[1]}, ${imageData.data[2]}, ${imageData.data[3]})`;
};

const equalInterval = (data: number[], n: number) => {
    const min = Math.min(...data);
    const max = Math.max(...data);
    const interval = (max - min) / n;
    const breaks = [];
    for (let i = 0; i <= n; i++) {
        breaks.push(min + i * interval);
    }
    return breaks;
};

const quantile = (data: number[], n: number) => {
    const sortedData = [...data].sort((a, b) => a - b);
    const breaks = [];
    const step = sortedData.length / n;
    for (let i = 0; i < n; i++) {
        breaks.push(sortedData[Math.floor(i * step)]);
    }
    breaks.push(sortedData[sortedData.length - 1]); // 添加最大值
    return breaks;
};

const standardDeviation = (data: number[], n: number) => {
    const mean = data.reduce((a: any, b: any) => a + b, 0) / data.length;
    const variance =
        data.reduce((a: any, b: any) => a + Math.pow(b - mean, 2), 0) /
        data.length;
    const stdDev = Math.sqrt(variance);

    const breaks = [];
    for (let i = -n; i <= n; i++) {
        breaks.push(mean + i * stdDev);
    }
    return breaks;
};

export const createLegend: CreateLegend = params => {
    const {
        data,
        gradingMethod = 'equalInterval',
        gradingNum = 5,
        colors = legendPresets.morandi,
    } = params;
    let breaks;
    switch (gradingMethod) {
        case 'equalInterval':
            breaks = equalInterval(data, gradingNum);
            break;
        case 'quantile':
            breaks = quantile(data, gradingNum);
            break;
        case 'stdDev':
            breaks = standardDeviation(data, gradingNum);
            break;
        default:
            throw new Error(`Can't create legend: ${gradingMethod}`);
    }
    breaks[breaks.length - 1] = breaks[breaks.length - 1] + 1; // 确保最大值包含在范围内

    const canvas = createGradient(colors);

    const legends = [];
    for (let i = 0; i < breaks.length - 1; i++) {
        legends.push({
            min: breaks[i],
            max: breaks[i + 1],
            color: getColorFromGradient(canvas, i, gradingNum),
        });
    }
    return legends;
};
