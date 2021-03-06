import { Toolbar } from "./toolbar/Toolbar";
import { Editor } from "./editor/Editor";

import "./style/editor.scss";
import "./style/toolbar.scss";
import "./style/tooltip.scss";
import "./style/dropDown.scss";

import { CustomerConfiguration } from "./models";
import {
  createElement,
  ToolManager,
  EventHub,
  Command,
  SelectionTool
} from "./utils";

export class DEditor {
  private container: HTMLElement;
  private root: HTMLDivElement;
  private customerConfig: CustomerConfiguration;

  constructor(
    container: string | HTMLElement,
    customerConfig: CustomerConfiguration = {}
  ) {
    if (typeof container === "string") {
      if (!document.querySelector(container)) {
        throw new Error("fuck");
      }
      this.container = document.querySelector(container) as HTMLElement;
    } else {
      this.container = container;
    }
    if (customerConfig) {
      this.customerConfig = customerConfig;
    }

    const div = createElement("div", {
      className: "de-editor-container"
    }) as HTMLDivElement;

    // 实例化事件中心
    const eventHub = new EventHub();

    // 实例化 selection 工具
    const selectionTool = new SelectionTool();

    // 实例化工具管理类
    const toolManager = new ToolManager();

    // 实例化编辑器
    const editor = Editor.createEditor(eventHub, selectionTool);

    // 实例化命令类
    const command = new Command(selectionTool, toolManager, editor);

    // 实例化工具条
    const toolbar = Toolbar.createToolbar(
      eventHub,
      selectionTool,
      toolManager,
      command
    );

    div.appendChild(toolbar.el);
    div.appendChild(editor.el);

    this.root = this.container.appendChild(div);
  }
}
