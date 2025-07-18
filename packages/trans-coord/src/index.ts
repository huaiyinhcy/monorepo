import { point, toMercator, toWgs84 } from '@turf/turf';
import type { Bd09, Gcj02, Merc, Wgs84 } from './types';

const PI = Math.PI;
const AXIS = 6378245.0;
const OFFSET = 0.00669342162296594323;
const X_PI = (PI * 3000) / 180;

// @ts-ignore
function outOfChina([lng, lat]): boolean {
    if (lng < 72.004 || lng > 137.8347) return true;
    return lat < 0.8293 || lat > 55.8271;
}

// @ts-ignore
function delta([wgLng, wgLat]) {
    let dLat = transformLat(wgLng - 105.0, wgLat - 35.0);
    let dLon = transformLng(wgLng - 105.0, wgLat - 35.0);
    const radLat = (wgLat / 180.0) * PI;
    let magic = Math.sin(radLat);
    magic = 1 - OFFSET * magic * magic;
    const sqrtMagic = Math.sqrt(magic);
    dLat =
        (dLat * 180.0) / (((AXIS * (1 - OFFSET)) / (magic * sqrtMagic)) * PI);
    dLon = (dLon * 180.0) / ((AXIS / sqrtMagic) * Math.cos(radLat) * PI);
    return [dLon, dLat];
}

function transformLat(x: number, y: number) {
    let ret =
        -100.0 +
        2.0 * x +
        3.0 * y +
        0.2 * y * y +
        0.1 * x * y +
        0.2 * Math.sqrt(Math.abs(x));
    ret +=
        ((20.0 * Math.sin(6.0 * x * PI) + 20.0 * Math.sin(2.0 * x * PI)) *
            2.0) /
        3.0;
    ret +=
        ((20.0 * Math.sin(y * PI) + 40.0 * Math.sin((y / 3.0) * PI)) * 2.0) /
        3.0;
    ret +=
        ((160.0 * Math.sin((y / 12.0) * PI) + 320 * Math.sin((y * PI) / 30.0)) *
            2.0) /
        3.0;
    return ret;
}

function transformLng(x: number, y: number) {
    let ret =
        300.0 +
        x +
        2.0 * y +
        0.1 * x * x +
        0.1 * x * y +
        0.1 * Math.sqrt(Math.abs(x));
    ret +=
        ((20.0 * Math.sin(6.0 * x * PI) + 20.0 * Math.sin(2.0 * x * PI)) *
            2.0) /
        3.0;
    ret +=
        ((20.0 * Math.sin(x * PI) + 40.0 * Math.sin((x / 3.0) * PI)) * 2.0) /
        3.0;
    ret +=
        ((150.0 * Math.sin((x / 12.0) * PI) +
            300.0 * Math.sin((x / 30.0) * PI)) *
            2.0) /
        3.0;
    return ret;
}

const merc: Merc = {
    toWgs84: lngLat => {
        const t = toWgs84(point(lngLat)).geometry.coordinates;
        return [t[0], t[1]];
    },
    toGcj02: lngLat => wgs84.toGcj02(merc.toWgs84(lngLat)),
    toBd09: lngLat => gcj02.toBd09(merc.toGcj02(lngLat)),
};

const wgs84: Wgs84 = {
    toMerc: lngLat => toMercator(point(lngLat) as any).geometry.coordinates,
    toGcj02: ([lng, lat]) => {
        if (!outOfChina([lng, lat])) {
            const [dLng, dLat] = delta([lng, lat]);
            lng += dLng;
            lat += dLat;
        }
        return [lng, lat];
    },
    toBd09: lngLat => gcj02.toBd09(wgs84.toGcj02(lngLat)),
};

const gcj02: Gcj02 = {
    toWgs84: ([lng, lat]) => {
        if (!outOfChina([lng, lat])) {
            const [dLng, dLat] = delta([lng, lat]);
            lng -= dLng;
            lat -= dLat;
        }
        return [lng, lat];
    },
    toBd09: ([lng, lat]) => {
        let x = lng;
        let y = lat;
        const z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * X_PI);
        const theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * X_PI);
        x = z * Math.cos(theta) + 0.0065;
        y = z * Math.sin(theta) + 0.006;
        return [x, y];
    },
    toMerc: lngLat => wgs84.toMerc(gcj02.toWgs84(lngLat)),
};

const bd09: Bd09 = {
    toWgs84: lngLat => gcj02.toWgs84(bd09.toGcj02(lngLat)),
    toGcj02: ([lng, lat]) => {
        let x = lng - 0.0065;
        let y = lat - 0.006;
        const z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * X_PI);
        const theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * X_PI);
        x = z * Math.cos(theta);
        y = z * Math.sin(theta);
        return [x, y];
    },
    toMerc: lngLat => wgs84.toMerc(bd09.toWgs84(lngLat)),
};

export { merc, wgs84, gcj02, bd09 };
