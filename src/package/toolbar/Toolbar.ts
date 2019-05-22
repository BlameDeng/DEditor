import { createElement, Command } from "../utils";
import { Bold } from "../tools/Bold";
import { Editor } from "../editor/Editor";

export class Toolbar {
  public el: HTMLDivElement;
  private root: HTMLDivElement;
  private editor: Editor;
  private command: Command;

  public static createToolbar = (
    root: HTMLDivElement,
    editor: Editor
  ): Toolbar => {
    const toolbar = new Toolbar(root, editor);
    toolbar.init();
    return toolbar;
  };

  private constructor(root: HTMLDivElement, editor: Editor) {
    this.root = root;
    this.editor = editor;
    this.command = Command.createCommand(this.editor);
  }

  /**
   * 初始化
   */
  public init = (): void => {
    this.initDOM();
  };

  /**
   * 初始化渲染 DOM
   */
  private initDOM = (): void => {
    const fragment = document.createDocumentFragment();
    const wrapper = createElement("div", { className: "de-toolbar-wrapper" });
    this.el = fragment.appendChild(wrapper) as HTMLDivElement;

    const toolbarEl = createElement("div", {
      className: "de-toolbar"
    }) as HTMLDivElement;

    Bold.createBold(toolbarEl, this.command);

    wrapper.appendChild(toolbarEl);
  };
}
