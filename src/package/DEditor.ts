import { Toolbar } from "./toolbar/Toolbar";
import { Editor } from "./editor/Editor";

import "./style/editor.scss";

export class DEditor {
  private container: HTMLElement;
  private el: HTMLDivElement;
  constructor(container: string | HTMLElement) {
    if (typeof container === "string") {
      if (!document.querySelector(container)) {
        throw new Error("fuck");
      }
      this.container = document.querySelector(container) as HTMLElement;
    } else {
      this.container = container;
    }

    const div = document.createElement("div");
    new Toolbar(div);
    new Editor(div);

    this.el = this.container.appendChild(div);
  }
}
