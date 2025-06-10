<template>
    <div ref="refMap" class="map" />
</template>

<script setup>
import { borderPreset, filterLayerByOptions, filterPresets, useMap } from '@huaiyinhcy/simple-map';
import { onMounted, ref } from 'vue';

const refMap = ref();

onMounted(async () => {
    /**
     * 快速使用 useMap
     * @param params
     * @param params.tdtKey 天地图API Key
     * @param params.target 目标容器
     * @param params.proj 地图坐标
     * @param params.adcode 行政区划代码
     * @param params.basicLayerType 基础图层类型
     * @param params.label 是否显示注记图层 默认显示
     * @param params.clip 是否裁切 默认裁切
     * @param params.clipBorder 裁切边界样式 默认为灰色边框
     * @param params.zoom 缩放级别 默认13 如果裁切则自适应
     * @param params.center 地图中心点 默认[104.06, 30.67] 如果裁切则自适应
     */
    const map = await useMap({
        tdtKey: import.meta.env.VITE_TDT_KEY,
        adcode: 330000,
        target: refMap.value,
        splitBorder: borderPreset.default({ color: '#2f507e' }),
    });

    const basicLayer = map
        .getLayers()
        .getArray()
        .find(layer => layer.get('name') === 'basicLayer');

    filterLayerByOptions({ layer: basicLayer, filterOptions: filterPresets.blue });

    const clipLayer = map
        .getLayers()
        .getArray()
        .find(layer => layer.get('name') === 'clipLayer');

    // 立体边界需要传入map实例进行计算 所以在初始化之后单独设置
    clipLayer.setStyle(borderPreset.fake3dBorder({ map, color: '#2f507e', offset: [3, 15] }));
});
</script>

<style scoped>
.map {
    height: 300px;
    position: relative;
}
</style>
