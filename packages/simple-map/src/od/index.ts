import * as turf from '@turf/turf';
import { GeoJSON } from 'ol/format';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import type { GetOdLayer } from './types';
import type { Feature } from 'ol';
import { borderPreset } from '../presets';

/**
 * 计算等腰三角形顶点坐标
 * @param point1 - 第一个底角顶点的坐标，格式为 [x, y]
 * @param point2 - 第二个底角顶点的坐标，格式为 [x, y]
 * @param angle - 底角角度（单位：度）
 * @returns 返回一个对象，包含两个可能的顶点坐标
 */
const calculateIsoscelesTriangleTopPoint = (
    [x1, y1]: [number, number],
    [x2, y2]: [number, number],
    angle: number
): {
    topPoint1: [number, number];
    topPoint2: [number, number];
} => {
    // 将角度转换为弧度
    const angleRad = angle * (Math.PI / 180);
    // 计算两点之间的夹角
    const baseAngle = Math.atan2(y2 - y1, x2 - x1);
    // 计算两点之间的距离
    const baseLength = Math.sqrt((y2 - y1) * (y2 - y1) + (x2 - x1) * (x2 - x1));
    // 计算等腰三角形的腰长
    const sideLength = baseLength / 2 / Math.cos(angleRad / 2);

    // 计算两个可能的顶点坐标
    const topPoint1: [number, number] = [
        x1 + Math.round(sideLength * Math.cos(baseAngle + angleRad / 2)),
        y1 + Math.round(sideLength * Math.sin(baseAngle + angleRad / 2)),
    ];
    const topPoint2: [number, number] = [
        x1 + Math.round(sideLength * Math.cos(baseAngle - angleRad / 2)),
        y1 + Math.round(sideLength * Math.sin(baseAngle - angleRad / 2)),
    ];

    return { topPoint1, topPoint2 };
};

export const getOdLayer: GetOdLayer = params => {
    const {
        data,
        curvature = 15,
        style = borderPreset.default(),
        dataProjection = 'EPSG:4326',
        featureProjection = 'EPSG:3857',
    } = params;

    return new VectorLayer({
        source: new VectorSource({
            features: data.map(item => {
                let { from, to } = item;

                const line = turf.lineString([
                    from,
                    calculateIsoscelesTriangleTopPoint(
                        from as [number, number],
                        to as [number, number],
                        curvature
                    ).topPoint1,
                    to,
                ]);
                const geo = turf.bezierSpline(line);
                geo.properties = item;

                return new GeoJSON({
                    dataProjection,
                    featureProjection,
                }).readFeature(geo) as Feature;
            }),
        }),
        style,
    });
};
