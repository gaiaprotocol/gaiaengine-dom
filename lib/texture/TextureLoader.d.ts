declare class TextureLoader {
    private textures;
    private textureUsedCount;
    private loadPromises;
    private checkTextureUsing;
    private loadTexture;
    load(src: string): Promise<HTMLImageElement | undefined>;
    release(src: string): void;
}
declare const _default: TextureLoader;
export default _default;
//# sourceMappingURL=TextureLoader.d.ts.map