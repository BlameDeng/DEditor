import {
  createElement,
  Command,
  ToolManager,
  EventHub,
  SelectionTool
} from "../utils";
import { Bold } from "../tools/Bold";
import { Italic } from "../tools/Italic";
import { Underline } from "../tools/Underline";
import { StrikeThrough } from "../tools/StrikeThrough";
import { Undo } from "../tools/Undo";
import { Redo } from "../tools/Redo";
import { RemoveFormat } from "../tools/RemoveFormat";
import { FontSize } from "../tools/FontSize";
import { FontColor } from "../tools/FontColor";
import { BackColor } from "../tools/BackColor";
import { OrderedList } from "../tools/OrderedList";
import { UnorderedList } from "../tools/UnorderedList";

export class Toolbar {
  public static createToolbar = (
    eventHub: EventHub,
    selectionTool: SelectionTool,
    toolManager: ToolManager,
    command: Command
  ): Toolbar => {
    const toolbar = new Toolbar(eventHub, selectionTool, toolManager, command);
    toolbar.init();
    return toolbar;
  };

  public el: HTMLDivElement;

  private eventHub: EventHub;
  private selectionTool: SelectionTool;
  private toolManager: ToolManager;
  private command: Command;

  private constructor(
    eventHub: EventHub,
    selectionTool: SelectionTool,
    toolManager: ToolManager,
    command: Command
  ) {
    this.eventHub = eventHub;
    this.selectionTool = selectionTool;
    this.toolManager = toolManager;
    this.command = command;

    this.eventHub.subscribe(
      "editor-keydown",
      this.handleKeyDownEventFromEditor
    );
    this.eventHub.subscribe("editor-click", this.handleClickEventFromEditor);
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

    const toolbarEl = <HTMLDivElement>createElement("div", {
      className: "de-toolbar"
    });

    const undo = Undo.createUndo(toolbarEl, this.command);
    const redo = Redo.createRedo(toolbarEl, this.command);
    const removeFormat = RemoveFormat.createRemoveFormat(
      toolbarEl,
      this.command
    );
    const fontSize = FontSize.createFontSize(toolbarEl, this.command);
    const bold = Bold.createBold(toolbarEl, this.command);
    const italic = Italic.createItalic(toolbarEl, this.command);
    const underline = Underline.createUnderline(toolbarEl, this.command);
    const strikeThrough = StrikeThrough.createStrikeThrough(
      toolbarEl,
      this.command
    );
    const fontColor = FontColor.createFontColor(toolbarEl, this.command);
    const backColor = BackColor.createBackColor(toolbarEl, this.command);
    const orderedList = OrderedList.createOrderedList(toolbarEl, this.command);
    const unorderedList = UnorderedList.createUnorderedList(
      toolbarEl,
      this.command
    );

    this.toolManager.register("undo", undo);
    this.toolManager.register("redo", redo);
    this.toolManager.register("removeFormat", removeFormat);
    this.toolManager.register("fontSize", fontSize);
    this.toolManager.register("bold", bold);
    this.toolManager.register("italic", italic);
    this.toolManager.register("underline", underline);
    this.toolManager.register("strikeThrough", strikeThrough);
    this.toolManager.register("fontColor", fontColor);
    this.toolManager.register("backColor", backColor);
    this.toolManager.register("orderedList", orderedList);
    this.toolManager.register("unorderList", unorderedList);

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
      requestAnimationFrame(() => {
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
    if (e.ctrlKey && (e.keyCode === 90 || e.keyCode === 89)) {
      // Ctrl+Z Ctrl+Y "undo" "redo"
      requestAnimationFrame(() => {
        this.selectionTool.setRangeToEnd();
      });
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
