import { createApp, VNode } from 'vue';

/**
 * 转换组件为html
 * @param {VNode} h
 */
export const convertComponentsToHtml = (h: VNode) => {
  const app = createApp({
    render() {
      return h;
    },
  });
  const el = document.createElement('div');
  const mountedApp = app.mount(el);

  return mountedApp.$el.outerHTML;
};
