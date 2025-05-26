import { type Extent, getTopLeft, getWidth } from 'ol/extent';
import WMTSTileGrid from 'ol/tilegrid/WMTS';
import { get, type Projection } from 'ol/proj';
import type { Options as WMTSSourceOptions } from 'ol/source/WMTS';
import TileLayer from 'ol/layer/Tile';
import { WMTS } from 'ol/source';
import type { GetTdtLayer, GetTileGrid } from './types';

export const getTileGrid: GetTileGrid = params => {
    const { projectionExtent } = params;

    const size = getWidth(projectionExtent) / 256;

    const resolutions = new Array(18);

    const matrixIds = new Array(18);

    for (let z = 1; z < 19; ++z) {
        resolutions[z] = size / Math.pow(2, z);
        matrixIds[z] = z;
    }

    return new WMTSTileGrid({
        origin: getTopLeft(projectionExtent),
        resolutions: resolutions,
        matrixIds: matrixIds,
    });
};

export const getTdtLayer: GetTdtLayer = params => {
    const { layerType, proj = 'EPSG:3857', tdtKey } = params;

    if (!tdtKey) {
        throw new Error('tdtKey is not set');
    }

    const projection: Projection | null = get(proj);
    const projectionExtent: Extent | undefined = projection?.getExtent();

    if (!projection || !projectionExtent) {
        throw new Error('projection or projectionExtent is not set');
    }

    const tileGrid = getTileGrid({ projectionExtent });

    const opt: WMTSSourceOptions = {
        url: 'http://t{0-7}.tianditu.gov.cn',
        layer: layerType,
        matrixSet: proj === 'EPSG:3857' ? 'w' : 'c',
        format: 'tiles',
        style: 'default',
        projection,
        tileGrid,
        wrapX: true,
    };

    opt.url += `/${opt.layer}_${opt.matrixSet}/wmts?tk=${tdtKey}`;

    return new TileLayer({
        source: new WMTS(opt),
    });
};
