export interface Merc {
    toWgs84: (lngLat: [number, number]) => [number, number];
    toGcj02: (lngLat: [number, number]) => [number, number];
    toBd09: (lngLat: [number, number]) => [number, number];
}

export interface Wgs84 {
    toMerc: (lngLat: [number, number]) => [number, number];
    toGcj02: (lngLat: [number, number]) => [number, number];
    toBd09: (lngLat: [number, number]) => [number, number];
}

export interface Gcj02 {
    toMerc: (lngLat: [number, number]) => [number, number];
    toWgs84: (lngLat: [number, number]) => [number, number];
    toBd09: (lngLat: [number, number]) => [number, number];
}

export interface Bd09 {
    toMerc: (lngLat: [number, number]) => [number, number];
    toWgs84: (lngLat: [number, number]) => [number, number];
    toGcj02: (lngLat: [number, number]) => [number, number];
}
