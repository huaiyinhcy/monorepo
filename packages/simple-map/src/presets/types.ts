import { Style } from 'ol/style';
import { Map } from 'ol';
import type { FilterOptionItem } from '../other/types';

export interface BorderPresets {
    default: (params?: { color?: string; width?: number }) => Style;
    fake3dBorder: (params: {
        map: Map;
        color?: string;
        offset?: number[];
    }) => Style;
}

export interface FilterPresets {
    blue: FilterOptionItem[];
}

export interface LegendPresets {
    morandi: string[];
}
