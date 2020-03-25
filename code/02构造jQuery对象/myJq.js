/**
 * 自调用匿名函数
 * */
(function(window, undefined) {
  // 构造 jQuery
  var jQuery = (function() {
    var jQuery = function(selector, context) {
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
      init: function(selector, context, rootjQuery) {
        // ... 一堆原型属性和方法
      }
    };

    /**
     * 用 jQuery 构造函数的原型对象 jQuery.fn 覆盖 jQuery.fn.init() 的原型对象 -> 使得 init 实例可以调用 jQuery() 构造函数的属性和方法
    */
    jQuery.fn.init.prototype = jQuery.fn;

    /**
     * 合并两个或多个对象的属性到第一个对象
    */
    jQuery.extend = jQuery.fn.extend = function() { /* ... */ }

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