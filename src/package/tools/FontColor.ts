import { Tool } from "./Tool";
import { Command, createElement } from "../utils";
import { Tooltip } from "../components/Tooltip";
import { DropDown } from "../components/DropDown";

interface Option {
  value: string;
  label: string;
  rgb?: string;
}

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

  private active = false;
  private tooltip: Tooltip;
  private dropDown: DropDown;
  private options: Option[] = [
    { value: "#ffffff", label: "白", rgb: "rgb(255, 255, 255)" },
    { value: "#000000", label: "漆黑", rgb: "rgb(0, 0, 0)" },
    { value: "#ff0000", label: "红", rgb: "rgb(255, 0, 0)" },
    { value: "#ff7800", label: "橙", rgb: "rgb(255, 120, 0)" },
    { value: "#ffd900", label: "黄", rgb: "rgb(255, 217, 0)" },
    { value: "#a3e043", label: "葱绿", rgb: "rgb(163, 224, 67)" },
    { value: "#37d9f0", label: "湖蓝", rgb: "rgb(55, 217, 240)" },
    { value: "#4da8ee", label: "天色", rgb: "rgb(77, 168, 238)" },
    { value: "#956fe7", label: "藤紫", rgb: "rgb(149, 111, 231)" },
    { value: "#f3f3f4", label: "白练", rgb: "rgb(243, 243, 244)" },
    { value: "#cccccc", label: "白鼠", rgb: "rgb(204, 204, 204)" },
    { value: "#fef2f0", label: "樱", rgb: "rgb(254, 242, 240)" },
    { value: "#fef5e7", label: "缟", rgb: "rgb(254, 245, 231)" },
    { value: "#fefcd9", label: "练", rgb: "rgb(254, 252, 217)" },
    { value: "#edf6e8", label: "芽", rgb: "rgb(237, 246, 232)" },
    { value: "#e6fafa", label: "水", rgb: "rgb(230, 250, 250)" },
    { value: "#ebf4fc", label: "缥", rgb: "rgb(235, 244, 252)" },
    { value: "#f0edf6", label: "丁香", rgb: "rgb(240, 237, 246)" },
    { value: "#d7d8d9", label: "灰青", rgb: "rgb(215, 216, 217)" },
    { value: "#a5a5a5", label: "鼠", rgb: "rgb(165, 165, 165)" },
    { value: "#fbd4d0", label: "虹", rgb: "rgb(251, 212, 208)" },
    { value: "#ffd7b9", label: "落柿", rgb: "rgb(255, 215, 185)" },
    { value: "#f9eda6", label: "花叶", rgb: "rgb(249, 237, 166)" },
    { value: "#d4e9d6", label: "白绿", rgb: "rgb(212, 233, 214)" },
    { value: "#c7e6ea", label: "天青", rgb: "rgb(199, 230, 234)" },
    { value: "#cce0f1", label: "天空", rgb: "rgb(204, 224, 241)" },
    { value: "#dad5e9", label: "水晶", rgb: "rgb(218, 213, 233)" },
    { value: "#7b7f83", label: "薄钝", rgb: "rgb(123, 127, 131)" },
    { value: "#494949", label: "墨", rgb: "rgb(73, 73, 73)" },
    { value: "#ee7976", label: "甚三红", rgb: "rgb(238, 121, 118)" },
    { value: "#faa573", label: "珊瑚", rgb: "rgb(250, 165, 115)" },
    { value: "#e6b322", label: "金", rgb: "rgb(230, 179, 34)" },
    { value: "#98c091", label: "薄青", rgb: "rgb(152, 192, 145)" },
    { value: "#79c6cd", label: "白群", rgb: "rgb(121, 198, 205)" },
    { value: "#6eaad7", label: "薄花", rgb: "rgb(110, 170, 215)" },
    { value: "#9c8ec1", label: "紫苑", rgb: "rgb(156, 142, 193)" },
    { value: "#41464b", label: "石墨", rgb: "rgb(65, 70, 75)" },
    { value: "#333333", label: "黑", rgb: "rgb(51, 51, 51)" },
    { value: "#be1a1d", label: "绯红", rgb: "rgb(190, 26, 29)" },
    { value: "#b95514", label: "棕黄", rgb: "rgb(185, 85, 20)" },
    { value: "#ad720e", label: "土黄", rgb: "rgb(173, 114, 14)" },
    { value: "#1c7231", label: "苍翠", rgb: "rgb(28, 114, 49)" },
    { value: "#1c7892", label: "孔雀", rgb: "rgb(28, 120, 146)" },
    { value: "#19439c", label: "琉璃", rgb: "rgb(25, 67, 156)" },
    { value: "#511b78", label: "青莲", rgb: "rgb(81, 27, 120)" }
  ];
  private content = createElement(
    "ul",
    { className: "de-fontcolor-picker" },
    this.options.map((option: Option, index: number) => {
      return {
        tagName: "li",
        options: {
          ["data-value"]: option.value,
          ["data-label"]: option.label,
          title: option.label,
          className: "de-fontcolor-picker-item",
          style: "background:" + option.value
        }
      };
    })
  );
  private msg = createElement("span", {}, [
    { tagName: "span", options: { className: "main", innerText: "文本颜色" } },
    { tagName: "br" },
    { tagName: "span", options: { className: "sub", innerText: "墨" } }
  ]);
  private colorRect: HTMLElement;
  private subSpan: HTMLSpanElement;
  private valueSpan: HTMLSpanElement;
  private currentOption: Option;

  private constructor(toolbarEl: HTMLDivElement, command: Command) {
    super(toolbarEl, command);
  }

  /**
   * 初始化
   */
  public init = (): void => {
    this.initDOM();
    this.bindEvents();
    this.tooltip = Tooltip.createTooltip(this.el, this.msg);
    this.dropDown = DropDown.createDropDown(this.el, this.content);
    this.subSpan = this.msg.querySelector(".sub") as HTMLSpanElement;
    this.checkActive();
  };

  /**
   * 重写 checkActive
   */
  public checkActive = (): void => {
    const color = this.command.queryValue("foreColor");
    const option = this.options.find(
      item => item.value === color || item.rgb === color
    );
    if (option) {
      this.setValue(option);
    }
  };

  /**
   * 初始化渲染 DOM
   */
  private initDOM = (): void => {
    const button = createElement(
      "button",
      { type: "button", className: "fontcolor-button" },
      [
        {
          tagName: "span",
          options: { className: "fontcolor-span" },
          children: [
            {
              tagName: "span",
              options: {
                className: "fontcolor-value",
                innerHTML: `<svg version="1.1" id="color" 
              xmlns="http://www.w3.org/2000/svg" 
              xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 27 25" style="enable-background:new 0 0 27 25" xml:space="preserve">
              <g>
                  <g>
                      <g transform="translate(7.000000, 7.000000)">
                          <path d="M8.445,6.492l-1.633-4.86l-1.736,4.86H8.445z M6.05,0h1.648l3.904,11h-1.597
                          L8.914,7.705H4.659L3.494,11H2L6.05,0z"></path>
                          <rect y="13" class="ql-color-label" width="14" height="3" style="fill: rgb(73, 73, 73);"></rect>
                          <rect id="colorRect" x="0.5" y="13.5" style="fill:none;stroke:#333;stroke-opacity:.15" width="13" height="2"></rect>
                      </g>
                  </g>
              </g>
          </svg>`
              }
            },
            {
              tagName: "span",
              options: { className: "fontcolor-trigger" },
              children: [
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
        }
      ]
    );
    this.el = this.toolbarEl.appendChild(button) as HTMLButtonElement;
    this.valueSpan = this.el.querySelector(
      ".fontcolor-value"
    ) as HTMLSpanElement;
    this.colorRect = this.el.querySelector("#colorRect") as HTMLElement;
  };

  /**
   * 绑定事件
   */
  private bindEvents = (): void => {
    this.el.addEventListener("click", this.handleClick);
    this.content.addEventListener("click", this.handleClickPicker);
    this.valueSpan.addEventListener("click", this.handleClickValueSpan);
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

  /**
   * 处理点击 color 图标，阻止冒泡，只有点击下拉图标才打开 picker
   * @param e
   */
  private handleClickValueSpan = (e: MouseEvent): void => {
    e.stopPropagation();
    if (this.currentOption) {
      this.command.exec("foreColor", this.currentOption.value);
    }
  };

  private handleClickDocument = (): void => {
    this.dropDown.hidden();
    this.active = false;
    document.removeEventListener("click", this.handleClickDocument);
  };

  /**
   * 处理点击 picker，根据 target 的 data- 属性来执行命令
   * @param e
   */
  private handleClickPicker = (e: MouseEvent): void => {
    if (e.target) {
      const value: string | undefined = e.target["data-value"];
      const label: string | undefined = e.target["data-label"];
      if (value && label) {
        this.command.exec("foreColor", value);
      }
    }
  };

  /**
   * 设置当前的颜色值，更新图标颜色和 tooltip 显示文字
   * @param option
   */
  private setValue = (option: Option): void => {
    this.currentOption = option;
    this.colorRect.style.fill = option.value;
    this.subSpan.innerText = option.label;
  };
}
