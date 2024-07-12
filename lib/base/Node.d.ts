import { TreeNode } from "@common-module/app";
import Entity from "./Entity.js";
export default class Node extends Entity {
    parent: Node | undefined;
    children: Node[];
    container: HTMLElement;
    constructor(x: number, y: number, ...children: TreeNode[]);
}
//# sourceMappingURL=Node.d.ts.map