/**
 * 自调用匿名函数
 * */
(function (window, undefined) {
  // 构造 jQuery
  var jQuery = (function () {
    var jQuery = function (selector, context) {
      /**
       * 返回 jQuery.fn.init 的实例
      */
      return new jQuery.fn.init(selector, context, rootjQuery);
    };

    // ... 定义一堆变量


    /**
     * 覆盖构造函数 jQuery() 的原型对象 -> 减少继承的对象与属性  节省内存
    */
    jQuery.fn = jQuery.prototype = {
      /**
       * 覆盖原型对象的属性 constructor
      */
      constructor: jQuery,
      /**
       * 定义原型方法 负责解析 selector 和 context 的类型并执行相应的查找
      */
      init: function (selector, context, rootjQuery) {
        // ... 一堆原型属性和方法
        var match, elem, ret, doc;

        /**
         * 如果不存在 selector 或传入的是 null undefined 空字符串等可以转换为 false 的 则直接返回当前 jQuery 对象
         */
        if (!selector) {
          return this
        }

        /**
         * 如果参数是 body 
         * 手动设置 上下文对象为 document
         * 第一个元素指向 body 元素
         * 自身 length 为 1
         * 返回当前 jQuery 对象
         */
        if (selector === 'body' && !context && document.bdy) {
          this.context = document
          this[0] = document.body
          this.length = 1
          return this
        }

        // 如果参数是其他字符串
        if (typeof selector === 'string') {
          // 判断是 HTML 代码段 还是 ID
          if (selector.charAt(0) === '<' && selector.charAt(selector.length - 1) === '>' && selector.length >= 3) {
            match = [null, selector, null]
          } else {
            // 调用正则 判断是复杂HTML 还是 ID 
            // quickExpr = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/
            match = quickExpr.exec(selector)
          }

          // match 与 match[1] 都不是 false, 并且未传入 context
          if (match && match[1] || !context) {
            // 是 HTML 代码片段
            if (match[1]) {
              // 如果是简单 HTML 代码
              context = context instanceof jQuery ? context[0] : context // 有可能传入 jQuery 对象 $(document)
              doc = (context ? context.ownerDocument || context : document) // 修正 document 

              // 利用正则判断是否为单标签 rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>)?$/
              ret = rsingleTag.exec(selector);

              // 如果 rest 不是 null 则认为 selector 是单独标签
              if (ret) {
                // isPlainObject 用于检测是否是一个纯粹对象
                if (jQuery.isPlainObject(context)) {
                  // 是普通对象
                  selector = [document.createElement(ret[1])]
                  jQuery.fn.attr.call(selector, context, true)
                } else {
                  // 是单独标签
                  selector = [doc.createElementret(ret[1])]
                }
              } else {
                // 否则是复杂的 HTML 代码片段

                // 
                ret = jQuery.buildFragment([match[1], [doc]])
                // 如果 HTML 满足缓存条件  就先复制一份再使用
                selector = (ret.cacheable ? jQuery.clone(ret.fragment) : ret.fragment).childNodes
              }

              // 将创建的 DOM 元素数组合并到当前 jQuery 对象中
              return jQuery.merge(this, selector)
            } else {
              // 如果是 id
              elem = document.getElementById(match[2])

              // 检查 parentNode 属性  老版本 会返回不在文档中的 DOM 节点
              if (elem && elem.parentNode) {
                if (elem.id !== match[2]) {
                  // 查找到的和传入的不相等 就调用 find 查找 (Sizzle)
                  return rootjQuery.find(selector)
                }

                // 将属性和元素挂载到当前 jQuery 对象上
                this.length = 1
                this[0] = elem
              }

              this.context = document
              this.selector = selector
              return this
            }

          } else if (!context || context.jquery) {
            // selector 是选择器表达式  没有指定上下文
            return (context || rootjQuery).find(selector)

          } else {
            // 指定了上下文 上下文不是 jQuery 对象 先创建一个包含 context 的 jQuery 对象 然后调用 find
            return this.constructor(context).find(selector)
          }
        } else if (jQuery.isFunction(selector)) {
          /**
           * 如果 selector 是个函数
           * 就认为是要调用 ready 
           */
          return rootjQuery.ready(selector)
        }

        if (selector.selector !== undefined) {
          // 如果 selector 是 jQuery 对象 -> 复制到当前 jQuery 对象中
          this.selector = selector.selector
          this.context = selector.context
        }

        // 如果 selector 是其他任意值 都添加到当前 jQuery 对象中
        return jQuery.makeArray(selector, this)
      }
    };

    /**
     * 用 jQuery 构造函数的原型对象 jQuery.fn 覆盖 jQuery.fn.init() 的原型对象 -> 使得 init 实例可以调用 jQuery() 构造函数的属性和方法
    */
    jQuery.fn.init.prototype = jQuery.fn;

    /**
     * 合并两个或多个对象的属性到第一个对象
    */
    jQuery.extend = jQuery.fn.extend = function () { /* ... */ }

    /**
     * 执行 jQuery.extend() 在jQuery构造器上定义了一堆静态属性和方法
    */
    jQuery.extend({
      // 一堆静态属性和方法
    })

    /**
     * 返回 jQuery 构造函数并赋值给外层变量 jQuery
    */
    return jQuery;
  })();

  /**
   * 把 jQuery 、 $ 暴露给全局作用域 window
  */
  window.$ = window.jQuery = jQuery;
})(window);