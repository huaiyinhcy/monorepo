const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/chunks/validate.DPa79Dug.js","assets/chunks/index.DCwICV7E.js","assets/chunks/index.C7-Tf2T7.js","assets/chunks/theme.DVfsfJ1H.js","assets/chunks/framework.BBpwGDFv.js","assets/chunks/minimal.CVpnsPEP.js"])))=>i.map(i=>d[i]);
import{p as i,v as u,a$ as m,C as y,c as _,o as C,a_ as g,ad as b,G as n,j as o,ae as v,k as t,w as r,a as s}from"./chunks/framework.BBpwGDFv.js";import{O as h,E as f}from"./chunks/index.DZlgMEcn.js";const k=`<template>
    <el-radio-group v-model="projection">
        <el-radio
            v-for="projection in projectionList"
            :key="projection.value"
            :label="projection.value"
            @change="handleChange"
        >
            {{ projection.label }}
        </el-radio>
    </el-radio-group>
    <el-descriptions border column="1">
        <el-descriptions-item
            :label="\`原始坐标(\${projectionList.find(({ value }) => value === projection).label})\`"
        >
            <div class="flex flex-justify-between gap-sm">
                <el-input v-model="coordinates" clearable />
                <el-button text :icon="Refresh" @click="handeClick" />
            </div>
        </el-descriptions-item>
        <el-descriptions-item
            v-for="{ value, label } in otherProjectionList"
            :label="label"
        >
            <div v-if="transedCoord" class="flex flex-justify-between gap-sm">
                {{ transedCoord[value]?.join(',') }}
                <el-button
                    text
                    :icon="CopyDocument"
                    @click="
                        () => copyToClipboard(transedCoord[value]?.join(','))
                    "
                />
            </div>
        </el-descriptions-item>
    </el-descriptions>
</template>

<script setup>
import * as transCoord from '@huaiyinhcy/trans-coord';
import { upperFirst } from 'lodash-es';
import { computed, onMounted, ref } from 'vue';
import { CopyDocument, Refresh } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';

const projectionList = [
    { label: 'WGS84坐标', value: 'wgs84' },
    { label: '高德坐标', value: 'gcj02' },
    { label: '百度坐标', value: 'bd09' },
    { label: '墨卡托投影坐标', value: 'merc' },
];

const projection = ref('gcj02');

const otherProjectionList = computed(() =>
    projectionList.filter(({ value }) => value !== projection.value)
);

const coordinates = ref('116.40,39.92');

const transedCoord = ref();

const handeClick = () => {
    try {
        const coord = coordinates.value.split(',').map(Number);
        const _ = {};
        otherProjectionList.value.forEach(({ value }) => {
            _[value] =
                transCoord[projection.value][\`to\${upperFirst(value)}\`](coord);
        });
        transedCoord.value = _;
    } catch (e) {
        console.warn(e);
        ElMessage.error('坐标转换失败');
    }
};

const handleChange = () => {
    transedCoord.value = null;
};

const copyToClipboard = text => {
    // 检查浏览器是否支持剪贴板操作
    if (!navigator.clipboard) {
        console.error('您的浏览器不支持剪贴板操作');
        return;
    }
    // 将文本复制到剪贴板
    navigator.clipboard
        .writeText(text)
        .then(() => {
            ElMessage.success(\`复制成功 \${text}\`);
        })
        .catch(err => {
            ElMessage.error(\`复制失败\`);
        });
};

onMounted(handeClick);
<\/script>

<style scoped>
.trans-coord {
    width: 100%;
}
</style>
`,w=`<template>
    <el-descriptions border column="1">
        <el-descriptions-item label="WGS84坐标">
            {{ gcj02Coord.join(',') }}
        </el-descriptions-item>
        <el-descriptions-item label="BD09坐标">
            {{ bd09Coord.join(',') }}
        </el-descriptions-item>
    </el-descriptions>
</template>

<script setup>
import { ref } from 'vue';
import { wgs84 } from '@huaiyinhcy/trans-coord';

const gcj02Coord = ref([116.4, 39.92]);

const bd09Coord = wgs84.toBd09(gcj02Coord.value);
<\/script>

<style scoped></style>
`,D=JSON.parse('{"title":"trans-coord","description":"","frontmatter":{},"headers":[],"relativePath":"pages/trans-coord.md","filePath":"pages/trans-coord.md"}'),j={name:"pages/trans-coord.md"},x=Object.assign(j,{setup(W){const d=i();u(async()=>{d.value=(await m(async()=>{const{default:l}=await import("./chunks/validate.DPa79Dug.js");return{default:l}},__vite__mapDeps([0,1,2,3,4]))).default});const a=i(!0),c=i();return u(async()=>{c.value=(await m(async()=>{const{default:l}=await import("./chunks/minimal.CVpnsPEP.js");return{default:l}},__vite__mapDeps([5,1,2,4]))).default}),(l,e)=>{const p=y("ClientOnly");return C(),_("div",null,[e[2]||(e[2]=g("",5)),b(n(t(h),null,null,512),[[v,a.value]]),n(p,null,{default:r(()=>[n(t(f),{title:"",description:"",locale:"",select:"vue",order:"vue,react,html",github:"",gitlab:"",theme:"",lightTheme:"",darkTheme:"",stackblitz:"%7B%22show%22%3Afalse%7D",codesandbox:"%7B%22show%22%3Afalse%7D",codeplayer:"%7B%22show%22%3Afalse%7D",files:"%7B%22vue%22%3A%7B%7D%2C%22react%22%3A%7B%7D%2C%22html%22%3A%7B%7D%7D",scope:"",visible:!0,onMount:e[0]||(e[0]=()=>{a.value=!1}),vueCode:t(w)},{vue:r(()=>[n(t(c))]),_:1},8,["vueCode"])]),_:1}),e[3]||(e[3]=o("h2",{id:"校验本工具",tabindex:"-1"},[s("校验本工具 "),o("a",{class:"header-anchor",href:"#校验本工具","aria-label":'Permalink to "校验本工具"'},"​")],-1)),e[4]||(e[4]=o("p",null,[s("你可以通过 "),o("a",{href:"https://lbs.amap.com/tools/picker",target:"_blank",rel:"noreferrer"},"高德坐标拾取工具"),s(" 跟 "),o("a",{href:"https://api.map.baidu.com/lbsapi/getpoint/index.html",target:"_blank",rel:"noreferrer"},"百度坐标拾取工具"),s(" 来进行校验")],-1)),e[5]||(e[5]=o("p",null,"当前坐标是北京故宫博物馆",-1)),b(n(t(h),null,null,512),[[v,a.value]]),n(p,null,{default:r(()=>[n(t(f),{title:"",description:"",locale:"",select:"vue",order:"vue,react,html",github:"",gitlab:"",theme:"",lightTheme:"",darkTheme:"",stackblitz:"%7B%22show%22%3Afalse%7D",codesandbox:"%7B%22show%22%3Afalse%7D",codeplayer:"%7B%22show%22%3Afalse%7D",files:"%7B%22vue%22%3A%7B%7D%2C%22react%22%3A%7B%7D%2C%22html%22%3A%7B%7D%7D",scope:"",visible:!0,onMount:e[1]||(e[1]=()=>{a.value=!1}),vueCode:t(k)},{vue:r(()=>[n(t(d))]),_:1},8,["vueCode"])]),_:1})])}}});export{D as __pageData,x as default};
