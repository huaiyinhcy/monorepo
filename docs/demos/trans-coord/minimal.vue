<template>
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
</script>

<style scoped></style>
