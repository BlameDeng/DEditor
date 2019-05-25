import { Tool } from "./Tool";
import { Command, createElement } from "../utils";
import { Tooltip } from "../components/Tooltip";

export class Redo extends Tool {
  public static createRedo = (
    toolbarEl: HTMLDivElement,
    command: Command
  ): Redo => {
    const redo = new Redo(toolbarEl, command);
    redo.init();
    return redo;
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
      "<span class='main'>重做</span><br /><span class='sub'>Ctrl+Y</span>"
    );
  };

  /**
   * 初始化渲染 DOM
   */
  private initDOM = (): void => {
    const button = createElement(
      "button",
      { type: "button", className: "redo-button" },
      [
        {
          tagName: "img",
          options: {
            src: require("../svg/redo.svg"),
            alt: "redo",
            className: "redo-img"
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
    this.command.exec("redo");
  };
}
