import { Command } from "../utils";

export abstract class Tool {
  protected toolbarEl: HTMLDivElement;
  protected command: Command;

  constructor(toolbarEl: HTMLDivElement, command: Command) {
    this.toolbarEl = toolbarEl;
    this.command = command;
  }

  /**
   * 检查自身显示状态
   * 子类根据自身需要重写这个方法
   */
  public checkActive = (): void => {};
}
