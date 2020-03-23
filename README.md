# jQuery-source-code

本文主要以 [《jQuery 技术内幕》](https://www.amazon.cn/dp/B00J2197XE/ref=sr_1_1?__mk_zh_CN=%E4%BA%9A%E9%A9%AC%E9%80%8A%E7%BD%91%E7%AB%99&keywords=%E3%80%8AjQuery+%E6%8A%80%E6%9C%AF%E5%86%85%E5%B9%95%E3%80%8B&qid=1584927985&sr=8-1) 为学习参考书籍, 为保证与书籍内容同步, 以 jQuery 1.7.2 为学习版本进行.

本次学习主要使用 "笨鸟多飞" 方式对相关节点代码进行逐行注释理解.

## 补充说明

- 多数情况下, 内容不参考 ES6 新特性 比如: 块级作用域
- 为保证难度曲线不过与离谱, 在每一章节中 添加 `myJq.js` 文件, 表示这一节中解读源码的内容部分

## 章节

- 总体架构

  jQuery 的模块可以分为 3 部分：入口模块、底层支持模块和功能模块.

  - 总体架构

- 构造 jQuery 对象

  jQuery 对象是一个类数组对象，含有连续的整型属性、length 属性和大量的 jQuery 方法。jQuery 对象由构造函数 jQuery()创建，\$()则是 jQuery()的缩写。

  - 构造函数 jQuery()
