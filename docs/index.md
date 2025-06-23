---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
    name: A collection of simple and useful tools
    text: 简单实用的工具集
    actions:
        - theme: brand
          text: 开始使用
          link: /pages/packages/simple-map
        - theme: alt
          text: API Examples
          link: /pages/api-examples

features:
    - title: simple-map
      details: simple-map 是一款基于 OpenLayers 的方法封装，例如 加载底图 、 底图滤镜 、 底图裁切 、 立体边界 、 od飞线图 等，可以轻松集成到现有项目，避免重复编码，提高开发效率。
    - title: trans-coord
      details: 支持墨卡托（Mercator）、WGS84、高德（GCJ02）、百度（BD09）之间的坐标转换，无需调用外部接口，可在本地直接执行。
    - title: utils（实用方法）
      details: 一些实用方法的封装，可以轻松集成到现有项目，避免重复编码，提高开发效率。
---
