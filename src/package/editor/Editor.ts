import { createElement, EventHub, SelectionTool } from "../utils";

export class Editor {
  public static createEditor = (
    eventHub: EventHub,
    selectionTool: SelectionTool
  ): Editor => {
    const editor = new Editor(eventHub, selectionTool);
    editor.init();
    return editor;
  };

  public el: HTMLDivElement;
  public focused = false;

  private editorEl: HTMLDivElement;
  private eventHub: EventHub;
  private selectionTool: SelectionTool;

  private constructor(eventHub: EventHub, selectionTool: SelectionTool) {
    this.eventHub = eventHub;
    this.selectionTool = selectionTool;
  }

  /**
   * 初始化
   */
  public init = (): void => {
    this.initDOM();
    this.bindEvents();
  };

  /**
   * 在执行 command 前若 editor 未聚焦则调用
   */
  public focus = (): void => {
    this.editorEl.focus();
    this.selectionTool.restoreLastRange();
    this.focused = true;
  };

  /**
   * 添加一行到末尾，用于插入元素（列表等）后另起一行
   */
  public appendNewLine = (): void => {
    const p = createElement("p", { className: "de-line" }, [{ tagName: "br" }]);
    this.editorEl.appendChild(p);
  };

  /**
   * 初始化渲染 DOM
   */
  private initDOM = (): void => {
    const fragment = document.createDocumentFragment();
    const wrapper = createElement("div", { className: "de-editor-wrapper" });
    this.el = fragment.appendChild(wrapper) as HTMLDivElement;

    const title = createElement("div", { className: "de-title" }, [
      { tagName: "input", options: { type: "text", className: "input" } }
    ]);

    const content = createElement("div", { className: "de-content" }, [
      {
        tagName: "div",
        options: {
          className: "de-editor",
          contentEditable: "true",
          autocorrect: "off",
          autocomplete: "off",
          spellcheck: false
        },
        children: [
          {
            tagName: "p",
            options: { className: "de-line" },
            children: [{ tagName: "br" }]
          }
        ]
      }
    ]);

    wrapper.appendChild(title);
    wrapper.appendChild(content);

    this.editorEl = content.querySelector(".de-editor") as HTMLDivElement;
  };

  /**
   * 绑定事件
   */
  private bindEvents = (): void => {
    this.editorEl.addEventListener("click", this.handleClick);
    this.editorEl.addEventListener("keydown", this.handleKeyDown);
    this.editorEl.addEventListener("focus", this.handleFocus);
    this.editorEl.addEventListener("blur", this.handleBlur);
  };

  /**
   * 监听点击，点击后触发 "editor-click" 事件（toolbar 订阅）
   */
  private handleClick = (): void => {
    this.eventHub.emit("editor-click");
  };

  /**
   * 监听键盘事件，防止删除第一行，并触发 "editor-keydown" 事件（toolbar 订阅）
   * @todo 兼容
   */
  private handleKeyDown = (e: KeyboardEvent): void => {
    if (e.keyCode === 8) {
      // 删除键
      if (
        this.editorEl.childNodes.length === 1 &&
        this.editorEl.textContent!.length === 0
      ) {
        e.preventDefault();
      }
    }
    this.eventHub.emit("editor-keydown", e);
  };

  /**
   * 监听聚焦
   */
  private handleFocus = (): void => {
    this.focused = true;
  };

  /**
   * 监听失焦，失焦时保存当前光标位置
   */
  private handleBlur = (): void => {
    this.selectionTool.saveLastRange();
    this.focused = false;
  };
}
