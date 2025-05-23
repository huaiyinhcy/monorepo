# 坐标转换工具

支持墨卡托（Mercator）、WGS84、高德（GCJ02）、百度（BD09）之间的坐标转换，无需调用外部接口，可在本地直接执行。

## [Homepage](https://huaiyinhcy.github.io/npm-packages/pages/trans-coord.html)

## 安装

```shell
npm install @huaiyinhcy/trans-coord
```

##  最小示例

```javascript
import { gcj02 } from '@huaiyinhcy/trans-coord';

const gcj02Coord = [116.4, 39.92];

const bd09Coord = gcj02.toBd09(gcj02Coord);
```


