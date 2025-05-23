import * as turf from '@turf/turf';
import { GeoJSON } from 'ol/format';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Feature } from 'ol';
import { Style } from 'ol/style';
import type { GetOdLayer } from './types';

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
const drawBezierSpline = (from, to, curvature = 15) => {
    const line = turf.lineString([from, findThirdPointInBezierSpline(from, to, curvature)[1], to]);
    return turf.bezierSpline(line, { sharpness: 1 });
};

export const getOdLayer: GetOdLayer = params => {
    const { data, curvature } = params;

    const features = data.map(item => {
        let { from, to } = item;
        const feature = new GeoJSON().readFeature(drawBezierSpline(from, to, curvature));
        (feature as any).values_.item = item;
        return feature as Feature;
    });

    return new VectorLayer({
        source: new VectorSource({ features }),
        style: (() => {
            return new Style({
                renderer: (pixelCoordinate, e) => {
                    const ctx: CanvasRenderingContext2D = e.context;
                    if (!ctx) throw new Error('No CanvasRenderingContext2D available');
                    ctx.strokeStyle = 'black';
                    ctx.lineWidth = 5;
                    ctx.beginPath();
                    for (let i = 0; i < pixelCoordinate.length; i++) {
                        const [x, y] = pixelCoordinate[i] as any;
                        ctx.lineTo(x, y);
                    }
                    ctx.stroke();
                },
            });
        })(),
    });
};
