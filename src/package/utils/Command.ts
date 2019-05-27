import { Editor } from "../editor/Editor";
import { ToolManager, SelectionTool } from ".";

export class Command {
  private selectionTool: SelectionTool;
  private toolManager: ToolManager;
  private editor: Editor;

  constructor(
    selectionTool: SelectionTool,
    toolManager: ToolManager,
    editor: Editor
  ) {
    document.execCommand("styleWithCSS", false, "true");
    this.selectionTool = selectionTool;
    this.toolManager = toolManager;
    this.editor = editor;
  }

  /**
   * 封装 document.execCommand()，执行前检查 editor 聚焦状态，若未聚焦则调用其 focus()
   */
  public exec = (commandId: string, value?: string): void => {
    if (!this.editor.focused) {
      this.editor.focus();
    }

    const done = document.execCommand(commandId, false, value);
    if (done) {
      // 执行 "undo"、"redo" 命令后光标位置定位到末尾
      if (commandId === "undo" || commandId === "redo") {
        this.selectionTool.setRangeToEnd();
      }

      if (
        commandId === "insertOrderedList" ||
        commandId === "insertUnorderedList"
      ) {
        this.editor.appendNewLine();
      }

      // 执行命令后，各个 tool 检查显示状态
      this.toolManager.forEach(tool => tool && tool.checkActive());
    }
  };

  /**
   * 封装 document.queryCommandState()
   */
  public queryState = (commandId: string): boolean => {
    return document.queryCommandState(commandId);
  };

  /**
   * 封装 document.queryCommandValue()
   */
  public queryValue = (commandId: string): string => {
    return document.queryCommandValue(commandId);
  };
}
