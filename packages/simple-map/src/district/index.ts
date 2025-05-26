import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { GeoJSON } from 'ol/format';
import type { GetDistrictGeoJSON, GetDistrictLayer } from './types';
import { borderPreset } from '../presets';
import country from '../../public/country.json';
import province from '../../public/province.json';
import city from '../../public/city.json';

export const getDistrictGeoJSONByApi: GetDistrictGeoJSON = async params => {
    const transDistricts2Feature = (districts: any) => {
        const district = districts[0];
        return {
            type: 'Feature',
            properties: {
                adcode: district.adcode,
                name: district.name,
                level: district.level,
                center: district.center,
            },
            geometry: {
                type: 'MultiPolygon',
                coordinates: [
                    district.polyline
                        .split('|')
                        .map((coords: string) =>
                            coords.split(';').map(coord => coord.split(',').map(Number))
                        ),
                ],
            },
        };
    };

    let { adcode, split } = params;

    const json: any = {
        key: 'e303a94f35ebf91af3839e4d2670224e',
        extensions: 'all',
        offset: 99,
    };
    const paramsStr = Object.keys(json)
        .map(key => key + '=' + json[key])
        .join('&');

    let { districts } = await (
        await fetch(`https://restapi.amap.com/v3/config/district?keywords=${adcode}&${paramsStr}`)
    ).json();

    if (split) {
        const children = districts[0].districts.splice(0);
        const _ = {
            type: 'FeatureCollection',
            features: [],
        };

        while (children.length) {
            const child = children.shift();
            _.features.push(
                // @ts-ignore
                (
                    (
                        await Promise.all([
                            getDistrictGeoJSONByApi({ adcode: child.adcode }),
                            new Promise(resolve => setTimeout(resolve, 334)),
                        ])
                    )[0] as any
                ).features
            );
        }
        return _;
    }

    return {
        type: 'FeatureCollection',
        features: [transDistricts2Feature(districts)],
    };
};

export const getDistrictGeoJSON: GetDistrictGeoJSON = async params => {
    let { adcode, split } = params;
    // 国家 code
    if (adcode === 100000) {
        return split ? province : country;
    }
    // 省份 code
    else if (adcode.toString().includes('0000')) {
        return {
            ...(split ? city : province),
            features: (split ? city : province).features.filter(
                feature =>
                    feature.properties.adcode === adcode ||
                    feature.properties.parent?.adcode === adcode
            ),
        };
    }
    // 城市 code
    else if (adcode.toString().includes('00')) {
        if (split) {
            throw new Error('城市级行政区划不支持分割');
        }
        return {
            ...city,
            features: city.features.filter(
                feature =>
                    feature.properties.adcode === adcode ||
                    feature.properties.parent?.adcode === adcode
            ),
        };
    }
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
