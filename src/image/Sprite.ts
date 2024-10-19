import TextureLoader from "../loaders/TextureLoader.js";
import BaseSprite from "./BaseSprite.js";
import SpritesheetData from "./SpritesheetData.js";

export default class Sprite extends BaseSprite {
  constructor(
    x: number,
    y: number,
    src: string,
    private atlas?: SpritesheetData,
    private frame?: string,
  ) {
    super(x, y);
    this.src = src;
  }

  protected async loadTexture(src: string) {
    if (this.atlas) {
      if (!this.frame) throw new Error("Frame not found");

      const texture = await TextureLoader.load(src);
      if (!texture || this.removed) return;

      const frameData = this.atlas.frames[this.frame].frame;

      this.container.style.backgroundImage = `url(${src})`;
      this.container.style.width = `${frameData.w}px`;
      this.container.style.height = `${frameData.h}px`;

      const textureScale = this.atlas.meta.scale === "auto"
        ? 1
        : Number(this.atlas.meta.scale);

      this.container.style.backgroundSize = `${
        texture.width * textureScale
      }px ${texture.height * textureScale}px`;
      this.container.style.backgroundPosition = `-${
        frameData.x * textureScale
      }px -${frameData.y * textureScale}px`;
    } else {
      const texture = await TextureLoader.load(src);
      if (!texture || this.removed) return;

      this.container.style.backgroundImage = `url(${src})`;
      this.container.style.width = `${texture.width}px`;
      this.container.style.height = `${texture.height}px`;
    }
  }

  protected releaseTexture(src: string): void {
    TextureLoader.release(src);
  }
}
