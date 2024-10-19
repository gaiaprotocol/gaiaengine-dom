import DisplayNode from "./DisplayNode.js";

export default class GameObject extends DisplayNode {
  constructor(x: number, y: number) {
    super(document.createElement("div"));
    this.setPosition(x, y);
  }
}
