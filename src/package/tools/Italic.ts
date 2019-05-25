import { Tool } from "./Tool";
import { createElement, Command } from "../utils";
import { Tooltip } from "../components/Tooltip";

export class Italic extends Tool {
  public static createItalic = (
    toolbarEl: HTMLDivElement,
    command: Command
  ): Italic => {
    const italic = new Italic(toolbarEl, command);
    italic.init();
    return italic;
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
      "<span class='main'>斜体</span><br /><span class='sub'>Ctrl+I</span>"
    );
  };

  /**
   * 重写 checkActive
   */
  public checkActive = (): void => {
    this.setActive(this.command.queryState("italic"));
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
      { type: "button", className: "italic-button" },
      [
        {
          tagName: "img",
          options: {
            src: require("../svg/italic.svg"),
            alt: "italic",
            className: "italic-img"
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
    // this.setActive(!this.selected);
    this.command.exec("italic");
  };

  private activate = (): void => {
    this.el.classList.add("active");
  };

  private deactivate = (): void => {
    this.el.classList.remove("active");
  };
}
