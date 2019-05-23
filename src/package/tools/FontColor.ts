import { Tool } from "./Tool";
import { Command, createElement } from "../utils";
import { Tooltip } from "../components/Tooltip";

export class FontColor extends Tool {
  public static createFontColor = (
    toolbarEl: HTMLDivElement,
    command: Command
  ): FontColor => {
    const fontColor = new FontColor(toolbarEl, command);
    fontColor.init();
    return fontColor;
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
    Tooltip.createTooltip(
      this.el,
      "<span class='main'>文本颜色</span><br /><span class='sub'>Ctrl+B</span>"
    );
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
  };

  private handleClick = (): void => {
    // if (this.selected) {
    //   this.el.classList.remove("selected");
    //   this.selected = false;
    // } else {
    //   this.el.classList.add("selected");
    //   this.selected = true;
    // }
    this.command.exec("foreColor", "red");
  };
}
