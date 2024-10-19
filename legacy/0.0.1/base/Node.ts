import { TreeNode } from "@common-module/app";
import Entity from "./Entity.js";

export default class Node extends Entity {
  declare parent: Node | undefined;
  declare children: Node[];

  public container: HTMLElement;

  constructor(x: number, y: number, ...children: TreeNode[]) {
    super();
    this.container = document.createElement("div");
    this.append(...children);
  }
}
