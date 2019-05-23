import { Command } from "../utils";

export class Tool {
  public command: Command;
  public toolbarEl: HTMLDivElement;

  constructor(toolbarEl: HTMLDivElement, command: Command) {
    this.toolbarEl = toolbarEl;
    this.command = command;
  }

  public handleKeyDown = (e: KeyboardEvent): void => {};
}
