import TextureLoader from "../loaders/TextureLoader.js";
import BaseSprite from "./BaseSprite.js";
export default class Sprite extends BaseSprite {
    atlas;
    frame;
    imageElement;
    constructor(x, y, src, atlas, frame) {
        super(x, y);
        this.atlas = atlas;
        this.frame = frame;
        this.imageElement = document.createElement("div");
        this.imageElement.style.transform = "translate(-50%, -50%)";
        this.container.appendChild(this.imageElement);
        this.src = src;
    }
    async loadTexture(src) {
        if (this.atlas) {
            if (!this.frame)
                throw new Error("Frame not found");
            const texture = await TextureLoader.load(src);
            if (!texture || this.isRemoved())
                return;
            const frameData = this.atlas.frames[this.frame].frame;
            const textureScale = this.atlas.meta.scale === "auto"
                ? 1
                : Number(this.atlas.meta.scale);
            this.imageElement.style.backgroundImage = `url(${src})`;
            this.imageElement.style.width = `${frameData.w * textureScale}px`;
            this.imageElement.style.height = `${frameData.h * textureScale}px`;
            this.imageElement.style.backgroundSize = `${texture.width * textureScale}px ${texture.height * textureScale}px`;
            this.imageElement.style.backgroundPosition = `-${frameData.x * textureScale}px -${frameData.y * textureScale}px`;
        }
        else {
            const texture = await TextureLoader.load(src);
            if (!texture || this.isRemoved())
                return;
            this.imageElement.style.backgroundImage = `url(${src})`;
            this.imageElement.style.width = `${texture.width}px`;
            this.imageElement.style.height = `${texture.height}px`;
        }
    }
    releaseTexture(src) {
        TextureLoader.release(src);
    }
}
//# sourceMappingURL=Sprite.js.map