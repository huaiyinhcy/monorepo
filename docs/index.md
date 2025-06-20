---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
    name: simple-map、trans-coord、utils
    text: 简单、重复的代码。
    actions:
        - theme: brand
          text: Markdown Examples
          link: /pages/markdown-examples
        - theme: alt
          text: API Examples
          link: /pages/api-examples

features:
    - title: 坐标转换（trans-coord）
      details: 支持墨卡托（Mercator）、WGS84、高德（GCJ02）、百度（BD09）之间的坐标转换，无需调用外部接口，可在本地直接执行。
    - title: OpenLayers方法封装（simple-map）
      details: OpenLayers 常用方法封装，例如：行政区边界、底图裁切、底图换色、立体边界、od飞线图等。
    - title: 实用方法（utils）
      details: 一些实用的方法，免去重复编写的麻烦。
---
