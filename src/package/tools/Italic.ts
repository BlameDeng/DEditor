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

  private selected = false;

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
   * 设置 selected，只设置 selected，不执行 command 命令
   * @param selected
   */
  public setSelected = (selected: boolean): void => {
    if (selected) {
      this.activate();
    } else {
      this.deactivate();
    }
  };

  /**
   * 重写 handleKeyDown
   * @param e
   */
  public handleKeyDown = (e: KeyboardEvent): void => {
    if (e.ctrlKey && e.keyCode === 73) {
      // Ctrl+I
      this.setSelected(!this.selected);
    }
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
    this.setSelected(!this.selected);
    this.command.exec("italic");
  };

  private activate = () => {
    this.el.classList.add("selected");
    this.selected = true;
  };

  private deactivate = () => {
    this.el.classList.remove("selected");
    this.selected = false;
  };
}
