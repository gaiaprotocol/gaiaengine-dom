import DisplayNode from "./DisplayNode.js";
export default class GameObject extends DisplayNode {
    constructor(x, y) {
        super(document.createElement("div"));
        this.setPosition(x, y);
    }
}
//# sourceMappingURL=GameObject.js.map