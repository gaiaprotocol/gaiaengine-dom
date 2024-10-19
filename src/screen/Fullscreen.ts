import { BodyNode } from "@common-module/app";
import GameNode from "../core/GameNode.js";
import GameScreen from "./GameScreen.js";

export default class Fullscreen extends GameScreen {
  constructor(...gameNodes: (GameNode | undefined)[]) {
    super(
      document.documentElement.clientWidth,
      window.innerHeight,
      ...gameNodes,
    );
    this.appendTo(BodyNode);
  }
}
