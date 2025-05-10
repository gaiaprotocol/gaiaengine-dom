import TextureLoader from "../loaders/TextureLoader.js";
import BaseSprite from "./BaseSprite.js";
import SpritesheetData from "./SpritesheetData.js";

export default class AnimatedSprite extends BaseSprite {
  private imageElement: HTMLDivElement;
  private frames: string[];
  private frameDuration: number;
  private textureScale: number = 1;
  private elapsedTime: number = 0;
  private currentFrameIndex: number = 0;

  constructor(
    x: number,
    y: number,
    src: string,
    private atlas: SpritesheetData,
    private animation: string,
    private fps: number,
  ) {
    super(x, y);

    this.imageElement = document.createElement("div");
    this.imageElement.style.transform = "translate(-50%, -50%)";
    this.container.appendChild(this.imageElement);

    const frames = this.atlas.animations?.[this.animation];
    if (!frames || frames.length === 0) {
      throw new Error(
        `Animation '${this.animation}' not found or has no frames`,
      );
    }
    this.frames = frames;
    this.frameDuration = 1 / this.fps;

    this.src = src;
  }

  protected async loadTexture(src: string) {
    const texture = await TextureLoader.load(src);
    if (!texture || this.isRemoved()) return;

    const frameName = this.frames[this.currentFrameIndex];
    const frameData = this.atlas.frames[frameName].frame;

    this.textureScale = this.atlas.meta.scale === "auto"
      ? 1
      : Number(this.atlas.meta.scale);

    this.imageElement.style.backgroundImage = `url(${src})`;
    this.imageElement.style.width = `${frameData.w * this.textureScale}px`;
    this.imageElement.style.height = `${frameData.h * this.textureScale}px`;
    this.imageElement.style.backgroundSize = `${
      texture.width * this.textureScale
    }px ${texture.height * this.textureScale}px`;
    this.imageElement.style.backgroundPosition = `-${
      frameData.x * this.textureScale
    }px -${frameData.y * this.textureScale}px`;
  }

  protected releaseTexture(src: string): void {
    TextureLoader.release(src);
  }

  protected update(deltaTime: number): void {
    super.update(deltaTime);

    this.elapsedTime += deltaTime;

    if (this.elapsedTime >= this.frameDuration) {
      this.elapsedTime %= this.frameDuration;
      this.currentFrameIndex = (this.currentFrameIndex + 1) %
        this.frames.length;

      const frameName = this.frames[this.currentFrameIndex];
      const frameData = this.atlas.frames[frameName].frame;

      this.imageElement.style.width = `${frameData.w * this.textureScale}px`;
      this.imageElement.style.height = `${frameData.h * this.textureScale}px`;
      this.imageElement.style.backgroundPosition = `-${
        frameData.x * this.textureScale
      }px -${frameData.y * this.textureScale}px`;
    }
  }
}
