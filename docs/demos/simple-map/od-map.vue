<template>
    <div ref="refMap" class="map" />
</template>

<script setup>
import { onMounted, ref } from 'vue';

import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';

import {tdt_key} from '../../config.json'
import {
    borderPreset,
    clipLayerByVectorLayer,
    filterLayerByFunction,
    filterLayerByOptions,
    filterPresets,
    getDistrictLayer,
    getTdtLayer,
} from '@huaiyinhcy/simple-map';

const refMap = ref();

const your_tdt_key = tdt_key;

const adcode = 100000;

const init = async () => {
    // 创建地图
    const map = new Map({
        target: refMap.value,
        view: new View({}),
    });

    /**
     * vec: 矢量底图
     * cva: 矢量注记
     * img: 影像底图
     * cia: 影像注记
     * ter: 地形晕渲
     * cta: 地形注记
     * ibo: 全球境界
     * */
    // 获取天地图影像底图
    const imgLayer = getTdtLayer({ tdtKey: your_tdt_key, layerType: 'img' });

    // 获取天地图影像注记
    const labelLayer = getTdtLayer({ tdtKey: your_tdt_key, layerType: 'cia' });

    // 获取行政区边界
    const clipLayer = await getDistrictLayer({
        adcode,
        // 立体外边界
        style: borderPreset.fake3dBorder({ map, color: '#2f507e', offset: [3, 10] }),
    });

    // 裁切 影响底图
    clipLayerByVectorLayer({ layerToBeClipped: imgLayer, clipLayer });

    // 裁切 影像注记
    clipLayerByVectorLayer({ layerToBeClipped: labelLayer, clipLayer });

    // 添加 地图滤镜
    filterLayerByOptions({ layer: imgLayer, filterOptions: filterPresets.blue() });

    // 你也可以使用更加灵活的方式实现底图换色功能
    /*filterLayerByFunction({
        layer: imgLayer,
        filterFunction: context => {
            /!**
             *  对 CanvasRenderingContext2D 进行操作
             *  filterLayerByOptions 是对 filterLayerByFunction 的封装
             *  下方代码实现了 filterLayerByOptions 的功能
             *!/
            const filterOptions = filterPresets.blue();
            context.filter = filterOptions.map(({ type, value }) => `${type}(${value})`).join(' ');
            return context;
        },
    });*/

    // 获取行政区边界（分割）
    const districtLayer = await getDistrictLayer({
        adcode,
        split: true,
        style: borderPreset.default({ color: '#2f507e' }),
    });

    // 添加图层 注意顺序
    map.addLayer(clipLayer);
    map.addLayer(imgLayer);
    map.addLayer(labelLayer);
    map.addLayer(districtLayer);

    // 设置视角
    map.getView().fit(clipLayer.getSource().getExtent(), { padding: [20, 20, 20, 20] });
};

onMounted(init);
</script>

<style scoped>
.map {
    height: 300px;
}
</style>
