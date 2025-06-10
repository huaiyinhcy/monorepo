export type Sleep = (ms: number) => Promise<void>;

export type SaveFile = (blob: Blob) => any;

export type DownloadUrl = (url: string) => Promise<Blob>;

export type Tree2Array = (tree: any[]) => any[];
