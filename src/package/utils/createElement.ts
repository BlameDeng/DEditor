interface Option {
  [propName: string]: any;
}

interface Child {
  tagName: string;
  options?: Option;
  children?: Child[];
}

/**
 * 封装 document.createElement()
 * @param tagName 标签名
 * @param options 元素的属性，如 class，style 等
 * @param children 子元素数组
 * @return 创建的 HTMLElement
 */
export function createElement(
  tagName: string,
  options?: Option,
  children?: Child[]
): HTMLElement {
  const el = document.createElement(tagName);
  if (options) {
    for (const key in options) {
      if (options.hasOwnProperty(key)) {
        el[key] = options[key];
      }
    }
  }
  if (children && children.length) {
    children.forEach(child => {
      el.appendChild(
        createElement(child.tagName, child.options, child.children)
      );
    });
  }
  return el;
}
