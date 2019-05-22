import { Toolbar } from "./toolbar/Toolbar";
import { Editor } from "./editor/Editor";

import "./style/editor.scss";
import "./style/toolbar.scss";

import { CustomerConfiguration } from "./models";
import { createElement } from "./utils";

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

    const editor = Editor.createEditor(div, customerConfig);

    const toolbar = Toolbar.createToolbar(div,editor);

    div.appendChild(toolbar.el);
    div.appendChild(editor.el);

    this.root = this.container.appendChild(div);
  }
}
