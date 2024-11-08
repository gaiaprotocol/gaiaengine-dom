import { DomNode } from "@common-module/app";
import GameNode from "../core/GameNode.js";
import Camera from "./Camera.js";
import RootNode from "./RootNode.js";

export default class GameScreen extends DomNode {
  private animationInterval: number | undefined;

  private targetFPS: number | undefined;
  private actualFPS: number | undefined;

  public root = new RootNode();
  public camera = new Camera(this);

  public ratio = 1;

  constructor(
    public width: number,
    public height: number,
    ...gameNodes: (GameNode | undefined)[]
  ) {
    super(".game-screen");
    this.style({ overflow: "hidden" });

    this.root.setScreen(this).append(...gameNodes);
    this.createRenderer();

    this.onWindow("blur", () => this.actualFPS = 6);
    this.onWindow("focus", () => this.actualFPS = this.targetFPS);
  }

  public resize(width: number, height: number, ratio = 1) {
    this.width = width;
    this.height = height;
    this.ratio = ratio;

    this.style({
      width: `${this.width}px`,
      height: `${this.height}px`,
      transform: `translate(${(this.width * this.ratio - this.width) / 2}px, ${
        (this.height * this.ratio - this.height) / 2
      }px) scale(${this.ratio})`,
    });
  }

  private async createRenderer() {
    this.root.setPosition(
      this.width / 2 - this.camera.x * this.camera.scale,
      this.height / 2 - this.camera.y * this.camera.scale,
    );

    this.resize(this.width, this.height, this.ratio);
    this.htmlElement.appendChild(this.root.getContainer());
    this.animationInterval = requestAnimationFrame(this.animate);

    this.updateRootNodePosition();
  }

  public updateRootNodePosition() {
    this.root.scale = this.camera.scale;
    this.root.setPosition(
      this.width / 2 - this.camera.x * this.camera.scale,
      this.height / 2 - this.camera.y * this.camera.scale,
    );
  }

  private update(deltaTime: number) {
    this.root.update(deltaTime);
  }

  private lastFrameTime = 0;
  private accumulatedTime = 0;

  private animate = (currentTime: number) => {
    const elapsedTime = (currentTime - this.lastFrameTime) / 1000;

    if (elapsedTime > 0) {
      if (this.actualFPS !== undefined && this.actualFPS > 0) {
        this.accumulatedTime += elapsedTime;

        const frameDuration = 1 / this.actualFPS;
        if (this.accumulatedTime >= frameDuration) {
          this.update(frameDuration);
          this.accumulatedTime -= frameDuration;
        }
      } else {
        this.update(elapsedTime);
      }
      this.lastFrameTime = currentTime;
    }

    this.animationInterval = requestAnimationFrame(this.animate);
  };

  public remove(): void {
    if (this.animationInterval) {
      cancelAnimationFrame(this.animationInterval);
      this.animationInterval = undefined;
    }

    super.remove();
  }
}
