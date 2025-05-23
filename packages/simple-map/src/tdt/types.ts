import type { Extent } from 'ol/extent';
import WMTSTileGrid from 'ol/tilegrid/WMTS';
import TileLayer from 'ol/layer/Tile';
import type { Proj } from '../types';

/**
 * valid matrix sets
 *
 * w: 球形墨卡托投影
 * c: 经纬度投影
 */
export type MatrixSet = 'w' | 'c';

/**
 * valid filter types
 *
 * vec: 矢量底图
 * cva: 矢量注记
 *
 * img: 影像底图
 * cia: 影像注记
 *
 * ter: 地形晕渲
 * cta: 地形注记
 *
 * ibo: 全球境界
 */
export type LayerType = 'vec' | 'cva' | 'img' | 'cia' | 'ter' | 'cta' | 'ibo';

/**
 * get tile grid function
 * @param params
 * @returns WMTSTileGrid
 */
export type GetTileGrid = (params: { projectionExtent: Extent }) => WMTSTileGrid;

/**
 * get tdt layer function
 * @param params
 * @param params.layer - tdt layer type
 * @param params.proj - map projection
 * @param params.tdtKey - tdt key
 * @returns TileLayer
 */
export type GetTdtLayer = (params: {
    tdtKey: string;
    layerType: LayerType;
    proj?: Proj;
}) => TileLayer;
