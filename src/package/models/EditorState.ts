import { FontColor } from ".";

export class EditorState {
  public font: string = "微软雅黑";
  public color: FontColor = FontColor.ink;
  public size: number = 11;
  public bold: boolean = false;
  public italic: boolean = false;
  public underline: boolean = false;
  public strikethrough: boolean = false;
}
