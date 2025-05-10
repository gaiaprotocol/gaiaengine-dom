import { AppRoot, Dom } from "@commonmodule/app";
import GameNode from "../core/GameNode.js";
import GameObject from "../core/GameObject.js";
import Camera from "./Camera.js";
import SuperRootNode from "./RootNode.js";

export default class GameScreen extends Dom {
  private animationInterval: number | undefined;

  private targetFPS: number | undefined;
  private actualFPS: number | undefined;

  private superRoot = new SuperRootNode();

  public camera = new Camera(this);
  public root = new GameObject(0, 0);

  public ratio = 1;

  constructor(
    public width: number,
    public height: number,
    ...gameNodes: (GameNode | undefined)[]
  ) {
    super(".game-screen");
    this.style({ overflow: "hidden" });

    this.superRoot.setScreen(this).append(...gameNodes);
    this.root.appendTo(this.superRoot);
    this.createRenderer();

    AppRoot.bind(this, "blur", () => this.actualFPS = 6);
    AppRoot.bind(this, "focus", () => this.actualFPS = this.targetFPS);
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
    this.superRoot.setPosition(
      this.width / 2 - this.camera.getX() * this.camera.scale,
      this.height / 2 - this.camera.getY() * this.camera.scale,
    );

    this.resize(this.width, this.height, this.ratio);
    this.htmlElement.appendChild(this.superRoot.getContainer());
    this.animationInterval = requestAnimationFrame(this.animate);

    this.updateRootNodePosition();
  }

  public updateRootNodePosition() {
    this.root.scale = this.camera.scale;
    this.root.setPosition(
      this.width / 2 - this.camera.getX() * this.camera.scale,
      this.height / 2 - this.camera.getY() * this.camera.scale,
    );
  }

  private update(deltaTime: number) {
    this.superRoot.update(deltaTime);
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
