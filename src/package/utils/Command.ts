import { Editor } from "../editor/Editor";

export class Command {
  private editor: Editor;

  public static createCommand = (editor: Editor): Command => {
    const command = new Command(editor);
    return command;
  };

  private constructor(editor: Editor) {
    this.editor = editor;
  }

  /**
   * 封装 document.execCommand()，执行前检查 editor 聚焦状态，若未聚焦则调用其 focus()
   */
  public exec = (commandId: string, value?: string): void => {
    if (!this.editor.focused) {
      this.editor.focus();
    }
    document.execCommand(commandId, false, value);
  };
}
