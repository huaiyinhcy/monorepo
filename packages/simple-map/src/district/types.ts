import { Style } from 'ol/style';
import VectorLayer from 'ol/layer/Vector';
import { GeoJSON } from 'ol/format';
import type { ProjectionLike } from 'ol/proj';

/**
 * 行政区编号
 */
export type Adcode = number;

/**
 *  获取行政区划的geojson数据
 *  @param params
 *  @param params.adcode 行政区划的adcode
 *  @param params.split 是否打散到下一级
 *  @return geojson数据
 */
export type GetDistrictGeoJSON = (params: {
    adcode: Adcode;
    split?: Boolean;
}) => Promise<GeoJSON | any>;

export type GetDistrictLayer = (params: {
    adcode: Adcode;
    split?: Boolean;
    proj?: ProjectionLike;
    style?: Style;
}) => Promise<VectorLayer>;
