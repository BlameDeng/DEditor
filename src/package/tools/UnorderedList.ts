import { Tool } from "./Tool";
import { createElement, Command } from "../utils";
import { Tooltip } from "../components/Tooltip";

export class UnorderedList extends Tool {
  public static createUnorderedList = (
    toolbarEl: HTMLDivElement,
    command: Command
  ): UnorderedList => {
    const unorderedList = new UnorderedList(toolbarEl, command);
    unorderedList.init();
    return unorderedList;
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
    Tooltip.createTooltip(this.el, "<span class='main'>无序列表</span>");
  };

  /**
   * 初始化渲染 DOM
   */
  private initDOM = (): void => {
    const button = createElement(
      "button",
      { type: "button", className: "unorderedlist-button" },
      [
        {
          tagName: "img",
          options: {
            src: require("../svg/unordered.svg"),
            alt: "unorderedlist",
            className: "unorderedlist-img"
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
    this.command.exec("insertUnorderedList");
  };
}
