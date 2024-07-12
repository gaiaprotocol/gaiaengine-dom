import { TreeNode } from "@common-module/app";

export default abstract class Entity extends TreeNode {
  declare parent: Entity | undefined;
  declare children: Entity[];
}
