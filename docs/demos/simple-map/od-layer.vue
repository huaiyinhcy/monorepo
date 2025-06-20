<template>
    <div ref="refMap" class="h-xs relative">
        <div v-if="legend" class="absolute left-0 bottom-0 z-5 text-xs">
            <div class="flex items-center gap-xs" v-for="item in legend">
                <div
                    class="h-2.5 w-2.5 rounded-full"
                    :style="{ background: item.color }"
                />
                <div class="label">
                    {{ Math.floor(item.min) }} - {{ Math.ceil(item.max) }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import 'ol/ol.css';
import { onMounted, ref } from 'vue';
import { Map, View } from 'ol';
import {
    borderPreset,
    clipLayerByVectorLayer,
    createLegend,
    filterLayerByOptions,
    filterPresets,
    getOdLayer,
    getTdtLayer,
} from '@huaiyinhcy/simple-map';
import { fromLonLat } from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import province from './geojson/province.json';
import city from './geojson/city.json';
import { GeoJSON } from 'ol/format';

const refMap = ref();

let map;

const init = () => {
    map = new Map({
        target: refMap.value,
        view: new View({
            center: fromLonLat([120.12, 30.18]),
            zoom: 8,
        }),
    });
};

const tdt = () => {
    const imgLayer = getTdtLayer({
        tdtKey: import.meta.env.VITE_TDT_KEY,
        layerType: 'img',
    });

    map.addLayer(imgLayer);

    const labelLayer = getTdtLayer({
        tdtKey: import.meta.env.VITE_TDT_KEY,
        layerType: 'cia',
    });

    map.addLayer(labelLayer);
};

const filter = () => {
    const layer = map.getLayers().getArray()[0];
    filterLayerByOptions({ layer, filterOptions: filterPresets.blue });
};

const clip = () => {
    const clipLayer = new VectorLayer({
        source: new VectorSource({
            features: new GeoJSON({
                dataProjection: 'EPSG:4326',
                featureProjection: 'EPSG:3857',
            }).readFeatures(
                province.features.find(
                    feature => feature.properties.name === '浙江省'
                )
            ),
        }),
    });
    map.getLayers()
        .getArray()
        .forEach(layerToBeClipped => {
            clipLayerByVectorLayer({ layerToBeClipped, clipLayer });
        });
    map.getView().fit(clipLayer.getSource().getExtent());
};

const border = () => {
    const borderLayer = new VectorLayer({
        source: new VectorSource({
            features: new GeoJSON({
                dataProjection: 'EPSG:4326',
                featureProjection: 'EPSG:3857',
            }).readFeatures(
                province.features.find(
                    feature => feature.properties.name === '浙江省'
                )
            ),
        }),
        style: borderPreset.fake3dBorder({
            map,
            color: '#3b61a4',
            offset: [5, 20],
        }),
    });
    borderLayer.setZIndex(-1);
    map.addLayer(borderLayer);
};

/**
 * odLayer
 */

const legend = ref();

const odLayer = () => {
    const zjCitys = city.features.filter(
        feature => feature.properties.parent?.adcode === 330000
    );

    const odData = zjCitys.slice(1).map(item => ({
        from: item.properties.center,
        to: zjCitys[0].properties.center,
        value: Math.round(10000 + Math.random() * 90000),
    }));

    legend.value = createLegend({ data: odData.map(({ value }) => value) });
    const odLayer = getOdLayer({
        data: odData,
        style: feature => {
            const value = feature.values_.value;
            const { color } = legend.value.find(item => {
                return item.min <= value && item.max > value;
            });
            return borderPreset.default({ color, width: 3 });
        },
    });
    odLayer.setZIndex(100);
    map.addLayer(odLayer);
};

onMounted(() => {
    // 初始化
    init();
    // 加载底图（天地图）
    tdt();
    // 底图滤镜
    filter();
    // 底图裁切
    clip();
    // 立体边界
    border();
    // OD飞线
    odLayer();
});
</script>
