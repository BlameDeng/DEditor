import { createElement, Command, ToolManager } from "../utils";
import { Bold } from "../tools/Bold";
import { Editor } from "../editor/Editor";
import { timingSafeEqual } from "crypto";
import { FontColor } from "../tools/FontColor";
import { Italic } from "../tools/Italic";

export class Toolbar {
  public static createToolbar = (
    root: HTMLDivElement,
    editor: Editor,
    toolManager: ToolManager
  ): Toolbar => {
    const toolbar = new Toolbar(root, editor, toolManager);
    toolbar.init();
    return toolbar;
  };

  public el: HTMLDivElement;

  private root: HTMLDivElement;
  private editor: Editor;
  private command: Command;
  private toolManager: ToolManager;

  private constructor(
    root: HTMLDivElement,
    editor: Editor,
    toolManager: ToolManager
  ) {
    this.root = root;
    this.editor = editor;
    this.toolManager = toolManager;
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

    const bold = Bold.createBold(toolbarEl, this.command);
    const italic = Italic.createItalic(toolbarEl, this.command);
    // const fontColor = FontColor.createFontColor(toolbarEl, this.command);

    this.toolManager.register("bold", bold);
    this.toolManager.register("italic", italic);
    // this.toolManager.register("fontColor", fontColor);

    wrapper.appendChild(toolbarEl);
  };
}
