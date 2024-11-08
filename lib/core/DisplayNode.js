import TransformableNode from "./TransformableNode.js";
export default class DisplayNode extends TransformableNode {
    container;
    constructor(container) {
        super(container.offsetLeft || 0, container.offsetTop || 0);
        this.container = container;
        this.updateTransform();
    }
    updateTransform() {
        const { x, y, scaleX, scaleY } = this.transform;
        this.container.style.position = "absolute";
        this.container.style.transform =
            `translate(${x}px, ${y}px) scale(${scaleX}, ${scaleY})`;
    }
    set x(x) {
        this.transform.x = x;
        this.updateTransform();
    }
    get x() {
        return this.transform.x;
    }
    set y(y) {
        this.transform.y = y;
        this.updateTransform();
    }
    get y() {
        return this.transform.y;
    }
    setPosition(x, y) {
        this.transform.x = x;
        this.transform.y = y;
        this.updateTransform();
        return this;
    }
    set zIndex(zIndex) {
        this.container.style.zIndex = `${zIndex}`;
    }
    get zIndex() {
        return parseInt(this.container.style.zIndex || "0", 10);
    }
    set scaleX(scaleX) {
        this.transform.scaleX = scaleX;
        this.updateTransform();
    }
    get scaleX() {
        return this.transform.scaleX;
    }
    set scaleY(scaleY) {
        this.transform.scaleY = scaleY;
        this.updateTransform();
    }
    get scaleY() {
        return this.transform.scaleY;
    }
    set scale(scale) {
        this.transform.scaleX = scale;
        this.transform.scaleY = scale;
        this.updateTransform();
    }
    get scale() {
        return this.transform.scaleX;
    }
    appendTo(parent, index) {
        if (parent instanceof DisplayNode) {
            if (index !== undefined) {
                parent.container.insertBefore(this.container, parent.container.children[index] || null);
            }
            else {
                parent.container.appendChild(this.container);
            }
        }
        return super.appendTo(parent, index);
    }
    remove() {
        this.container.parentNode?.removeChild(this.container);
        super.remove();
    }
    hide() {
        this.container.style.display = "none";
    }
    show() {
        this.container.style.display = "";
    }
}
//# sourceMappingURL=DisplayNode.js.map