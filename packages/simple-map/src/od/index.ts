import * as turf from '@turf/turf';
import { GeoJSON } from 'ol/format';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import type { GetOdLayer } from './types';
import type { Feature } from 'ol';
import { borderPreset } from '../presets';
import { calculateIsoscelesTriangleTopPoint } from '../../../utils/src';

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
