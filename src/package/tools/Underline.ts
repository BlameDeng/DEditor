import { Tool } from "./Tool";
import { createElement, Command } from "../utils";
import { Tooltip } from "../components/Tooltip";

export class Underline extends Tool {
  public static createUnderline = (
    toolbarEl: HTMLDivElement,
    command: Command
  ): Underline => {
    const underline = new Underline(toolbarEl, command);
    underline.init();
    return underline;
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
      "<span class='main'>下划线</span><br /><span class='sub'>Ctrl+U</span>"
    );
  };

  /**
   * 重写 checkActive
   */
  public checkActive = (): void => {
    this.setActive(this.command.queryState("underline"));
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
      { type: "button", className: "underline-button" },
      [
        {
          tagName: "img",
          options: {
            src: require("../svg/underline.svg"),
            alt: "underline",
            className: "underline-img"
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
    this.command.exec("underline");
  };

  private activate = () => {
    this.el.classList.add("active");
  };

  private deactivate = () => {
    this.el.classList.remove("active");
  };
}
