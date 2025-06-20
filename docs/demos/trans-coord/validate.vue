<template>
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
            :label="`原始坐标(${projectionList.find(({ value }) => value === projection).label})`"
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
                transCoord[projection.value][`to${upperFirst(value)}`](coord);
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
            ElMessage.success(`复制成功 ${text}`);
        })
        .catch(err => {
            ElMessage.error(`复制失败`);
        });
};

onMounted(handeClick);
</script>

<style scoped>
.trans-coord {
    width: 100%;
}
</style>
