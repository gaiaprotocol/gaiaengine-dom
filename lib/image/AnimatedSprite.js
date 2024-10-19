import TextureLoader from "../loaders/TextureLoader.js";
import BaseSprite from "./BaseSprite.js";
export default class AnimatedSprite extends BaseSprite {
    atlas;
    animation;
    fps;
    frames;
    frameDuration;
    textureScale = 1;
    elapsedTime = 0;
    currentFrameIndex = 0;
    constructor(x, y, src, atlas, animation, fps) {
        super(x, y);
        this.atlas = atlas;
        this.animation = animation;
        this.fps = fps;
        this.src = src;
        const frames = this.atlas.animations?.[this.animation];
        if (!frames || frames.length === 0) {
            throw new Error(`Animation '${this.animation}' not found or has no frames`);
        }
        this.frames = frames;
        this.frameDuration = 1 / this.fps;
    }
    async loadTexture(src) {
        const texture = await TextureLoader.load(src);
        if (!texture || this.removed)
            return;
        const frameName = this.frames[this.currentFrameIndex];
        const frameData = this.atlas.frames[frameName].frame;
        this.container.style.backgroundImage = `url(${src})`;
        this.container.style.width = `${frameData.w}px`;
        this.container.style.height = `${frameData.h}px`;
        this.textureScale = this.atlas.meta.scale === "auto"
            ? 1
            : Number(this.atlas.meta.scale);
        this.container.style.backgroundSize = `${texture.width * this.textureScale}px ${texture.height * this.textureScale}px`;
        this.container.style.backgroundPosition = `-${frameData.x * this.textureScale}px -${frameData.y * this.textureScale}px`;
    }
    releaseTexture(src) {
        TextureLoader.release(src);
    }
    update(deltaTime) {
        super.update(deltaTime);
        this.elapsedTime += deltaTime;
        if (this.elapsedTime >= this.frameDuration) {
            this.elapsedTime -= this.frameDuration;
            this.currentFrameIndex = (this.currentFrameIndex + 1) %
                this.frames.length;
            const frameName = this.frames[this.currentFrameIndex];
            const frameData = this.atlas.frames[frameName].frame;
            this.container.style.backgroundPosition = `-${frameData.x * this.textureScale}px -${frameData.y * this.textureScale}px`;
            this.container.style.width = `${frameData.w}px`;
            this.container.style.height = `${frameData.h}px`;
        }
    }
}
//# sourceMappingURL=AnimatedSprite.js.map