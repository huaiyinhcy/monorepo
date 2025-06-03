import type { Coordinate } from 'ol/coordinate';
import VectorLayer from 'ol/layer/Vector';
import type { Style } from 'ol/style';
import type { ProjectionLike } from 'ol/proj';

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
    /**
     * 样式
     */
    style?: Style;
    /**
     * 坐标系 默认 EPSG:4326
     */
    dataProjection?: ProjectionLike;
    /**
     * 要素坐标系 默认 EPSG:3857
     */
    featureProjection?: ProjectionLike;
}) => VectorLayer;
