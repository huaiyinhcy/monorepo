import type { Coordinate } from 'ol/coordinate';
import VectorLayer from 'ol/layer/Vector';

/**
 * 定义 odItem 类型，表示起点、终点和相关数值的组合。
 */
type item = { from: Coordinate; to: Coordinate; value: number };

/**
 * 定义 GetOdLayer 类型，表示一个函数，该函数接受 GetOdLayerParams 类型的参数并返回图层对象。
 */
export type GetOdLayer = (params: {
    /**
     * OD 数据数组。
     */
    data: item[];
    /**
     * 曲率值，用于控制 OD 线的弯曲程度，可选参数。
     */
    curvature?: number;
}) => VectorLayer;
