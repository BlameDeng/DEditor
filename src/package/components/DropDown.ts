import { createElement } from "../utils";

export class DropDown {
  public static createDropDown = (
    triggerNode: HTMLElement,
    content: string | HTMLElement
  ): DropDown => {
    const dropDown = new DropDown(triggerNode, content);
    dropDown.init();
    return dropDown;
  };

  private triggerNode: HTMLElement;
  private content: string | HTMLElement;
  private el: HTMLDivElement;

  private constructor(triggerNode: HTMLElement, content: string | HTMLElement) {
    this.triggerNode = triggerNode;
    this.content = content;
  }

  public init = (): void => {
    this.bindEvents();
  };

  /**
   * 暴露出关闭 dropDown 的方法
   */
  public hidden = () => {
    if (this.el) {
      this.el.classList.remove("active");
    }
  };

  private bindEvents = (): void => {
    this.triggerNode.addEventListener("click", this.handleTriggerClick);
  };

  /**
   * 渲染 dropDown
   */
  private renderDropDown = (): void => {
    const div = <HTMLDivElement>(
      createElement("div", { className: "de-dropdown-wrapper active" }, [
        {
          tagName: "div",
          options: { className: "de-dropdown-content" },
          children: [
            { tagName: "div", options: { className: "de-dropdown-arrow" } },
            { tagName: "div", options: { className: "de-dropdown-container" } }
          ]
        }
      ])
    );

    const container = div.querySelector(".de-dropdown-container")!;
    if (typeof this.content === "string") {
      container.innerHTML = this.content;
    } else {
      container.appendChild(this.content);
    }

    this.el = document.body.appendChild(div);
  };

  /**
   * 定位 dropDown
   */
  private locateDropDown = () => {
    const { left, right, bottom } = this.triggerNode.getBoundingClientRect();
    const width = right - left;
    const { scrollX, scrollY } = window;
    this.el.style.left = left + scrollX + width / 2 + "px";
    this.el.style.top = bottom + scrollY + "px";
  };

  private handleTriggerClick = (): void => {
    if (!this.el) {
      this.renderDropDown();
      this.locateDropDown();
    } else {
      this.el.classList.add("active");
    }
  };
}
