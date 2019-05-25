import { Tool } from "./Tool";
import { Command, createElement } from "../utils";
import { Tooltip } from "../components/Tooltip";

export class Undo extends Tool {
  public static createUndo = (
    toolbarEl: HTMLDivElement,
    command: Command
  ): Undo => {
    const undo = new Undo(toolbarEl, command);
    undo.init();
    return undo;
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
      "<span class='main'>撤销</span><br /><span class='sub'>Ctrl+Z</span>"
    );
  };

  /**
   * 初始化渲染 DOM
   */
  private initDOM = (): void => {
    const button = createElement(
      "button",
      { type: "button", className: "undo-button" },
      [
        {
          tagName: "img",
          options: {
            src: require("../svg/undo.svg"),
            alt: "undo",
            className: "undo-img"
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
    this.command.exec("undo");
  };
}
