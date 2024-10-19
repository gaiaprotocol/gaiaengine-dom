import TextureLoader from "../loaders/TextureLoader.js";
import BaseSprite from "./BaseSprite.js";
import SpritesheetData from "./SpritesheetData.js";

export default class Sprite extends BaseSprite {
  private imageElement: HTMLDivElement;

  constructor(
    x: number,
    y: number,
    src: string,
    private atlas?: SpritesheetData,
    private frame?: string,
  ) {
    super(x, y);

    this.imageElement = document.createElement("div");
    this.imageElement.style.transform = "translate(-50%, -50%)";
    this.container.appendChild(this.imageElement);

    this.src = src;
  }

  protected async loadTexture(src: string) {
    if (this.atlas) {
      if (!this.frame) throw new Error("Frame not found");

      const texture = await TextureLoader.load(src);
      if (!texture || this.removed) return;

      const frameData = this.atlas.frames[this.frame].frame;

      this.imageElement.style.backgroundImage = `url(${src})`;
      this.imageElement.style.width = `${frameData.w}px`;
      this.imageElement.style.height = `${frameData.h}px`;

      const textureScale = this.atlas.meta.scale === "auto"
        ? 1
        : Number(this.atlas.meta.scale);

      this.imageElement.style.backgroundSize = `${
        texture.width * textureScale
      }px ${texture.height * textureScale}px`;
      this.imageElement.style.backgroundPosition = `-${
        frameData.x * textureScale
      }px -${frameData.y * textureScale}px`;
    } else {
      const texture = await TextureLoader.load(src);
      if (!texture || this.removed) return;

      this.imageElement.style.backgroundImage = `url(${src})`;
      this.imageElement.style.width = `${texture.width}px`;
      this.imageElement.style.height = `${texture.height}px`;
    }
  }

  protected releaseTexture(src: string): void {
    TextureLoader.release(src);
  }
}
