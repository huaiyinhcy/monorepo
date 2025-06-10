import type { Sleep, DownloadUrl, SaveFile, Tree2Array } from './types';

export const sleep: Sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export const saveFile: SaveFile = blob => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.click();
    URL.revokeObjectURL(a.href);
};

export const downloadUrl: DownloadUrl = async url => {
    const response = await fetch(url);
    return await response.blob();
};

export const tree2Arr: Tree2Array = tree => {
    const arr: any[] = [];
    const _ = (tree: any[], pid: any, level: number) => {
        tree.forEach(node => {
            const { children, ...data } = node;
            arr.push({ ...data, pid });
            if (node.children) _(node.children, node.id, level + 1);
        });
    };
    _(tree, null, 0);
    return arr;
};
