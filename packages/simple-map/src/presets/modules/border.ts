import { Stroke, Style } from 'ol/style';
import { fromLonLat } from 'ol/proj';
import type { BorderPresets } from '../types';
import { defaultColor } from '../index';

const drawParallelogram = ({ ctx, point1, point2, point3, point4 }: any) => {
    ctx.beginPath();
    ctx.moveTo(...point1);
    ctx.lineTo(...point2);
    ctx.lineTo(...point4);
    ctx.lineTo(...point3);
    ctx.lineTo(...point1);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
};

const drawBorder = ({ ctx, coordinates, offsetX, offsetY }: any) => {
    for (let i = 1; i < coordinates.length; i++) {
        const point1 = coordinates[i - 1];
        const point2 = coordinates[i];
        const point3 = [point1[0] + offsetX, point1[1] + offsetY];
        const point4 = [point2[0] + offsetX, point2[1] + offsetY];
        drawParallelogram({ ctx, point1, point2, point3, point4 });
    }
};

export const borderPreset: BorderPresets = {
    default: (opts = {}) => {
        const { color = defaultColor, width = 1 } = opts;
        return new Style({
            stroke: new Stroke({
                color,
                width,
            }),
        });
    },
    fake3dBorder: params => {
        const { map, color = defaultColor, offset = [5, 5] } = params;
        const isMerc = map.getView().getProjection().getCode() === 'EPSG:3857';
        return new Style({
            renderer: (pixelCoordinates, e) => {
                //偏移单位量为赤道1经度的1/100
                const a = map.getPixelFromCoordinate(
                    isMerc ? fromLonLat([0, 0]) : [0, 0]
                );
                const b = map.getPixelFromCoordinate(
                    isMerc ? fromLonLat([1, 0]) : [1, 0]
                );
                const pixelUnit = Math.abs(a[0] - b[0]) / 100;

                const ctx = e.context;
                ctx.fillStyle = color;
                ctx.strokeStyle = color;
                pixelCoordinates.forEach((coordinate: any) => {
                    const coordinates = coordinate[0];
                    drawBorder({
                        ctx,
                        coordinates,
                        offsetX: offset[0] * pixelUnit,
                        offsetY: offset[1] * pixelUnit,
                    });
                });
            },
        });
    },
};
