import { Tool } from "./Tool";
import { createElement, Command } from "../utils";
import { Tooltip } from "../components/Tooltip";

export class OrderedList extends Tool {
  public static createOrderedList = (
    toolbarEl: HTMLDivElement,
    command: Command
  ): OrderedList => {
    const orderedList = new OrderedList(toolbarEl, command);
    orderedList.init();
    return orderedList;
  };

  public el: HTMLButtonElement;

  private constructor(toolbarEl: HTMLDivElement, command: Command) {
    super(toolbarEl, command);
  }

  /**
   * 初始化
   */
  public init = (): void => {
    this.initDOM();
    this.bindEvents();
    Tooltip.createTooltip(this.el, "<span class='main'>有序列表</span>");
  };

  /**
   * 初始化渲染 DOM
   */
  private initDOM = (): void => {
    const button = createElement(
      "button",
      { type: "button", className: "orderedlist-button" },
      [
        {
          tagName: "img",
          options: {
            src: require("../svg/ordered.svg"),
            alt: "orderedlist",
            className: "orderedlist-img"
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
    this.command.exec("insertOrderedList");
  };
}
