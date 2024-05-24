import { Directive, DirectiveBinding } from "vue";

export const lazy: Directive = {
  // 注册 v-lazy 指令
  // 当被绑定的元素挂载到 DOM 中时……
  mounted(el, binding) {
    // 元素的真实图片 URL
    const imgSrc = binding.value;

    // 初始时，设置图片为占位符或空字符串
    el.src =
      "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

    // 创建一个 Intersection Observer 实例
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          console.log("is entry", entry);
          if (entry.isIntersecting) {
            // 当元素进入视口时，设置真实的图片 URL
            el.src = imgSrc;
            // 停止观察
            observer.unobserve(el);
          }
        });
      },
      { threshold: 1.0 }
    ); // 阈值可以根据需要调整

    // 开始观察元素
    observer.observe(el);
  },
  // 如果图片的 URL 发生变化，需要重新设置
  updated(el, binding) {
    if (binding.value !== el.dataset.lazySrc) {
      el.src =
        "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
      el.dataset.lazySrc = binding.value;

      // 如果元素已经被观察，则无需再次创建新的观察器
      // 可以在这里添加逻辑来处理更新时的情况，但在这个简单的例子中，我们不这样做
    }
  },
  // 如果需要，可以添加其他钩子函数，如 unmounted
  unmounted(el) {
    // 清理工作，如果有的话
  },
};
