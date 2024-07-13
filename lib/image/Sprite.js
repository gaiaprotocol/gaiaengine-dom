import Node from "../base/Node.js";
import TextureLoader from "../texture/TextureLoader.js";
export default class Sprite extends Node {
    atlas;
    frame;
    onLoaded;
    _src;
    width;
    height;
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
            if (this.width === undefined)
                this.width = frame.w;
            if (this.height === undefined)
                this.height = frame.h;
            this.container.style.backgroundImage = `url(${src})`;
            this.container.style.width = `${this.width}px`;
            this.container.style.height = `${this.height}px`;
            const scaleX = this.width / frame.w;
            const scaleY = this.height / frame.h;
            this.container.style.backgroundSize = `${texture.width * scaleX}px ${texture.height * scaleY}px`;
            this.container.style.backgroundPosition = `-${frame.x * scaleX}px -${frame.y * scaleY}px`;
        }
        else {
            const texture = await TextureLoader.load(src);
            if (!texture || this.deleted)
                return;
            if (this.width === undefined)
                this.width = texture.width;
            if (this.height === undefined)
                this.height = texture.height;
            this.container.style.backgroundImage = `url(${src})`;
            this.container.style.width = `${this.width}px`;
            this.container.style.height = `${this.height}px`;
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
    setSize(width, height) {
        this.width = width;
        this.height = height;
        this.container.style.width = `${width}px`;
        this.container.style.height = `${height}px`;
    }
    delete() {
        if (this._src)
            TextureLoader.release(this._src);
        super.delete();
    }
}
//# sourceMappingURL=Sprite.js.map