import { DomNode } from "@commonmodule/app";
import Camera from "./Camera.js";
import RootNode from "./RootNode.js";
export default class GameScreen extends DomNode {
    width;
    height;
    animationInterval;
    targetFPS;
    actualFPS;
    root = new RootNode();
    camera = new Camera(this);
    ratio = 1;
    constructor(width, height, ...gameNodes) {
        super(".game-screen");
        this.width = width;
        this.height = height;
        this.style({ overflow: "hidden" });
        this.root.setScreen(this).append(...gameNodes);
        this.createRenderer();
        this.onWindow("blur", () => this.actualFPS = 6);
        this.onWindow("focus", () => this.actualFPS = this.targetFPS);
    }
    resize(width, height, ratio = 1) {
        this.width = width;
        this.height = height;
        this.ratio = ratio;
        this.style({
            width: `${this.width}px`,
            height: `${this.height}px`,
            transform: `translate(${(this.width * this.ratio - this.width) / 2}px, ${(this.height * this.ratio - this.height) / 2}px) scale(${this.ratio})`,
        });
    }
    async createRenderer() {
        this.root.setPosition(this.width / 2 - this.camera.x * this.camera.scale, this.height / 2 - this.camera.y * this.camera.scale);
        this.resize(this.width, this.height, this.ratio);
        this.htmlElement.appendChild(this.root.getContainer());
        this.animationInterval = requestAnimationFrame(this.animate);
        this.updateRootNodePosition();
    }
    updateRootNodePosition() {
        this.root.scale = this.camera.scale;
        this.root.setPosition(this.width / 2 - this.camera.x * this.camera.scale, this.height / 2 - this.camera.y * this.camera.scale);
    }
    update(deltaTime) {
        this.root.update(deltaTime);
    }
    lastFrameTime = 0;
    accumulatedTime = 0;
    animate = (currentTime) => {
        const elapsedTime = (currentTime - this.lastFrameTime) / 1000;
        if (elapsedTime > 0) {
            if (this.actualFPS !== undefined && this.actualFPS > 0) {
                this.accumulatedTime += elapsedTime;
                const frameDuration = 1 / this.actualFPS;
                if (this.accumulatedTime >= frameDuration) {
                    this.update(frameDuration);
                    this.accumulatedTime -= frameDuration;
                }
            }
            else {
                this.update(elapsedTime);
            }
            this.lastFrameTime = currentTime;
        }
        this.animationInterval = requestAnimationFrame(this.animate);
    };
    remove() {
        if (this.animationInterval) {
            cancelAnimationFrame(this.animationInterval);
            this.animationInterval = undefined;
        }
        super.remove();
    }
}
//# sourceMappingURL=GameScreen.js.map