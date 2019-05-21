export class Editor {
  private el: HTMLDivElement;
  private firstLine: HTMLParagraphElement;
  constructor(root: HTMLDivElement) {
    const div = document.createElement("div");
    div.className = "de-editor";
    div.contentEditable = "true";

    const p = document.createElement("p");
    p.className = "de-line";
    p.innerHTML = `<span>span</span><span>span</span><span>span</span>`;

    this.firstLine = div.appendChild(p);

    this.el = root.appendChild(div);
    this.el.addEventListener("keydown", this.handleKeyDown);
  }

  /**
   * 监听删除键，防止删除第一行
   * TODO: 兼容 Mac 按键
   */
  private handleKeyDown = (e: KeyboardEvent) => {
    if (e.keyCode === 8) {
      if (
        this.el.childNodes.length === 1 &&
        this.el.textContent!.length === 0
      ) {
        e.preventDefault();
      }
    }
  };
}
