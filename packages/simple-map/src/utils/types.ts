import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import type { Map } from 'ol';
import type { Style } from 'ol/style';
import type { ProjectionLike } from 'ol/proj';

/**
 * 裁切瓦片图层
 * @param params
 * @param params.layerToBeClipped 被裁切的瓦片图层
 * @param params.clipLayer 裁切的矢量图层
 * @returns 裁切后的矢量图层
 */
export type ClipLayerByVectorLayer = (params: {
    layerToBeClipped: TileLayer;
    clipLayer: VectorLayer;
}) => void;

/**
 * 地图换色
 */
export type FilterLayerByFunction = (params: {
    layer: TileLayer;
    filterFunction: (context: CanvasRenderingContext2D) => void;
}) => void;

/**
 * 预设滤镜的方式进行地图换色
 */
export type FilterType =
    | 'grayscale'
    | 'invert'
    | 'sepia'
    | 'hue-rotate'
    | 'saturate'
    | 'brightness'
    | 'contrast';

export interface FilterOptionItem {
    type: FilterType;
    value: string;
}

export type FilterLayerByOptions = (params: {
    layer: TileLayer;
    filterOptions: FilterOptionItem[];
}) => void;

/**
 * 分割行政区
 */
export type SplitDistrictLayerByFunction = (geoJSON: any) => any;

/**
 * 快速使用 useMap
 * @param params
 * @param params.tdtKey 天地图API Key
 * @param params.target 目标容器
 * @param params.proj 地图坐标
 * @param params.adcode 行政区划代码
 * @param params.basicLayerType 基础图层类型
 * @param params.label 是否显示注记图层 默认显示
 * @param params.clip 是否裁切 默认裁切
 * @param params.clipBorder 裁切边界样式 默认为灰色边框
 * @param params.split 是否分割行政区 默认分割
 * @param params.splitBorder 分割行政区边界样式 默认为灰色边框
 * @param params.zoom 缩放级别 默认13 如果裁切则自适应
 * @param params.center 地图中心点 默认[104.06, 30.67] 如果裁切则自适应
 */
export type UseMap = (params: {
    tdtKey: string;
    target: HTMLElement;
    proj?: ProjectionLike;

    adcode?: number;
    basicLayerType?: 'img' | 'vec';

    label?: boolean;

    clip?: boolean;
    clipBorder?: Style;

    split?: boolean;
    splitBorder?: Style;

    zoom?: number;
    center?: [number, number];
}) => Promise<Map>;
