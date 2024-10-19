import BaseSprite from "./BaseSprite.js";
import SpritesheetData from "./SpritesheetData.js";
export default class AnimatedSprite extends BaseSprite {
    private atlas;
    private animation;
    private fps;
    private imageElement;
    private frames;
    private frameDuration;
    private textureScale;
    private elapsedTime;
    private currentFrameIndex;
    constructor(x: number, y: number, src: string, atlas: SpritesheetData, animation: string, fps: number);
    protected loadTexture(src: string): Promise<void>;
    protected releaseTexture(src: string): void;
    protected update(deltaTime: number): void;
}
//# sourceMappingURL=AnimatedSprite.d.ts.map