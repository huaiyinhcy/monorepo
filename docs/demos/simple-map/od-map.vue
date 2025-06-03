<template>
    <div ref="refMap" class="map">
        <div class="absolute left-0 bottom-0 z-5 text-xs">
            <div class="flex items-center gap-xs" v-for="item in legend">
                <div class="h-2.5 w-2.5 rounded-full" :style="{ background: item.color }"></div>
                <div class="label">{{ item.min }} - {{ item.max }}</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import {
    borderPreset,
    createLegend,
    filterLayerByOptions,
    filterPresets,
    getOdLayer,
    useMap,
} from '@huaiyinhcy/simple-map';

const refMap = ref();

/**
 * 就是simple-map中的内容
 */
const init = async () => {
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
        adcode: 100000,
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

    return map;
};

const coordinates = {
    北京: [116.407526, 39.90403],
    上海: [121.4737, 31.2304],
    天津: [117.200983, 39.084158],
    重庆: [106.50496, 29.533155],
    河北: [114.514945, 38.046825],
    山西: [112.54924, 37.857133],
    辽宁: [123.42906, 41.83544],
    吉林: [125.3245, 43.88684],
    黑龙江: [126.64466, 45.756967],
    江苏: [118.767413, 32.041482],
    浙江: [120.15506, 30.274105],
    安徽: [117.283933, 31.86119],
    福建: [119.30595, 26.075302],
    江西: [115.85847, 28.682965],
    山东: [117.000929, 36.653942],
    河南: [113.783406, 34.747005],
    湖北: [114.305469, 30.592804],
    湖南: [112.982279, 28.19409],
    广东: [113.2304, 23.1616],
    广西: [108.32754, 22.824022],
    海南: [110.349216, 20.017469],
    四川: [104.075832, 30.65166],
    贵州: [106.630129, 26.64227],
    云南: [102.712249, 25.040609],
    陕西: [108.948583, 34.26335],
    甘肃: [103.834329, 36.05808],
    青海: [101.778129, 36.623178],
    台湾: [121.305416, 25.033052],
    内蒙古: [111.670462, 40.818467],
    广西壮族自治区: [108.32754, 22.824022],
    宁夏回族自治区: [106.225183, 38.48637],
    新疆维吾尔自治区: [87.61618, 43.825784],
    西藏自治区: [91.11741, 29.646938],
    香港特别行政区: [114.169363, 22.395262],
    澳门特别行政区: [113.543883, 22.198745],
};

const values = [
    { from: '北京', to: '浙江', value: 120 },
    { from: '上海', to: '浙江', value: 150 },
    { from: '天津', to: '浙江', value: 80 },
    { from: '重庆', to: '浙江', value: 90 },
    { from: '河北', to: '浙江', value: 100 },
    { from: '山西', to: '浙江', value: 60 },
    { from: '辽宁', to: '浙江', value: 70 },
    { from: '吉林', to: '浙江', value: 50 },
    { from: '黑龙江', to: '浙江', value: 40 },
    { from: '江苏', to: '浙江', value: 180 },
    { from: '安徽', to: '浙江', value: 110 },
    { from: '福建', to: '浙江', value: 90 },
    { from: '江西', to: '浙江', value: 85 },
    { from: '山东', to: '浙江', value: 130 },
    { from: '河南', to: '浙江', value: 140 },
    { from: '湖北', to: '浙江', value: 100 },
    { from: '湖南', to: '浙江', value: 95 },
    { from: '广东', to: '浙江', value: 160 },
    { from: '广西', to: '浙江', value: 70 },
    { from: '海南', to: '浙江', value: 30 },
    { from: '四川', to: '浙江', value: 120 },
    { from: '贵州', to: '浙江', value: 80 },
    { from: '云南', to: '浙江', value: 75 },
    { from: '陕西', to: '浙江', value: 90 },
    { from: '甘肃', to: '浙江', value: 55 },
    { from: '青海', to: '浙江', value: 45 },
    { from: '台湾', to: '浙江', value: 20 },
    { from: '内蒙古', to: '浙江', value: 65 },
    { from: '广西壮族自治区', to: '浙江', value: 70 },
    { from: '宁夏回族自治区', to: '浙江', value: 50 },
    { from: '新疆维吾尔自治区', to: '浙江', value: 40 },
    { from: '西藏自治区', to: '浙江', value: 35 },
    { from: '香港特别行政区', to: '浙江', value: 25 },
    { from: '澳门特别行政区', to: '浙江', value: 20 },
];

const data = values.map(item => ({
    from: coordinates[item.from],
    to: coordinates[item.to],
    value: item.value,
}));

const legend = createLegend({
    data: values.map(item => item.value),
    /**
     * 定义了四种不同的分级方法类型 默认 equalInterval
     * 'equalInterval'：等间距分级法
     * 'quantile'：分位数分级法
     * 'jenks'：詹金斯优化分级法
     * 'stdDev'：标准差分级法
     */
    gradingMethod: 'equalInterval',
    // 分级数量 默认分5档
    gradingNum: 5,
    // 自定义颜色数组，如果不传则使用默认颜色数组
    // colors: [],
});

onMounted(async () => {
    const map = await init();

    const odLayer = getOdLayer({
        // data示例: [from:[120,30],to:[121,31],value:10]
        data,
        style: feature => {
            // 根据value值设置线颜色
            const value = feature.get('value');
            const color = legend.find(item => item.min <= value && item.max > value).color;
            return borderPreset.default({ color });
        },
    });

    map.addLayer(odLayer);
});
</script>

<style scoped>
.map {
    height: 300px;
    position: relative;
}
</style>