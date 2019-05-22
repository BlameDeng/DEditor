import { createElement } from "../utils";
import { EditorState, StatePayload, CustomerConfiguration } from "../models";

export class Editor {
  public el: HTMLDivElement;
  public focused = false;

  private editorEl: HTMLDivElement;
  private root: HTMLDivElement;
  private customerConfig: CustomerConfiguration;
  private state: EditorState;
  private lastRange: Range | null = null;

  public static createEditor = (
    root: HTMLDivElement,
    customerConfig: CustomerConfiguration
  ): Editor => {
    const editor = new Editor(root, customerConfig);
    editor.init();
    return editor;
  };

  private constructor(
    root: HTMLDivElement,
    customerConfig: CustomerConfiguration
  ) {
    this.root = root;
    this.customerConfig = customerConfig;
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
    this.addLastRange();
    this.focused = true;
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
    this.editorEl.addEventListener("keydown", this.handleKeyDown);
    this.editorEl.addEventListener("focus", this.handleFocus);
    this.editorEl.addEventListener("blur", this.handleBlur);
  };

  /**
   * 监听删除键，防止删除第一行
   * TODO: 兼容
   */
  private handleKeyDown = (e: KeyboardEvent): void => {
    if (e.keyCode === 8) {
      if (
        this.editorEl.childNodes.length === 1 &&
        this.editorEl.textContent!.length === 0
      ) {
        e.preventDefault();
      }
    }
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
    this.saveLastRange();
    this.focused = false;
  };

  /**
   * 保存当前光标位置
   */
  private saveLastRange = (): void => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount) {
      this.lastRange = selection.getRangeAt(0);
    }
  };

  /**
   * 恢复光标位置，恢复后清除保存的光标位置
   */
  private addLastRange = (): void => {
    const selection = window.getSelection();
    if (this.lastRange && selection) {
      selection.removeAllRanges();
      selection.addRange(this.lastRange);
      this.lastRange = null;
    }
  };
}
