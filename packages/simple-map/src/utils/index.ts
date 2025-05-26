import { Fill, Style } from 'ol/style';
import { getVectorContext } from 'ol/render';
import { filterPresets } from '../presets';
import type {
    FilterLayerByOptions,
    FilterLayerByFunction,
    SplitDistrictLayerByFunction,
} from './types';
import type { ClipLayerByVectorLayer } from './types';

export const clipLayerByVectorLayer: ClipLayerByVectorLayer = params => {
    const { layerToBeClipped, clipLayer } = params;
    const source = clipLayer.getSource();
    if (!source) throw new Error('clipLayer source not found');

    source.on('addfeature', function () {
        console.log(source.getExtent());
        layerToBeClipped.setExtent(source.getExtent());
    });

    const style = new Style({
        fill: new Fill({
            color: 'rgba(0,0,0,0)',
        }),
    });

    layerToBeClipped.on('prerender', function (e: any) {
        let vectorContext = getVectorContext(e);
        e.context.globalCompositeOperation = 'source-over';
        let ctx = e.context;
        ctx.save();
        source.forEachFeature(function (feature) {
            vectorContext.drawFeature(feature, style);
        });
        ctx.clip();
    });

    layerToBeClipped.on('postrender', function (e: any) {
        let ctx = e.context;
        ctx.restore();
    });
};

export const filterLayerByFunction: FilterLayerByFunction = params => {
    const { layer, filterFunction } = params;
    const tileLoadFunction = (func: Function) => {
        return (imageTile: any, src: string) => {
            const img = new Image();
            img.setAttribute('crossOrigin', 'anonymous');
            img.onload = function () {
                const canvas = document.createElement('canvas');
                const w = img.width;
                const h = img.height;
                canvas.width = w;
                canvas.height = h;
                const context = canvas.getContext('2d');
                if (context) {
                    const newContext = func(context);
                    newContext.drawImage(img, 0, 0, w, h, 0, 0, w, h);
                    imageTile.getImage().src = canvas.toDataURL('image/png');
                }
            };
            img.src = src;
        };
    };
    const source: any = layer.getSource();
    source.setTileLoadFunction(tileLoadFunction(filterFunction));
    layer.setSource(source);
};

export const filterLayerByOptions: FilterLayerByOptions = params => {
    const { layer, filterOptions = filterPresets.blue() } = params;
    const filterFunction = (context: CanvasRenderingContext2D) => {
        context.filter = filterOptions
            .map(({ type, value }: { type: string; value: string }) => `${type}(${value})`)
            .join(' ');
        return context;
    };
    filterLayerByFunction({ layer, filterFunction });
};

export const splitMultiPolygonToPolygons: SplitDistrictLayerByFunction = geoJSON => {
    // 检查输入是否为FeatureCollection
    if (geoJSON.type !== 'FeatureCollection') {
        throw new Error('Input must be a FeatureCollection');
    }

    // 用于存储拆分后的Polygon Feature
    const newFeatures: any[] = [];

    // 遍历每个Feature
    geoJSON.features.forEach((feature: any) => {
        // 如果Feature的geometry是MultiPolygon
        if (feature.geometry.type === 'MultiPolygon') {
            // 遍历MultiPolygon的每个Polygon
            feature.geometry.coordinates.forEach((polygonCoords: any, index: number) => {
                // 创建一个新的Polygon Feature
                const newFeature = {
                    type: 'Feature',
                    properties: {
                        ...feature.properties, // 复制原有属性
                        originalFeatureId: feature.id, // 添加原始Feature的ID
                        polygonIndex: index, // 添加当前Polygon的索引
                    },
                    geometry: {
                        type: 'Polygon',
                        coordinates: polygonCoords, // 当前Polygon的坐标
                    },
                };
                // 将新的Polygon Feature添加到结果数组中
                newFeatures.push(newFeature);
            });
        } else {
            // 如果不是MultiPolygon，直接复制到结果数组中
            newFeatures.push(feature);
        }
    });

    // 返回一个新的FeatureCollection
    return {
        type: 'FeatureCollection',
        features: newFeatures,
    };
};
