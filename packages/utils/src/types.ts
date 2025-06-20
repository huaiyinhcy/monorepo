export type TreeNode<T> = {
    [key: string]: any; // 泛型节点类型
    children?: TreeNode<T>[]; // 子节点数组
} & T;
