import { last, uniq } from 'lodash-es';
import type { TreeNode } from './types';

/**
 * 阻塞函数
 * @param ms - 阻塞的时间，单位为毫秒
 * @returns 返回一个 Promise，当阻塞结束后 resolve
 */
export const sleep = (ms: number): Promise<void> => {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
};

/**
 * 保存文件
 * @param blob - 要保存的 Blob 对象
 */
export const saveFile = (blob: Blob): void => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.click();
    URL.revokeObjectURL(a.href);
};

/**
 * 下载文件为 Blob，配合 saveFile 使用
 * @param url - 文件的 URL
 * @returns 返回一个 Promise，当文件下载完成后 resolve 并返回 Blob 对象
 */
export const downloadUrl = async (url: string): Promise<Blob> => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch URL: ${url}`);
    }
    return response.blob();
};

/**
 * 查找包含自身节点的父代节点
 * @param tree - 需要查找的树数据
 * @param condition - 判断条件函数
 * @param node - 找到的节点，可以不传
 * @returns 返回符合条件的节点
 */
export const findCurNode = <T>(
    tree: TreeNode<T>[],
    condition: (node: TreeNode<T>) => boolean,
    node: TreeNode<T> | null = null
): TreeNode<T> | null => {
    const stack: TreeNode<T>[] = [];
    for (const item of tree) {
        if (item) {
            stack.push(item);
            while (stack.length) {
                const temp = stack.pop()!; // 断言非空

                if (condition(temp)) {
                    node = temp;
                    break;
                }
                const children = temp.children || [];
                for (let i = children.length - 1; i >= 0; i--) {
                    if (children[i]) {
                        // 确保 children[i] 是有效的节点
                        stack.push(children[i]);
                    }
                }
            }
        }
    }
    return node;
};

/**
 * 查找包含自身节点的父代节点路径
 * @param tree - 需要查找的树
 * @param condition - 判断是否节点相等的函数
 * @param keyField - 自定义 key 字段
 * @param isNode - 是否返回节点对象，false 为返回节点的 key；true 为返回节点对象
 * @param path - 结果路径数组，可以不传
 * @returns 返回符合条件的路径数组
 */
export const findTreeSelect = <T>(
    tree: TreeNode<T>[],
    condition: (node: TreeNode<T>) => boolean,
    keyField: keyof T,
    isNode: boolean = false,
    path: Array<TreeNode<T> | T[keyof T]> = []
): Array<TreeNode<T> | T[keyof T]> => {
    if (!tree) {
        return [];
    }
    for (const data of tree) {
        isNode ? path.push(data) : path.push(data[keyField]);
        if (condition(data)) {
            return path;
        }
        if (data.children && data.children.length) {
            const findChildren = findTreeSelect(
                data.children,
                condition,
                keyField,
                isNode,
                path
            );
            if (findChildren.length) {
                return findChildren;
            }
        }
        path.pop();
    }
    return [];
};

/**
 * 树转列表
 * @param tree - 需要转换的树
 * @returns 返回树的扁平化列表
 */
export const tree2list = <T>(tree: TreeNode<T>[]): TreeNode<T>[] => {
    const list: TreeNode<T>[] = [];
    const stack: TreeNode<T>[] = [...tree];
    while (stack.length) {
        const node = stack.pop()!;
        const children = node.children;
        if (children) {
            stack.push(...children);
        }
        list.push(node);
    }
    return list;
};

/**
 * 级联选择器最后一层
 * @param treeList - 级联选择器的路径数组
 * @param keyField - 自定义 key 字段
 * @returns 返回最后一层的路径数组
 */
export const expandChildren = <T>(
    treeList: TreeNode<T>[][],
    keyField: keyof T
): string[][] => {
    return uniq(
        treeList
            .map(nodeList => {
                const path = nodeList.map(node => node[keyField]);
                const lastNode = last(nodeList);
                if (lastNode && lastNode.children) {
                    return lastNode.children.map(child =>
                        [...path, child[keyField]].join(',')
                    );
                }
                return path.join(',');
            })
            .flat(1)
    ).map(item => item.split(','));
};

/**
 * 计算等腰三角形顶点坐标
 * @param point1 - 第一个底角顶点的坐标，格式为 [x, y]
 * @param point2 - 第二个底角顶点的坐标，格式为 [x, y]
 * @param angle - 底角角度（单位：度）
 * @returns 返回一个对象，包含两个可能的顶点坐标
 */
export const calculateIsoscelesTriangleTopPoint = (
    [x1, y1]: [number, number],
    [x2, y2]: [number, number],
    angle: number
): {
    topPoint1: [number, number];
    topPoint2: [number, number];
} => {
    // 将角度转换为弧度
    const angleRad = angle * (Math.PI / 180);
    // 计算两点之间的夹角
    const baseAngle = Math.atan2(y2 - y1, x2 - x1);
    // 计算两点之间的距离
    const baseLength = Math.sqrt((y2 - y1) * (y2 - y1) + (x2 - x1) * (x2 - x1));
    // 计算等腰三角形的腰长
    const sideLength = baseLength / 2 / Math.cos(angleRad / 2);

    // 计算两个可能的顶点坐标
    const topPoint1: [number, number] = [
        x1 + Math.round(sideLength * Math.cos(baseAngle + angleRad / 2)),
        y1 + Math.round(sideLength * Math.sin(baseAngle + angleRad / 2)),
    ];
    const topPoint2: [number, number] = [
        x1 + Math.round(sideLength * Math.cos(baseAngle - angleRad / 2)),
        y1 + Math.round(sideLength * Math.sin(baseAngle - angleRad / 2)),
    ];

    return { topPoint1, topPoint2 };
};
