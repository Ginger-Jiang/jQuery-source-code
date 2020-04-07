## 实现原理

方法 jQuery.clean(elems, context, fragment, scripts) 负责把 HTML 代码转换为 DOM 元素, 并提取其中的 script 元素. 该方法先创建一个临时的 div 元素, 并将其插入一个安全文档片段中, 然后把 HTML 代码赋值给 div 元素的 innerHTML 属性, 浏览器会自动生成 DOM 元素, 最后解析 div 元素的子元素得到转换后的 DOM 元素

安全文档片段只能正确渲染 HTML5 元素的文档片段, 通过在文档片段上创建 HTML5 元素, 可以教会浏览器正确的渲染 HTML5 元素

如果 HTML 代码中含有需要包裹在父标签中的子标签, 方法会先在 HTML 代码前后加上父标签核关闭标签, 在设置临时 div 元素的 innerHTML 属性生成 DOM 元素后, 再层层取出 HTML 代码对应的 DOM 元素

如果 HTML 代码中含有 `<script>` 标签, 为了能执行 `<script>` 标签所包含的 JavaScript 代码或引用的 JavaScript 文件, 在设置临时 div 元素的 innerHTML 属性生成 DOM 元素后, 方法 jQuery.clean() 会提取其中的 script 元素放入数组 scripts, 将含有 `<script>` 标签的 HTML 代码设置给某个元素的 innderHTML 属性后, `<script>` 标签所包含的 JavaScript 代码不会自动执行, 所引用的 JavaScript 文件也不会加载和执行.

## 执行步骤

- 创建一个临时 div 元素, 并插入一个安全文档片段中
- 为 HTML 代码包裹必要的父标签, 然后赋值给临时 div 元素的 innerHTML 属性, 从而将 HTML 代码转换为 DOM 元素, 之后再层层剥去包裹的父元素, 得到转换后的 DOM 元素
- 移除 IE6/7 自动插入的空 tbody 元素, 插入 IE6/7/8 自动剔除的前导空白符
- 取到转换后的 DOM 元素集合
- 在 IE6/7 中修正复选框核单选按钮的选中状态
- 合并转换后的 DOM 元素
- 如果传入了文档片段 fragment, 则提取所有合法的 script 元素 存入数组 scripts, 并把其他元素插入文档片段 fragment
- 返回转换后的 DOM 元素数组

## 源码分析

jQuery.clean(elems, context, fragment, scripts), 接受四个参数

- elems: 数组, 包含了待转换的 HTML 代码
- context: 文档对象, 该参数在 jQuery.buildFragment() 中被修正为正确的文档对象(变量 doc), 然后调用它的方法 createTextNode() 创建文本节点、调用方法 createElement() 创建临时 div 元素
- fragment: 文档片段, 作为存放转换后的 DOM 元素的占位符, 该参数在 jQuery.buildFragment()中被创建
- scripts: 数组, 用于存放转换后的 DOM 元素中的 script 元素

修正文档对象 context

```js
var checkScriptType,
  script,
  j,
  ret = [];

context = context || document;

// 如果当前对象没有 创建的方法 就尝试读取 ownerDocument 或 context[0] 如果都没有  就默认当前文档对象 document
if (typeof context.createElement === "undefined") {
  context =
    context.ownerDocument ||
    (context[0] && context[0].ownerDocument) ||
    document;
}
```
