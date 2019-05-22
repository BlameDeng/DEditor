import { Tool } from "./Tool";
import { createElement, Command } from "../utils";
import { Editor } from "../editor/Editor";

export class Bold implements Tool {
  public el: HTMLButtonElement;

  private command: Command;
  private toolbarEl: HTMLDivElement;
  private selected = false;

  public static createBold = (
    toolbarEl: HTMLDivElement,
    command: Command
  ): Bold => {
    const bold = new Bold(toolbarEl, command);
    bold.init();
    return bold;
  };

  private constructor(toolbarEl: HTMLDivElement, command: Command) {
    this.toolbarEl = toolbarEl;
    this.command = command;
  }

  /**
   * 初始化
   */
  public init() {
    this.initDOM();
    this.bindEvents();
  }

  /**
   * 初始化渲染 DOM
   */
  private initDOM = () => {
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
  private bindEvents = () => {
    this.el.addEventListener("click", this.handleClick);
  };

  private handleClick = () => {
    if (this.selected) {
      this.el.classList.remove("selected");
      this.selected = false;
    } else {
      this.el.classList.add("selected");
      this.selected = true;
      this.command.exec("bold");
    }
  };
}
