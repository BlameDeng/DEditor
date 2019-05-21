export class Toolbar {
  private el: HTMLDivElement;
  constructor(root: HTMLDivElement) {
    const div = document.createElement("div");
    div.innerHTML = "Toolbar";
    this.el = root.appendChild(div);
  }
}
