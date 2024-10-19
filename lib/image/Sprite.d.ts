import BaseSprite from "./BaseSprite.js";
import SpritesheetData from "./SpritesheetData.js";
export default class Sprite extends BaseSprite {
    private atlas?;
    private frame?;
    private imageElement;
    constructor(x: number, y: number, src: string, atlas?: SpritesheetData | undefined, frame?: string | undefined);
    protected loadTexture(src: string): Promise<void>;
    protected releaseTexture(src: string): void;
}
//# sourceMappingURL=Sprite.d.ts.map