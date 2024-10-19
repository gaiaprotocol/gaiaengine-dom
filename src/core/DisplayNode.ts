import GameNode from "./GameNode.js";
import TransformableNode from "./TransformableNode.js";

export default class DisplayNode<CT extends HTMLElement = HTMLElement>
  extends TransformableNode {
  constructor(protected container: CT) {
    super(
      container.offsetLeft || 0,
      container.offsetTop || 0,
    );
    this.updateTransform();
  }

  private updateTransform(): void {
    const { x, y, scaleX, scaleY } = this.transform;
    this.container.style.transform =
      `translate(${x}px, ${y}px) scale(${scaleX}, ${scaleY})`;
  }

  public set x(x: number) {
    this.transform.x = x;
    this.updateTransform();
  }

  public get x(): number {
    return this.transform.x;
  }

  public set y(y: number) {
    this.transform.y = y;
    this.updateTransform();
  }

  public get y(): number {
    return this.transform.y;
  }

  public setPosition(x: number, y: number): this {
    this.transform.x = x;
    this.transform.y = y;
    this.updateTransform();
    return this;
  }

  public set zIndex(zIndex: number) {
    this.container.style.zIndex = `${zIndex}`;
  }

  public get zIndex(): number {
    return parseInt(this.container.style.zIndex || "0", 10);
  }

  public set scaleX(scaleX: number) {
    this.transform.scaleX = scaleX;
    this.updateTransform();
  }

  public get scaleX(): number {
    return this.transform.scaleX;
  }

  public set scaleY(scaleY: number) {
    this.transform.scaleY = scaleY;
    this.updateTransform();
  }

  public get scaleY(): number {
    return this.transform.scaleY;
  }

  public set scale(scale: number) {
    this.transform.scaleX = scale;
    this.transform.scaleY = scale;
    this.updateTransform();
  }

  public get scale(): number {
    return this.transform.scaleX;
  }

  public appendTo(parent: GameNode, index?: number): this {
    if (parent instanceof DisplayNode) {
      if (index !== undefined) {
        parent.container.insertBefore(
          this.container,
          parent.container.children[index] || null,
        );
      } else {
        parent.container.appendChild(this.container);
      }
    }
    return super.appendTo(parent, index);
  }

  public remove(): void {
    this.container.parentNode?.removeChild(this.container);
    super.remove();
  }

  public hide(): void {
    this.container.style.display = "none";
  }

  public show(): void {
    this.container.style.display = "";
  }
}
