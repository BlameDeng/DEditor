import { Tool } from "./Tool";
import { createElement, Command } from "../utils";
import { Tooltip } from "../components/Tooltip";

export class StrikeThrough extends Tool {
  public static createStrikeThrough = (
    toolbarEl: HTMLDivElement,
    command: Command
  ): StrikeThrough => {
    const strikeThrough = new StrikeThrough(toolbarEl, command);
    strikeThrough.init();
    return strikeThrough;
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
    Tooltip.createTooltip(
      this.el,
      "<span class='main'>中划线</span><br /><span class='sub'>Ctrl+Shift+S</span>"
    );
  };

  /**
   * 重写 checkActive
   */
  public checkActive = (): void => {
    this.setActive(this.command.queryState("strikeThrough"));
  };

  /**
   * 设置 active，只设置 active，不执行 command 命令
   * @param active
   */
  public setActive = (active: boolean): void => {
    if (active) {
      this.activate();
    } else {
      this.deactivate();
    }
    this.active = active;
  };

  /**
   * 初始化渲染 DOM
   */
  private initDOM = (): void => {
    const button = createElement(
      "button",
      { type: "button", className: "strikethrough-button" },
      [
        {
          tagName: "img",
          options: {
            src: require("../svg/strikethrough.svg"),
            alt: "strikethrough",
            className: "strikethrough-img"
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
    // this.setSelected(!this.selected);
    this.command.exec("strikeThrough");
  };

  private activate = (): void => {
    this.el.classList.add("active");
    this.active = true;
  };

  private deactivate = (): void => {
    this.el.classList.remove("active");
    this.active = false;
  };
}
