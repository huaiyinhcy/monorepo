import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { GeoJSON } from 'ol/format';
import type { GetDistrictGeoJSON, GetDistrictLayer } from './types';
import { borderPreset } from '../presets';

export const getDistrictGeoJSON: GetDistrictGeoJSON = async params => {
    let { adcode, split } = params;
    const geoJSON = await (
        await fetch(
            `https://geo.datav.aliyun.com/areas_v3/bound/geojson?code=${adcode}${split ? '_full' : ''}`
        )
    ).json();
    if (!geoJSON) throw new Error('获取行政区边界失败');
    return geoJSON;
};

export const getDistrictLayer: GetDistrictLayer = async params => {
    let { split, adcode, proj = 'EPSG:3857', style = borderPreset.default() } = params;
    const districtBorder = await getDistrictGeoJSON({ split, adcode });
    return new VectorLayer({
        source: new VectorSource({
            features: new GeoJSON({
                dataProjection: 'EPSG:4326',
                featureProjection: proj,
            }).readFeatures(districtBorder),
        }),
        style,
    });
};
