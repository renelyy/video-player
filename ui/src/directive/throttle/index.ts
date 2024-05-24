import { Directive, DirectiveBinding } from "vue";

export const throttle: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const cb = binding.value;
    let delay = 1000;
    if (!delay) delay = 1000;
    let timer: any;
    el.addEventListener("click", (event) => {
      if (!timer) {
        console.log("running cb ");
        timer = setTimeout(() => {
          cb();
          timer = null;
        }, delay);
      } else {
        console.log("stopImmediatePropagation ...");
        event && event.stopImmediatePropagation();
      }
    });
  },
};
