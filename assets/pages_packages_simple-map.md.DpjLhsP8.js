const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/chunks/od-layer.Z0mizo8G.js","assets/chunks/index.BR2auVMv.js","assets/chunks/province.Wttuk8w2.js","assets/chunks/index.51x-q-WR.js","assets/chunks/index.BNk6Q-EU.js","assets/chunks/index.C7-Tf2T7.js","assets/chunks/framework.BBpwGDFv.js","assets/chunks/border.elaJOC5v.js","assets/chunks/clip.9iYuqBqP.js","assets/chunks/filter.2h1KKxTM.js","assets/chunks/tdt.D-1RKFCl.js"])))=>i.map(i=>d[i]);
import{p as s,v as n,a$ as c,C as w,c as V,o as T,a_ as _,ad as p,G as t,j as l,ae as m,k as r,w as i,a as f}from"./chunks/framework.BBpwGDFv.js";import{O as y,E as u}from"./chunks/index.DZlgMEcn.js";const B=`<template>
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
<\/script>
`,P=`<template>
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
    // odLayer();
});
<\/script>
`,S=`<template>
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
    // border();
    // OD飞线
    // odLayer();
});
<\/script>
`,D=`<template>
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
    // clip();
    // 立体边界
    // border();
    // OD飞线
    // odLayer();
});
<\/script>
`,E=`<template>
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
    // filter();
    // 底图裁切
    // clip();
    // 立体边界
    // border();
    // OD飞线
    // odLayer();
});
<\/script>
`,A=JSON.parse('{"title":"simple-map","description":"","frontmatter":{},"headers":[],"relativePath":"pages/packages/simple-map.md","filePath":"pages/packages/simple-map.md"}'),x={name:"pages/packages/simple-map.md"},O=Object.assign(x,{setup(j){const v=s();n(async()=>{v.value=(await c(async()=>{const{default:o}=await import("./chunks/od-layer.Z0mizo8G.js");return{default:o}},__vite__mapDeps([0,1,2,3,4,5,6]))).default});const L=s();n(async()=>{L.value=(await c(async()=>{const{default:o}=await import("./chunks/border.elaJOC5v.js");return{default:o}},__vite__mapDeps([7,1,2,3,4,6]))).default});const b=s();n(async()=>{b.value=(await c(async()=>{const{default:o}=await import("./chunks/clip.9iYuqBqP.js");return{default:o}},__vite__mapDeps([8,1,2,3,6]))).default});const g=s();n(async()=>{g.value=(await c(async()=>{const{default:o}=await import("./chunks/filter.2h1KKxTM.js");return{default:o}},__vite__mapDeps([9,1,3,6]))).default});const a=s(!0),h=s();return n(async()=>{h.value=(await c(async()=>{const{default:o}=await import("./chunks/tdt.D-1RKFCl.js");return{default:o}},__vite__mapDeps([10,1,6]))).default}),(o,e)=>{const d=w("ClientOnly");return T(),V("div",null,[e[5]||(e[5]=_('<h1 id="simple-map" tabindex="-1">simple-map <a class="header-anchor" href="#simple-map" aria-label="Permalink to &quot;simple-map&quot;">​</a></h1><p><code>simple-map</code> 是一款基于 <code>OpenLayers</code> 的方法封装，可以轻松集成到现有项目。</p><h2 id="安装" tabindex="-1">安装 <a class="header-anchor" href="#安装" aria-label="Permalink to &quot;安装&quot;">​</a></h2><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> i</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> @huaiyinhcy/simple-map</span></span></code></pre></div><h2 id="加载底图-天地图" tabindex="-1">加载底图（天地图） <a class="header-anchor" href="#加载底图-天地图" aria-label="Permalink to &quot;加载底图（天地图）&quot;">​</a></h2>',5)),p(t(r(y),null,null,512),[[m,a.value]]),t(d,null,{default:i(()=>[t(r(u),{title:"",description:"",locale:"",select:"vue",order:"vue,react,html",github:"",gitlab:"",theme:"",lightTheme:"",darkTheme:"",stackblitz:"%7B%22show%22%3Afalse%7D",codesandbox:"%7B%22show%22%3Afalse%7D",codeplayer:"%7B%22show%22%3Afalse%7D",files:"%7B%22vue%22%3A%7B%7D%2C%22react%22%3A%7B%7D%2C%22html%22%3A%7B%7D%7D",scope:"",visible:!0,onMount:e[0]||(e[0]=()=>{a.value=!1}),vueCode:r(E)},{vue:i(()=>[t(r(h))]),_:1},8,["vueCode"])]),_:1}),e[6]||(e[6]=l("h2",{id:"底图滤镜",tabindex:"-1"},[f("底图滤镜 "),l("a",{class:"header-anchor",href:"#底图滤镜","aria-label":'Permalink to "底图滤镜"'},"​")],-1)),p(t(r(y),null,null,512),[[m,a.value]]),t(d,null,{default:i(()=>[t(r(u),{title:"",description:"",locale:"",select:"vue",order:"vue,react,html",github:"",gitlab:"",theme:"",lightTheme:"",darkTheme:"",stackblitz:"%7B%22show%22%3Afalse%7D",codesandbox:"%7B%22show%22%3Afalse%7D",codeplayer:"%7B%22show%22%3Afalse%7D",files:"%7B%22vue%22%3A%7B%7D%2C%22react%22%3A%7B%7D%2C%22html%22%3A%7B%7D%7D",scope:"",visible:!0,onMount:e[1]||(e[1]=()=>{a.value=!1}),vueCode:r(D)},{vue:i(()=>[t(r(g))]),_:1},8,["vueCode"])]),_:1}),e[7]||(e[7]=l("h2",{id:"底图裁切",tabindex:"-1"},[f("底图裁切 "),l("a",{class:"header-anchor",href:"#底图裁切","aria-label":'Permalink to "底图裁切"'},"​")],-1)),p(t(r(y),null,null,512),[[m,a.value]]),t(d,null,{default:i(()=>[t(r(u),{title:"",description:"",locale:"",select:"vue",order:"vue,react,html",github:"",gitlab:"",theme:"",lightTheme:"",darkTheme:"",stackblitz:"%7B%22show%22%3Afalse%7D",codesandbox:"%7B%22show%22%3Afalse%7D",codeplayer:"%7B%22show%22%3Afalse%7D",files:"%7B%22vue%22%3A%7B%7D%2C%22react%22%3A%7B%7D%2C%22html%22%3A%7B%7D%7D",scope:"",visible:!0,onMount:e[2]||(e[2]=()=>{a.value=!1}),vueCode:r(S)},{vue:i(()=>[t(r(b))]),_:1},8,["vueCode"])]),_:1}),e[8]||(e[8]=l("h2",{id:"立体边界",tabindex:"-1"},[f("立体边界 "),l("a",{class:"header-anchor",href:"#立体边界","aria-label":'Permalink to "立体边界"'},"​")],-1)),p(t(r(y),null,null,512),[[m,a.value]]),t(d,null,{default:i(()=>[t(r(u),{title:"",description:"",locale:"",select:"vue",order:"vue,react,html",github:"",gitlab:"",theme:"",lightTheme:"",darkTheme:"",stackblitz:"%7B%22show%22%3Afalse%7D",codesandbox:"%7B%22show%22%3Afalse%7D",codeplayer:"%7B%22show%22%3Afalse%7D",files:"%7B%22vue%22%3A%7B%7D%2C%22react%22%3A%7B%7D%2C%22html%22%3A%7B%7D%7D",scope:"",visible:!0,onMount:e[3]||(e[3]=()=>{a.value=!1}),vueCode:r(P)},{vue:i(()=>[t(r(L))]),_:1},8,["vueCode"])]),_:1}),e[9]||(e[9]=l("h2",{id:"od飞线图",tabindex:"-1"},[f("od飞线图 "),l("a",{class:"header-anchor",href:"#od飞线图","aria-label":'Permalink to "od飞线图"'},"​")],-1)),p(t(r(y),null,null,512),[[m,a.value]]),t(d,null,{default:i(()=>[t(r(u),{title:"",description:"",locale:"",select:"vue",order:"vue,react,html",github:"",gitlab:"",theme:"",lightTheme:"",darkTheme:"",stackblitz:"%7B%22show%22%3Afalse%7D",codesandbox:"%7B%22show%22%3Afalse%7D",codeplayer:"%7B%22show%22%3Afalse%7D",files:"%7B%22vue%22%3A%7B%7D%2C%22react%22%3A%7B%7D%2C%22html%22%3A%7B%7D%7D",scope:"",visible:!0,onMount:e[4]||(e[4]=()=>{a.value=!1}),vueCode:r(B)},{vue:i(()=>[t(r(v))]),_:1},8,["vueCode"])]),_:1})])}}});export{A as __pageData,O as default};
