import type { FilterPresets } from '../types';

export const filterPresets: FilterPresets = {
    blue: [
        {
            type: 'grayscale',
            value: '98%',
        },
        {
            type: 'invert',
            value: '100%',
        },
        {
            type: 'sepia',
            value: '20%',
        },
        {
            type: 'hue-rotate',
            value: '180deg',
        },
        {
            type: 'saturate',
            value: '1600%',
        },
        {
            type: 'brightness',
            value: '80%',
        },
        {
            type: 'contrast',
            value: '90%',
        },
    ],
};
