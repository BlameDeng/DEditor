import { Tool } from "./Tool";
import { createElement, Command } from "../utils";
import { Tooltip } from "../components/Tooltip";

export class Bold extends Tool {
  public static createBold = (
    toolbarEl: HTMLDivElement,
    command: Command
  ): Bold => {
    const bold = new Bold(toolbarEl, command);
    bold.init();
    return bold;
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
      "<span class='main'>粗体</span><br /><span class='sub'>Ctrl+B</span>"
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
    if (e.ctrlKey && e.keyCode === 66) {
      // Ctrl+B
      this.setSelected(!this.selected);
    }
  };

  /**
   * 初始化渲染 DOM
   */
  private initDOM = (): void => {
    const button = createElement(
      "button",
      { type: "button", className: "bold-button" },
      [
        {
          tagName: "img",
          options: {
            src: require("../svg/bold.svg"),
            alt: "bold",
            className: "bold-img"
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
    this.el.addEventListener("keydown", this.handleKeyDown);
  };

  private handleClick = (): void => {
    this.setSelected(!this.selected);
    this.command.exec("bold");
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
