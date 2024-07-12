import Node from "../base/Node.js";
import TextureLoader from "../texture/TextureLoader.js";
export default class Sprite extends Node {
    atlas;
    frame;
    onLoaded;
    _src;
    constructor(x, y, src, atlas, frame, onLoaded) {
        super(x, y);
        this.atlas = atlas;
        this.frame = frame;
        this.onLoaded = onLoaded;
        this.src = src;
    }
    async load(src) {
        if (this.atlas) {
            if (!this.frame)
                throw new Error("Frame not found");
            const texture = await TextureLoader.load(src);
            if (!texture || this.deleted)
                return;
            const frame = this.atlas.frames[this.frame].frame;
            this.container.style.backgroundImage = `url(${src})`;
            this.container.style.width = `${frame.w}px`;
            this.container.style.height = `${frame.h}px`;
            this.container.style.backgroundPosition = `-${frame.x}px -${frame.y}px`;
        }
        else {
            const texture = await TextureLoader.load(src);
            if (!texture || this.deleted)
                return;
            this.container.style.backgroundImage = `url(${src})`;
            this.container.style.width = `${texture.width}px`;
            this.container.style.height = `${texture.height}px`;
        }
        if (this.onLoaded)
            this.onLoaded();
    }
    set src(src) {
        if (this._src === src)
            return;
        if (this._src)
            TextureLoader.release(this._src);
        this._src = src;
        this.load(src);
    }
    get src() {
        return this._src ?? "";
    }
    delete() {
        if (this._src)
            TextureLoader.release(this._src);
        super.delete();
    }
}
//# sourceMappingURL=Sprite.js.map