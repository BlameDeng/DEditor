import { Tool } from "./Tool";
import { Command, createElement } from "../utils";
import { Tooltip } from "../components/Tooltip";

export class RemoveFormat extends Tool {
  public static createRemoveFormat = (
    toolbarEl: HTMLDivElement,
    command: Command
  ): RemoveFormat => {
    const removeFormat = new RemoveFormat(toolbarEl, command);
    removeFormat.init();
    return removeFormat;
  };

  public el: HTMLButtonElement;

  private active = false;

  private constructor(toolbarEl: HTMLDivElement, command: Command) {
    super(toolbarEl, command);
  }

  /**
   * 初始化
   */
  public init = (): void => {
    this.initDOM();
    this.bindEvents();
    Tooltip.createTooltip(this.el, "<span class='main'>清除格式</span>");
  };

  /**
   * 初始化渲染 DOM
   */
  private initDOM = (): void => {
    const button = createElement(
      "button",
      { type: "button", className: "removeformat-button" },
      [
        {
          tagName: "img",
          options: {
            src: require("../svg/removeformat.svg"),
            alt: "removeformat",
            className: "removeformat-img"
          }
        }
      ]
    );
    this.el = this.toolbarEl.appendChild(button) as HTMLButtonElement;
  };

  /**
   * 绑定事件
   */
  private bindEvents = (): void => {
    this.el.addEventListener("click", this.handleClick);
  };

  private handleClick = (): void => {
    this.command.exec("removeFormat");
  };
}
