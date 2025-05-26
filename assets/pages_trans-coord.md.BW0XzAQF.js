const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/chunks/validate.D3wYcONM.js","assets/chunks/index.M0Upc7Kl.js","assets/chunks/index.C7-Tf2T7.js","assets/chunks/theme.CdXfM0SF.js","assets/chunks/framework.BufGfe89.js","assets/chunks/minimal.ozMy4OaB.js"])))=>i.map(i=>d[i]);
import{p as i,v as p,a$ as h,C as _,c as C,o as g,a_ as y,ad as m,G as t,j as a,ae as v,k as n,w as r,a as s}from"./chunks/framework.BufGfe89.js";import{O as b,E as f}from"./chunks/index.DrcuSlj0.js";const j=`<template>
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
        <el-descriptions-item v-for="{ value, label } in otherProjectionList" :label="label">
            <div v-if="transedCoord" class="flex flex-justify-between gap-sm">
                {{ transedCoord[value]?.join(',') }}
                <el-button
                    text
                    :icon="CopyDocument"
                    @click="() => copyToClipboard(transedCoord[value]?.join(','))"
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
            _[value] = transCoord[projection.value][\`to\${upperFirst(value)}\`](coord);
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
`,k=`<template>
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
`,w=JSON.parse('{"title":"坐标转换","description":"","frontmatter":{},"headers":[],"relativePath":"pages/trans-coord.md","filePath":"pages/trans-coord.md"}'),B={name:"pages/trans-coord.md"},x=Object.assign(B,{setup(M){const d=i();p(async()=>{d.value=(await h(async()=>{const{default:l}=await import("./chunks/validate.D3wYcONM.js");return{default:l}},__vite__mapDeps([0,1,2,3,4]))).default});const o=i(!0),c=i();return p(async()=>{c.value=(await h(async()=>{const{default:l}=await import("./chunks/minimal.ozMy4OaB.js");return{default:l}},__vite__mapDeps([5,1,2,4]))).default}),(l,e)=>{const u=_("ClientOnly");return g(),C("div",null,[e[2]||(e[2]=y('<h1 id="坐标转换" tabindex="-1">坐标转换 <a class="header-anchor" href="#坐标转换" aria-label="Permalink to &quot;坐标转换&quot;">​</a></h1><p>支持墨卡托（Mercator）、WGS84、高德（GCJ02）、百度（BD09）之间的坐标转换，无需调用外部接口，可在本地直接执行。</p><h2 id="安装" tabindex="-1">安装 <a class="header-anchor" href="#安装" aria-label="Permalink to &quot;安装&quot;">​</a></h2><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> i</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> @huaiyinhcy/trans-coords</span></span></code></pre></div><h2 id="最小示例" tabindex="-1">最小示例 <a class="header-anchor" href="#最小示例" aria-label="Permalink to &quot;最小示例&quot;">​</a></h2>',5)),m(t(n(b),null,null,512),[[v,o.value]]),t(u,null,{default:r(()=>[t(n(f),{title:"",description:"",locale:"",select:"vue",order:"vue,react,html",github:"",gitlab:"",theme:"",lightTheme:"",darkTheme:"",stackblitz:"%7B%22show%22%3Afalse%7D",codesandbox:"%7B%22show%22%3Afalse%7D",codeplayer:"%7B%22show%22%3Afalse%7D",files:"%7B%22vue%22%3A%7B%7D%2C%22react%22%3A%7B%7D%2C%22html%22%3A%7B%7D%7D",scope:"",visible:!0,onMount:e[0]||(e[0]=()=>{o.value=!1}),vueCode:n(k)},{vue:r(()=>[t(n(c))]),_:1},8,["vueCode"])]),_:1}),e[3]||(e[3]=a("h2",{id:"校验本工具",tabindex:"-1"},[s("校验本工具 "),a("a",{class:"header-anchor",href:"#校验本工具","aria-label":'Permalink to "校验本工具"'},"​")],-1)),e[4]||(e[4]=a("p",null,[s("你可以通过 "),a("a",{href:"https://lbs.amap.com/tools/picker",target:"_blank",rel:"noreferrer"},"高德坐标拾取工具"),s(" 跟 "),a("a",{href:"https://api.map.baidu.com/lbsapi/getpoint/index.html",target:"_blank",rel:"noreferrer"},"百度坐标拾取工具"),s(" 来进行校验")],-1)),e[5]||(e[5]=a("p",null,"当前坐标是北京故宫博物馆",-1)),m(t(n(b),null,null,512),[[v,o.value]]),t(u,null,{default:r(()=>[t(n(f),{title:"",description:"",locale:"",select:"vue",order:"vue,react,html",github:"",gitlab:"",theme:"",lightTheme:"",darkTheme:"",stackblitz:"%7B%22show%22%3Afalse%7D",codesandbox:"%7B%22show%22%3Afalse%7D",codeplayer:"%7B%22show%22%3Afalse%7D",files:"%7B%22vue%22%3A%7B%7D%2C%22react%22%3A%7B%7D%2C%22html%22%3A%7B%7D%7D",scope:"",visible:!0,onMount:e[1]||(e[1]=()=>{o.value=!1}),vueCode:n(j)},{vue:r(()=>[t(n(d))]),_:1},8,["vueCode"])]),_:1})])}}});export{w as __pageData,x as default};
