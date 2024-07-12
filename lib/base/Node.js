import Entity from "./Entity.js";
export default class Node extends Entity {
    container;
    constructor(x, y, ...children) {
        super();
        this.container = document.createElement("div");
        this.append(...children);
    }
}
//# sourceMappingURL=Node.js.map