import Node from "../base/Node.js";
import SpritesheetData from "./SpritesheetData.js";
export default class Sprite extends Node {
    private atlas?;
    private frame?;
    private onLoaded?;
    private _src;
    private width;
    private height;
    constructor(x: number, y: number, src: string, atlas?: SpritesheetData | undefined, frame?: string | undefined, onLoaded?: (() => void) | undefined);
    private load;
    set src(src: string);
    get src(): string;
    setSize(width: number, height: number): void;
    delete(): void;
}
//# sourceMappingURL=Sprite.d.ts.map