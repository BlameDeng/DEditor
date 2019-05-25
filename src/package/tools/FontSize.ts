import { Tool } from "./Tool";
import { Command, createElement } from "../utils";
import { Tooltip } from "../components/Tooltip";
import { DropDown } from "../components/DropDown";

export class FontSize extends Tool {
  public static createFontSize = (
    toolbarEl: HTMLDivElement,
    command: Command
  ): FontSize => {
    const fontSize = new FontSize(toolbarEl, command);
    fontSize.init();
    return fontSize;
  };

  public el: HTMLButtonElement;

  private active = false;
  private tooltip: Tooltip;
  private dropDown: DropDown;
  private valueSpan: HTMLSpanElement;
  private sizeArray = ["1", "2", "3", "4", "5", "6", "7"];
  private fontSizeArray = ["10", "13", "16", "18", "24", "32", "48"];
  private content = createElement(
    "ul",
    { className: "de-fontsize-picker" },
    this.sizeArray.map((size: string, index: number) => {
      return {
        tagName: "li",
        options: {
          ["data-size"]: size,
          className:
            "de-fontsize-picker-item font-" + this.fontSizeArray[index],
          innerText: "Aa"
        }
      };
    })
  );

  private constructor(toolbarEl: HTMLDivElement, command: Command) {
    super(toolbarEl, command);
  }

  /**
   * 初始化
   */
  public init = (): void => {
    this.initDOM();
    this.bindEvents();
    this.tooltip = Tooltip.createTooltip(
      this.el,
      "<span class='main'>字号</span><br /><span class='sub'>Ctrl+Shift+⬆/⬇</span>"
    );
    this.dropDown = DropDown.createDropDown(this.el, this.content);
    this.checkActive();
  };

  public checkActive = (): void => {
    const size = this.command.queryValue("fontSize");
    if (size) {
      this.setValue(size);
    }
  };

  /**
   * 初始化渲染 DOM
   */
  private initDOM = (): void => {
    const button = createElement(
      "button",
      { type: "button", className: "fontsize-button" },
      [
        {
          tagName: "span",
          options: {
            className: "fontsize"
          },
          children: [
            {
              tagName: "span",
              options: { className: "fontsize-value", innerText: "13" }
            },
            {
              tagName: "img",
              options: {
                src: require("../svg/triangle.svg"),
                alt: "triangle",
                className: "triangle-img"
              }
            }
          ]
        }
      ]
    );
    this.el = this.toolbarEl.appendChild(button) as HTMLButtonElement;
    this.valueSpan = this.el.querySelector(
      ".fontsize-value"
    ) as HTMLSpanElement;
  };

  /**
   * 绑定事件
   */
  private bindEvents = (): void => {
    this.el.addEventListener("click", this.handleClick);
    this.content.addEventListener("click", this.handleClickPicker);
  };

  private handleClick = (): void => {
    if (this.tooltip) {
      this.tooltip.hidden();
    }
    if (!this.active) {
      requestAnimationFrame(() => {
        document.addEventListener("click", this.handleClickDocument);
        this.active = true;
      });
    }
  };

  private handleClickDocument = (): void => {
    this.dropDown.hidden();
    this.active = false;
    document.removeEventListener("click", this.handleClickDocument);
  };

  private handleClickPicker = (e: MouseEvent): void => {
    if (e.target) {
      const size: string = e.target["data-size"];
      this.command.exec("fontSize", size);
      this.setValue(size);
    }
  };

  private setValue = (size: string): void => {
    this.valueSpan.innerText = this.fontSizeArray[this.sizeArray.indexOf(size)];
    Array.from(this.content.children).forEach(li => {
      li.classList.remove("active");
      if (li["data-size"] === size) {
        li.classList.add("active");
      }
    });
  };
}
