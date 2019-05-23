import { createElement } from "../utils";

export class Tooltip {
  private triggerNode: HTMLElement;
  private msg: string;
  private el: HTMLDivElement;

  public static createTooltip = (
    triggerNode: HTMLElement,
    msg: string
  ): Tooltip => {
    const tooltip = new Tooltip(triggerNode, msg);
    tooltip.init();
    return tooltip;
  };

  private constructor(triggerNode: HTMLElement, msg: string) {
    this.triggerNode = triggerNode;
    this.msg = msg;
  }

  public init = (): void => {
    this.initDOM();
    this.bindEvents();
  };

  private initDOM = (): void => {};

  /**
   * 渲染 tooltip
   */
  private renderTooltip = (): void => {
    const div = createElement(
      "div",
      { className: "de-tooltip-wrapper active" },
      [
        {
          tagName: "div",
          options: { className: "de-tooltip-content" },
          children: [
            { tagName: "div", options: { className: "de-tooltip-arrow" } },
            { tagName: "div", options: { className: "de-tooltip-msg" } }
          ]
        }
      ]
    ) as HTMLDivElement;
    div.querySelector(".de-tooltip-msg")!.innerHTML = this.msg;
    this.el = document.body.appendChild(div);
  };

  /**
   * 定位 tooltip
   */
  private locateTooltip = () => {
    const {
      top,
      left,
      right,
      bottom
    } = this.triggerNode.getBoundingClientRect();
    const width = right - left;
    const height = bottom - top;
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
