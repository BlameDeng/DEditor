import { Tool } from "../tools/Tool";
import { Bold } from "../tools/Bold";
import { Italic } from "../tools/Italic";

/**
 * 管理 tool 的类，用于 editor 聚焦时根据光标位置的 node 判断每个 tool 的显示状态等
 */
export class ToolManager {
  private tools: Map<string, Tool> = new Map();

  /**
   * 注册工具
   * @param toolId
   * @param tool
   * @return 成功返回 true，若 tool 已存在返回 false
   */
  public register = (toolId: string, tool: Tool): boolean => {
    if (this.tools.has(toolId)) {
      return false;
    }
    this.tools.set(toolId, tool);
    return true;
  };

  /**
   * 遍历 tool 的接口
   */
  public forEach = (
    cb: (tool?: Tool, toolId?: string, tools?: Map<string, Tool>) => void
  ): void => {
    this.tools.forEach(cb);
  };

  /**
   * editor 被点击时根据光标位置处理各个 tool 的状态
   */
  public handleEditorClick = (): void => {
    this.handleBold();
    this.handleItalic();
  };

  /**
   * 根据 focusNode 的 fontWeight 来设定 bold 的状态
   * @todo 其他方式？
   */
  private handleBold = (): void => {
    const selection = window.getSelection();
    const bold = <Bold>this.tools.get("bold")!;
    if (!selection || !bold) {
      return;
    }
    if (selection.focusNode && selection.focusNode.parentElement) {
      const el = selection.focusNode.parentElement;
      if (window.getComputedStyle(el).fontWeight === "700") {
        bold.setSelected(true);
      } else {
        bold.setSelected(false);
      }
    }
  };

  /**
   * 根据 focusNode 的 fontStyle 来设定 italic 的状态
   * @todo 其他方式？
   */
  private handleItalic = (): void => {
    const selection = window.getSelection();
    const italic = <Italic>this.tools.get("italic")!;
    if (!selection || !italic) {
      return;
    }
    if (selection.focusNode && selection.focusNode.parentElement) {
      const el = selection.focusNode.parentElement;
      if (window.getComputedStyle(el).fontStyle === "italic") {
        italic.setSelected(true);
      } else {
        italic.setSelected(false);
      }
    }
  };
}
