import ResourceLoader from "./ResourceLoader.js";
declare class TextureLoader extends ResourceLoader<HTMLImageElement> {
    protected loadFromPath(src: string): Promise<HTMLImageElement | undefined>;
    protected cleanup(texture: HTMLImageElement): void;
}
declare const _default: TextureLoader;
export default _default;
//# sourceMappingURL=TextureLoader.d.ts.map