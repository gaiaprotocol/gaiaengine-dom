import GameNode from "./GameNode.js";
import TransformableNode from "./TransformableNode.js";
export default class DisplayNode<CT extends HTMLElement = HTMLElement> extends TransformableNode {
    protected container: CT;
    constructor(container: CT);
    private updateTransform;
    set x(x: number);
    get x(): number;
    set y(y: number);
    get y(): number;
    setPosition(x: number, y: number): this;
    set drawingOrder(drawingOrder: number);
    get drawingOrder(): number;
    set scaleX(scaleX: number);
    get scaleX(): number;
    set scaleY(scaleY: number);
    get scaleY(): number;
    set scale(scale: number);
    get scale(): number;
    appendTo(parent: GameNode, index?: number): this;
    remove(): void;
    hide(): void;
    show(): void;
}
//# sourceMappingURL=DisplayNode.d.ts.map