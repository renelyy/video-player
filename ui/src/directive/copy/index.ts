import { Directive, DirectiveBinding } from "vue";

export const copy: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    el.addEventListener("click", () => {
      // 从指令的值中获取要复制的文本，或者从元素的文本内容中获取
      const text = binding.value || el.innerText || el.textContent;
      if (!text) return;

      // 尝试使用 navigator.clipboard API
      if (navigator.clipboard) {
        navigator.clipboard
          .writeText(text)
          .then(() => {
            console.log("复制成功");
          })
          .catch(() => {
            console.error("复制失败");
          });
      } else {
        // 如果浏览器不支持 navigator.clipboard API，可以使用回退方案
        // 但请注意，document.execCommand('copy') 已被许多现代浏览器弃用或限制
        // 这里只是作为一个示例，并不推荐在实际项目中使用
        const range = document.createRange();
        const selection = window.getSelection();

        range.selectNodeContents(el);
        if (!selection) return;
        selection.removeAllRanges();
        selection.addRange(range);

        try {
          const successful = document.execCommand("copy");
          selection.removeAllRanges();

          if (successful) {
            console.log("复制成功（回退方案）！");
          } else {
            console.log("复制失败（回退方案）！");
          }
        } catch (err) {
          console.error("复制失败（回退方案）：", err);
        }
      }
    });
  },
};
