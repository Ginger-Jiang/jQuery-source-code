# 构造函数 jQuery

构造函数 jQuery 有七种用法:

- jQuery(select [,context]): 接受一个 CSS 选择器表达式和可选的选择器上下文, 返回一个包含了匹配的 DOM 元素的 jQuery 对象
- jQuery(html,[, ownerDocument])、jQuery(html, props): 用提供的 HTML 代码创建 DOM 元素
- jQuery(element)、jQuery(elementArray): 封装 DOM 元素为 jQuery 对象
- jQuery(object): 封装普通对象为 jQuery 对象
- jQuery(callback): 绑定 ready 事件监听函数, 当 DOM 结构加载完成时执行
- jQuery(jQuery object): 接受一个 jQuery 对象, 返回该 jQuery 对象的拷贝副本
- jQuery(): 创建一个 jQuery 对象

## jQuery(select [,context])