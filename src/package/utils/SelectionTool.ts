export class SelectionTool {
  private lastRange: Range | null = null;

  /**
   * 保存当前光标位置
   */
  public saveLastRange = (): void => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount) {
      this.lastRange = selection.getRangeAt(0);
    }
  };

  /**
   * 恢复光标位置，恢复后清除保存的光标位置
   */
  public restoreLastRange = (): void => {
    const selection = window.getSelection();
    if (this.lastRange && selection) {
      selection.removeAllRanges();
      selection.addRange(this.lastRange);
      this.lastRange = null;
    }
  };

  /**
   * 将光标定位到选区末
   */
  public setRangeToEnd = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount) {
      const range = window.getSelection()!.getRangeAt(0);
      range.setStart(range.endContainer, range.endOffset);
    }
  };
}
