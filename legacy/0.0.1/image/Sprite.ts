import Node from "../base/Node.js";
import TextureLoader from "../texture/TextureLoader.js";
import SpritesheetData from "./SpritesheetData.js";

export default class Sprite extends Node {
  private _src: string | undefined;
  private width: number | undefined;
  private height: number | undefined;

  constructor(
    x: number,
    y: number,
    src: string,
    private atlas?: SpritesheetData,
    private frame?: string,
    private onLoaded?: () => void,
  ) {
    super(x, y);
    this.src = src;
  }

  private async load(src: string) {
    if (this.atlas) {
      if (!this.frame) throw new Error("Frame not found");

      const texture = await TextureLoader.load(src);
      if (!texture || this.deleted) return;

      const frame = this.atlas.frames[this.frame].frame;

      if (this.width === undefined) this.width = frame.w;
      if (this.height === undefined) this.height = frame.h;

      this.container.style.backgroundImage = `url(${src})`;
      this.container.style.width = `${this.width}px`;
      this.container.style.height = `${this.height}px`;

      const scaleX = this.width / frame.w;
      const scaleY = this.height / frame.h;
      this.container.style.backgroundSize = `${texture.width * scaleX}px ${
        texture.height * scaleY
      }px`;
      this.container.style.backgroundPosition = `-${frame.x * scaleX}px -${
        frame.y * scaleY
      }px`;
    } else {
      const texture = await TextureLoader.load(src);
      if (!texture || this.deleted) return;

      if (this.width === undefined) this.width = texture.width;
      if (this.height === undefined) this.height = texture.height;

      this.container.style.backgroundImage = `url(${src})`;
      this.container.style.width = `${this.width}px`;
      this.container.style.height = `${this.height}px`;
    }

    if (this.onLoaded) this.onLoaded();
  }

  public set src(src: string) {
    if (this._src === src) return;
    if (this._src) TextureLoader.release(this._src);
    this._src = src;
    this.load(src);
  }

  public get src() {
    return this._src ?? "";
  }

  public setSize(width: number, height: number): void {
    this.width = width;
    this.height = height;
    this.container.style.width = `${width}px`;
    this.container.style.height = `${height}px`;
  }

  public delete(): void {
    if (this._src) TextureLoader.release(this._src);
    super.delete();
  }
}
