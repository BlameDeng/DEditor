export interface FontOptions {
  font?: string;
  color?: string;
  size?: number;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
}

export interface CustomerConfiguration extends FontOptions {}

export { FontColor } from "./FontColor";

export { EditorState } from "./EditorState";

export { StatePayload } from "./StatePayload";
