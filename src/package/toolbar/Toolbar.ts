import { createElement, Command, ToolManager, EventHub } from "../utils";
import { Bold } from "../tools/Bold";
import { Italic } from "../tools/Italic";
import { Underline } from "../tools/Underline";
import { StrikeThrough } from "../tools/Strikethrough";

export class Toolbar {
  public static createToolbar = (
    toolManager: ToolManager,
    eventHub: EventHub,
    command: Command
  ): Toolbar => {
    const toolbar = new Toolbar(toolManager, eventHub, command);
    toolbar.init();
    return toolbar;
  };

  public el: HTMLDivElement;

  private command: Command;
  private toolManager: ToolManager;
  private eventHub: EventHub;

  private constructor(
    toolManager: ToolManager,
    eventHub: EventHub,
    command: Command
  ) {
    this.toolManager = toolManager;
    this.eventHub = eventHub;
    this.eventHub.subscribe(
      "editor-keydown",
      this.handleKeyDownEventFromEditor
    );
    this.eventHub.subscribe("editor-click", this.handleClickEventFromEditor);
    this.command = command;
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
    const underline = Underline.createUnderline(toolbarEl, this.command);
    const strikeThrough = StrikeThrough.createStrikeThrough(
      toolbarEl,
      this.command
    );
    // const fontColor = FontColor.createFontColor(toolbarEl, this.command);

    this.toolManager.register("bold", bold);
    this.toolManager.register("italic", italic);
    this.toolManager.register("underline", underline);
    this.toolManager.register("strikeThrough", strikeThrough);
    // this.toolManager.register("fontColor", fontColor);

    wrapper.appendChild(toolbarEl);
  };

  /**
   * 处理 editor 传递的键盘事件，组合键按下时检查 tool 显示状态
   * @todo 兼容
   */
  private handleKeyDownEventFromEditor = (e: KeyboardEvent): void => {
    if (e.ctrlKey && e.shiftKey && e.keyCode === 83) {
      // Ctrl+Shift+S 需要自己执行 command
      this.command.exec("strikeThrough");
    }

    if (this.shouldCheckActive(e)) {
      // 延迟，等待快捷键生效
      setTimeout(() => {
        this.toolManager.forEach(tool => tool && tool.checkActive());
      });
    }
  };

  /**
   * 根据键盘事件检查是否为快捷键按下、需要检查 tool 显示状态
   */
  private shouldCheckActive = (e: KeyboardEvent): boolean => {
    if (
      e.ctrlKey &&
      (e.keyCode === 66 || e.keyCode === 73 || e.keyCode === 85)
    ) {
      // Ctrl+B Ctrl+I Ctrl+U
      return true;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode === 83) {
      // Ctrl+Shift+S
      return true;
    }
    return false;
  };

  /**
   * 处理 editor 传递的点击事件，点击时检查 tool 显示状态
   */
  private handleClickEventFromEditor = (): void => {
    this.toolManager.forEach(tool => tool && tool.checkActive());
  };
}
