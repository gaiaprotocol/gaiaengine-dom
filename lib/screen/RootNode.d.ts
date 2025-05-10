import GameObject from "../core/GameObject.js";
import GameScreen from "./GameScreen.js";
export default class SuperRootNode extends GameObject {
    constructor();
    setScreen(screen: GameScreen | undefined): this;
    getContainer(): HTMLDivElement;
    update(deltaTime: number): void;
}
//# sourceMappingURL=RootNode.d.ts.map