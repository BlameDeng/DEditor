import { Editor } from "../editor/Editor";
import { ToolManager } from ".";

export class Command {
  private editor: Editor;
  private toolManager: ToolManager;

  constructor(editor: Editor, toolManager: ToolManager) {
    // document.execCommand("styleWithCSS", false, "true");
    this.editor = editor;
    this.toolManager = toolManager;
  }

  /**
   * 封装 document.execCommand()，执行前检查 editor 聚焦状态，若未聚焦则调用其 focus()
   */
  public exec = (commandId: string, value?: string): void => {
    if (!this.editor.focused) {
      this.editor.focus();
    }
    document.execCommand(commandId, false, value);

    // 执行命令后，各个 tool 检查显示状态
    this.toolManager.forEach(tool => tool && tool.checkActive());
  };

  /**
   * 封装 document.queryCommandState()
   */
  public queryState = (commandId: string): boolean => {
    return document.queryCommandState(commandId);
  };
}
