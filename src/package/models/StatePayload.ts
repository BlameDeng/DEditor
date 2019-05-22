import { FontColor } from ".";

export interface StatePayload {
  font?: string;
  color?: FontColor;
  size?: number;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
}
