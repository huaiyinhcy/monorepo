const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/chunks/od-map.x6rY7JhP.js","assets/chunks/index.BOvSo5YR.js","assets/chunks/framework.BufGfe89.js","assets/chunks/index.C7-Tf2T7.js"])))=>i.map(i=>d[i]);
import{p as r,v as u,a$ as m,C as h,c as L,o as _,a_ as g,ad as p,G as n,j as c,ae as f,k as t,w as l,a as b}from"./chunks/framework.BufGfe89.js";import{O as y,E as v}from"./chunks/index.DrcuSlj0.js";const B=`<template>
    <simple-map ref="refSimpleMap" :adcode="100000">
        <div class="absolute left-0 bottom-0 z-5 text-xs">
            <div class="flex items-center gap-xs" v-for="item in legend">
                <div class="h-2.5 w-2.5 rounded-full" :style="{ background: item.color }"></div>
                <div class="label">{{ item.min }} - {{ item.max }}</div>
            </div>
        </div>
    </simple-map>
</template>

<script setup>
import SimpleMap from './index.vue';
import { onMounted, ref } from 'vue';
import { borderPreset, createLegend, getOdLayer } from '@huaiyinhcy/simple-map';

const refSimpleMap = ref();

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

onMounted(() => {
    const map = refSimpleMap.value.map();

    const odLayer = getOdLayer({
        // data: [from:[120,30],to:[121,31],value:10]
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
<\/script>
`,x=`<template>
    <div ref="refMap" class="map">
        <slot />
    </div>
</template>

<script setup>
import { onMounted, ref, toRefs } from 'vue';

import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';

import {
    borderPreset,
    clipLayerByVectorLayer,
    filterLayerByOptions,
    filterPresets,
    getDistrictLayer,
    getOdLayer,
    getTdtLayer,
} from '@huaiyinhcy/simple-map';

const props = defineProps({
    adcode: {
        type: Number,
        default: 330000,
    },
});

const { adcode } = toRefs(props);

const refMap = ref();

const your_tdt_key = '6547dabbe288ddc38c79efd5daa59019';

let map = null;

const init = async () => {
    // 创建地图
    map = new Map({
        target: refMap.value,
        view: new View({
            projection: 'EPSG:3857',
        }),
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
    imgLayer.setZIndex(-98);

    // 获取天地图影像注记
    const labelLayer = getTdtLayer({ tdtKey: your_tdt_key, layerType: 'cia' });
    labelLayer.setZIndex(-97);

    // 获取行政区边界
    const clipLayer = await getDistrictLayer({
        adcode: adcode.value,
        // 立体外边界
        style: borderPreset.fake3dBorder({ map, color: '#2f507e', offset: [3, 10] }),
    });
    clipLayer.setZIndex(-99);

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
            context.filter = filterOptions.map(({ type, value }) => \`\${type}(\${value})\`).join(' ');
            return context;
        },
    });*/

    // 获取行政区边界（分割）
    const districtLayer = await getDistrictLayer({
        adcode: adcode.value,
        split: true,
        style: borderPreset.default({ color: '#2f507e' }),
    });
    districtLayer.setZIndex(-96);

    // 添加图层 注意顺序
    map.addLayer(clipLayer);
    map.addLayer(imgLayer);
    map.addLayer(labelLayer);
    map.addLayer(districtLayer);

    // 设置视角
    map.getView().fit(clipLayer.getSource().getExtent(), { padding: [20, 20, 20, 20] });
};

onMounted(init);

defineExpose({ map: () => map });
<\/script>

<style scoped>
.map {
    height: 300px;
    position: relative;
}
</style>
`,Z=JSON.parse('{"title":"OpenLayers方法封装","description":"","frontmatter":{},"headers":[],"relativePath":"pages/simple-map.md","filePath":"pages/simple-map.md"}'),C={name:"pages/simple-map.md"},V=Object.assign(C,{setup(k){const i=r();u(async()=>{i.value=(await m(async()=>{const{default:o}=await import("./chunks/od-map.x6rY7JhP.js");return{default:o}},__vite__mapDeps([0,1,2,3]))).default});const a=r(!0),s=r();return u(async()=>{s.value=(await m(async()=>{const{default:o}=await import("./chunks/index.BOvSo5YR.js").then(e=>e.i);return{default:o}},__vite__mapDeps([1,2]))).default}),(o,e)=>{const d=h("ClientOnly");return _(),L("div",null,[e[2]||(e[2]=g("",6)),p(n(t(y),null,null,512),[[f,a.value]]),n(d,null,{default:l(()=>[n(t(v),{title:"",description:"",locale:"",select:"vue",order:"vue,react,html",github:"",gitlab:"",theme:"",lightTheme:"",darkTheme:"",stackblitz:"%7B%22show%22%3Afalse%7D",codesandbox:"%7B%22show%22%3Afalse%7D",codeplayer:"%7B%22show%22%3Afalse%7D",files:"%7B%22vue%22%3A%7B%7D%2C%22react%22%3A%7B%7D%2C%22html%22%3A%7B%7D%7D",scope:"",visible:!0,onMount:e[0]||(e[0]=()=>{a.value=!1}),vueCode:t(x)},{vue:l(()=>[n(t(s))]),_:1},8,["vueCode"])]),_:1}),e[3]||(e[3]=c("h2",{id:"od飞线图-与-图例",tabindex:"-1"},[b("od飞线图 与 图例 "),c("a",{class:"header-anchor",href:"#od飞线图-与-图例","aria-label":'Permalink to "od飞线图 与 图例"'},"​")],-1)),p(n(t(y),null,null,512),[[f,a.value]]),n(d,null,{default:l(()=>[n(t(v),{title:"",description:"",locale:"",select:"vue",order:"vue,react,html",github:"",gitlab:"",theme:"",lightTheme:"",darkTheme:"",stackblitz:"%7B%22show%22%3Afalse%7D",codesandbox:"%7B%22show%22%3Afalse%7D",codeplayer:"%7B%22show%22%3Afalse%7D",files:"%7B%22vue%22%3A%7B%7D%2C%22react%22%3A%7B%7D%2C%22html%22%3A%7B%7D%7D",scope:"",visible:!0,onMount:e[1]||(e[1]=()=>{a.value=!1}),vueCode:t(B)},{vue:l(()=>[n(t(i))]),_:1},8,["vueCode"])]),_:1})])}}});export{Z as __pageData,V as default};
