import Node from "../base/Node.js";
import TextureLoader from "../texture/TextureLoader.js";
import SpritesheetData from "./SpritesheetData.js";

export default class Sprite extends Node {
  private _src: string | undefined;

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
      this.container.style.backgroundImage = `url(${src})`;
      this.container.style.width = `${frame.w}px`;
      this.container.style.height = `${frame.h}px`;
      this.container.style.backgroundPosition = `-${frame.x}px -${frame.y}px`;
    } else {
      const texture = await TextureLoader.load(src);
      if (!texture || this.deleted) return;

      this.container.style.backgroundImage = `url(${src})`;
      this.container.style.width = `${texture.width}px`;
      this.container.style.height = `${texture.height}px`;
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

  public delete(): void {
    if (this._src) TextureLoader.release(this._src);
    super.delete();
  }
}
