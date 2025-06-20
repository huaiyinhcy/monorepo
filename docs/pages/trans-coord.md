# trans-coord

支持墨卡托（Mercator）、WGS84、高德（GCJ02）、百度（BD09）之间的坐标转换，无需调用外部接口，可在本地直接执行。

## 安装

```shell
    npm i @huaiyinhcy/trans-coords
```

## 最小示例

<demo vue="../demos/trans-coord/minimal.vue" />

## 校验本工具

你可以通过
[高德坐标拾取工具](https://lbs.amap.com/tools/picker)
跟
[百度坐标拾取工具](https://api.map.baidu.com/lbsapi/getpoint/index.html)
来进行校验

当前坐标是北京故宫博物馆

<demo vue="../demos/trans-coord/validate.vue" />
