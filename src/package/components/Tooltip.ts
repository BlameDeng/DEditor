import { createElement } from "../utils";

export class Tooltip {
  public static createTooltip = (
    triggerNode: HTMLElement,
    msg: string | HTMLElement
  ): Tooltip => {
    const tooltip = new Tooltip(triggerNode, msg);
    tooltip.init();
    return tooltip;
  };

  private triggerNode: HTMLElement;
  private msg: string | HTMLElement;
  private el: HTMLDivElement;

  private constructor(triggerNode: HTMLElement, msg: string | HTMLElement) {
    this.triggerNode = triggerNode;
    this.msg = msg;
  }

  public init = (): void => {
    this.bindEvents();
  };

  /**
   * 暴露出关闭 tooltip 的方法
   */
  public hidden = () => {
    if (this.el) {
      this.el.classList.remove("active");
    }
  };

  /**
   * 渲染 tooltip
   */
  private renderTooltip = (): void => {
    const div = <HTMLDivElement>(
      createElement("div", { className: "de-tooltip-wrapper active" }, [
        {
          tagName: "div",
          options: { className: "de-tooltip-content" },
          children: [
            { tagName: "div", options: { className: "de-tooltip-arrow" } },
            { tagName: "div", options: { className: "de-tooltip-msg" } }
          ]
        }
      ])
    );
    const msgContainer = div.querySelector(".de-tooltip-msg")!;
    if (typeof this.msg === "string") {
      msgContainer.innerHTML = this.msg;
    } else {
      msgContainer.appendChild(this.msg);
    }
    this.el = document.body.appendChild(div);
  };

  /**
   * 定位 tooltip
   */
  private locateTooltip = () => {
    const { left, right, bottom } = this.triggerNode.getBoundingClientRect();
    const width = right - left;
    const { scrollX, scrollY } = window;
    this.el.style.left = left + scrollX + width / 2 + "px";
    this.el.style.top = bottom + scrollY + "px";
  };

  private bindEvents = (): void => {
    this.triggerNode.addEventListener("mouseenter", this.handleMouseEnter);
    this.triggerNode.addEventListener("mouseleave", this.hanldeMouseLeave);
  };

  private handleMouseEnter = (): void => {
    if (!this.el) {
      this.renderTooltip();
      this.locateTooltip();
    } else {
      this.el.classList.add("active");
    }
  };

  private hanldeMouseLeave = (): void => {
    if (this.el) {
      this.el.classList.remove("active");
    }
  };
}
