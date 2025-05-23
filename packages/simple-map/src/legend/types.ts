/**
 * 定义了四种不同的分级方法类型。
 * 'equalInterval'：等间距分级法
 * 'quantile'：分位数分级法
 * 'jenks'：詹金斯优化分级法
 * 'stdDev'：标准差分级法
 */
export type GradingMethod = 'equalInterval' | 'quantile' | 'jenks' | 'stdDev';

/**
 * 定义了图例项的接口。
 * min：图例项的最小值
 * max：图例项的最大值
 * color：图例项的颜色（可选）
 */
export interface LegendItem {
    min: number;
    max: number;
    color?: string;
}

/**
 * 定义了一个处理图例的函数类型。
 * 该函数接受一个包含图例项数组和颜色数组的对象作为参数，并返回处理后的图例项数组。
 */
export type handleLegends = (params: { legends: LegendItem[]; colors?: string[] }) => LegendItem[];

/**
 * 定义了一个创建图例的函数类型。
 * 该函数接受一个包含数据数组、分级方法、分级数量以及一个处理图例的函数的对象作为参数，并返回生成的图例项数组。
 */
export type CreateLegend = (params: {
    data: { value: number }[];
    gradingMethod?: GradingMethod;
    gradingNum?: number;
    handleLegends?: handleLegends;
}) => LegendItem[];

/**
 * 定义了一个预设处理图例函数的接口。
 * default：默认的处理图例函数
 */
export interface PresetsHandleLegends {
    default: handleLegends;
}
