import { Style } from 'ol/style';
import type { Proj } from '../types';
import VectorLayer from 'ol/layer/Vector';
import { GeoJSON } from 'ol/format';

/**
 * 行政区编号
 */
export type Adcode = number | string;

/**
 *  获取行政区划的geojson数据
 *  @param params
 *  @param params.adcode 行政区划的adcode
 *  @param params.split 是否打散到下一级
 *  @return geojson数据
 */
export type GetDistrictGeoJSON = (params: { adcode: Adcode; split?: Boolean }) => Promise<GeoJSON>;

export type GetDistrictLayer = (params: {
    adcode: Adcode;
    split?: Boolean;
    proj?: Proj;
    style?: Style;
}) => Promise<VectorLayer>;
