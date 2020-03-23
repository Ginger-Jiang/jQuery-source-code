/**
 * 入口模块
 * 整体采用匿名自执行函数对代码进行封装
 * 传参:
 *    window:  传入浏览器顶级对象 window 1、减少作用域链查找性能开销 2、方便代码压缩
 *    undefined:  1、方便 undefined 被赋值 2、减少作用域链查找开销 3、方便代码压缩
 *  */
(function (window, undefined) {
  /**
   * 构造 jQuery 对象
   * 继续使用 立即执行函数
   */
  var jQuery = (function () {
    var jQuery = function (selector, context) {
      return new jQuery.fn.init(selector, context, rootjQuery)
    }
    return jQuery
  })()

  // 更多...


  /**
   * 将 $ 与 jQuery 挂载到全局 window 对象
   * 方便外界直接使用
   * 暴露两个, 防止与其他第三方库提供对象冲突
   */
  window.$ = window.jQuery = jQuery
})(window)