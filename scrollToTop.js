
/**
 * @description 滚动元素到顶部
 * @param {Number} aims 目标高度
 * @param {Element} el 被滚动的元素（不传默认滚动document）
 * @param {Function} cb 滚动完后回调
 */
function scrollToTop(aims, el, cb) {
    let target = null,
        height = aims ? aims : 0,
        ev = cb ? cb : (()=>{});

    if (el) {
        target = el;
    } else {
        target = document.documentElement;
    }

    // 缓动函数
    const cubic = value => Math.pow(value, 3);
    const easeInOutCubic = value => value < 0.5
        ? cubic(value * 2) / 2
        : 1 - cubic((1 - value) * 2) / 2;

    // 向上滚动
    const beginTime = Date.now();
    const beginValue = target.scrollTop;
    const rAF = window.requestAnimationFrame || (func => setTimeout(func, 16));
    const frameFunc = () => {
      const progress = (Date.now() - beginTime) / 500;
      if (progress < 1) {
        target.scrollTop = beginValue - (beginValue - height) * easeInOutCubic(progress);
        rAF(frameFunc);
      } else {
        target.scrollTop = height;
        ev();
      }
    };
    rAF(frameFunc);
}
