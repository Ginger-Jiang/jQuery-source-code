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

如果传入一个字符串参数, jQuery 会检查这个字符串是选择器表达式还是 HTML 代码. 如果是选择器表达式, 则遍历文档, 查找与之匹配的 DOM 元素, 并创建一个包含了这些 DOM 元素引用的 jQuery 对象. 如果没有元素与之匹配, 则创建一个空 jQuery 对象, 其中不包含任何元素, 其属性 length 等于 0.

默认情况下, 对匹配元素的查找将从根元素 document 对象开始, 即查找范围是整个文档树, 不过也可以传入第二个参数 context 来限定查找范围

如果选择器表达式 selector 是简单的 `#id`, 且没有指定上下文 context, 则调用浏览器原生方法 document.getElementById() 查找属性 id 等于指定值的元素; 如果是比 `#id` 复杂的选择器表达式或指定了上下文, 则通过 jQuery 方法 `.find()` 查找, 因此 `$('span', this)` 等价于 `$(this).find('span')`

```js
$('#app').click(function() {
  // $('span', this).html(222);
  $(this)
    .find('span')
    .html('find');
});
```

## jQuery(html [,ownerDocument])、jQuery(html, props)

### 第一个参数

如果传入的字符串参数看起来像一段 HTML 代码, jQuery 则尝试用这段 HTML 代码创建新的 DOM 元素, 并创建一个包含了这些 DOM 元素引用的 jQuery 对象.

```js
$('<button>CLICK ME</button>').appendTo('body');
```

如果 HTML 代码是一个单独标签, jQuery 会使用浏览器原生方法 document.createElement() 创建 DOM 元素

如果是多层嵌套 HTML 片段, 则利用浏览器的 innerHTML 机制创建 DOM 元素, 这个过程由 `jQuery.buildFragment()` 和 `jQuery.clean()` 实现

### 第二个参数

ownerDocument 用于指定创建新 DOM 元素的文档对象, 如果不传入, 则默认为当前文档对象

如果 HTML 代码是一个单独标签, 那么第二个参数还可以是 props, props 是一个包含了属性、事件的普通对象; 在调用 document.createElement() 创建 DOM 元素后, 参数 props 会被传给 jQuery 方法 `.attr()`, 然后由 `.attr()` 负责把 props 中的属性、事件设置到新穿创建的 DOM 元素上

参数 props 的属性可以是任意的事件类型（如"click"），此时属性值应该是事件监听函数，它将被绑定到新创建的 DOM 元素上；参数 props 可以含有以下特殊属性：val、css、html、text、data、width、height、offset，相应的 jQuery 方法：`.val()`、`.css()`、`.html()`、`.text()`、`.data()`、`.width()`、`.height()`、`.offset()将被执行，并且属性值会作为参数传入；其他类型的属性则会被设置到新创建的 DOM 元素上，某些特殊属性还会做跨浏览器兼容（如 type、value、tabindex 等）；可以通过属性名 class 设置类样式，但要用引号把 class 包裹起来，因为 class 是 JavaScript 保留字。

```js
$('<div />', {
  text: '哈哈',
  class: 'active',
  click: function() {
    console.log((this.innerHTML = '嘻嘻'));
  }
}).appendTo('body');
```

## jQuery(element)、jQuery(elementArray)

如果传入一个 DOM 元素或 DOM 元素数组, 则把 DOM 元素封装到 jQuery 对象中并返回

这个功能常见于事件监听函数, 即把关键字 this 因用那个的 DOM 元素封装为 jQuery 对象, 然后在该 jQuery 对象上调用 jQuery 方法

```js
$('div').click(function() {
  $(this).slideUp();
});
```

## jQuery(object)

如果传入一个普通 JavaScript 对象, 则把该对象封装到 jQuery 对象中并返回

这个功能可以方便的在普通 JavaScript 对象上实现自定义事件的绑定和触发

```js
var $foo = $({ foo: 'bar', hello: 'worldd' });
$foo.on('custom', function() {
  console.log(this.foo);
});
$foo.trigger('custom'); // -> foo
```

## jQuery(callback)

如果传入一个函数, 则在 document 上绑定一个 ready 事件监听函数, 当 DOM 结构加载完成时执行. ready 事件的触发要早于 load 事件.

ready 事件并不是浏览器原生事件, 而是 DOMContentLoaded 事件、onreadystatechange 事件和函数 doScrollCheck() 的统称

```js
$(function() {
  console.log('DOM 加载完毕');
});
```

## jQuery(jQuery object)

如果传入一个 jQuery 对象, 则创建该 jQuery 对象的一个副本并返回, 副本与传入的 jQuery 对象引用完全相同的 DOM 元素

```js
var $app = $('#app');
$app.html('xuxu'); // -> $('#app').html('xuxu')
```

## jQuery()

如果不传入任何参数, 则返回一个空的 jQuery 对象, 属性 length 为 0.

这个功能可以用来复用 jQuery 对象
