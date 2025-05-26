/**
 * 定义了四种不同的分级方法类型 默认 equalInterval
 * 'equalInterval'：等间距分级法
 * 'quantile'：分位数分级法
 * 'jenks'：詹金斯优化分级法
 * 'stdDev'：标准差分级法
 */
export type GradingMethod = 'equalInterval' | 'quantile' | 'jenks' | 'stdDev';

/**
 * 定义了图例项的接口 左闭右开
 * min：图例项的最小值 提供的数据中最小值
 * max：图例项的最大值 提供的数据中最大值+1
 * color：图例项的颜色（可选）
 */
export interface LegendItem {
    min: number;
    max: number;
    color?: string;
}

/**
 * 定义了一个创建图例的函数类型。
 * 该函数接受一个包含数据数组、分级方法、分级数量以及一个处理图例的函数的对象作为参数，并返回生成的图例项数组。
 */
export type CreateLegend = (params: {
    data: number[];
    gradingMethod?: GradingMethod;
    gradingNum?: number;
    colors?: string[];
}) => LegendItem[];
