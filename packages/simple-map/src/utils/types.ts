import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';

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
