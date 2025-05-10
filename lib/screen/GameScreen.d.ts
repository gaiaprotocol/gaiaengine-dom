import { Dom } from "@commonmodule/app";
import GameNode from "../core/GameNode.js";
import GameObject from "../core/GameObject.js";
import Camera from "./Camera.js";
export default class GameScreen extends Dom {
    width: number;
    height: number;
    private animationInterval;
    private targetFPS;
    private actualFPS;
    private superRoot;
    camera: Camera;
    root: GameObject<{}>;
    ratio: number;
    constructor(width: number, height: number, ...gameNodes: (GameNode | undefined)[]);
    resize(width: number, height: number, ratio?: number): void;
    private createRenderer;
    updateRootNodePosition(): void;
    private update;
    private lastFrameTime;
    private accumulatedTime;
    private animate;
    remove(): void;
}
//# sourceMappingURL=GameScreen.d.ts.map