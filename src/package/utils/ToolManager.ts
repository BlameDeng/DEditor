import { Tool } from "../tools/Tool";

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
}
