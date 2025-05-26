import * as turf from '@turf/turf';
import { GeoJSON } from 'ol/format';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import type { GetOdLayer } from './types';
import { Feature } from 'ol';
import { borderPreset } from '../presets';

// @ts-ignore
const findThirdPointInBezierSpline = (from, to, curvature = 15) => {
    const [x1, y1] = from;
    const [x2, y2] = to;

    // 计算 AB 的长度
    const AB = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));

    // 计算单位向量
    const uX = (x2 - x1) / AB;
    const uY = (y2 - y1) / AB;

    // 计算垂直于 AB 的单位向量
    const nX = -uY;
    const nY = uX;

    // 计算 C 点的坐标
    const cos30 = Math.cos(Math.PI / (180 / curvature));
    const sin30 = Math.sin(Math.PI / (180 / curvature));

    const C1X = x1 + (AB / 2) * cos30 * uX - (AB / 2) * sin30 * nX;
    const C1Y = y1 + (AB / 2) * cos30 * uY - (AB / 2) * sin30 * nY;

    const C2X = x1 + (AB / 2) * cos30 * uX + (AB / 2) * sin30 * nX;
    const C2Y = y1 + (AB / 2) * cos30 * uY + (AB / 2) * sin30 * nY;

    return [
        [C1X, C1Y],
        [C2X, C2Y],
    ];
};

// @ts-ignore
const drawBezierSpline = (from, to, curvature = 15, properties = {}) => {
    const line = turf.lineString([from, findThirdPointInBezierSpline(from, to, curvature)[1], to]);
    const geo = turf.bezierSpline(line);
    geo.properties = properties;
    return geo;
};

export const getOdLayer: GetOdLayer = params => {
    const {
        data,
        curvature,
        style = borderPreset.default(),
        dataProjection = 'EPSG:4326',
        featureProjection = 'EPSG:3857',
    } = params;

    return new VectorLayer({
        source: new VectorSource({
            features: data.map(item => {
                let { from, to } = item;
                return new GeoJSON({
                    dataProjection,
                    featureProjection,
                }).readFeature(drawBezierSpline(from, to, curvature, item)) as Feature;
            }),
        }),
        style,
    });
};
