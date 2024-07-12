class TextureLoader {
  private textures: Map<string, HTMLImageElement> = new Map();
  private textureUsedCount: Map<string, number> = new Map();
  private loadPromises: Map<string, Promise<HTMLImageElement | undefined>> =
    new Map();

  private checkTextureUsing(src: string): boolean {
    return this.textureUsedCount.has(src) &&
      this.textureUsedCount.get(src)! > 0;
  }

  private async loadTexture(
    src: string,
  ): Promise<HTMLImageElement | undefined> {
    const image = new Image();
    image.src = src;
    image.crossOrigin = "anonymous";
    const loadPromise = new Promise<HTMLImageElement | undefined>(
      (resolve, reject) => {
        image.onload = () => {
          if (this.checkTextureUsing(src)) {
            if (this.textures.has(src)) {
              reject(new Error("Texture already exists"));
            } else {
              this.textures.set(src, image);
              resolve(image);
            }
          } else {
            resolve(undefined);
          }
          this.loadPromises.delete(src);
        };
        image.onerror = (event) => {
          console.error(`Failed to load texture: ${src}`);
          reject(event);
          this.loadPromises.delete(src);
        };
      },
    );
    this.loadPromises.set(src, loadPromise);
    return await loadPromise;
  }

  public async load(src: string): Promise<HTMLImageElement | undefined> {
    this.textureUsedCount.set(src, (this.textureUsedCount.get(src) || 0) + 1);
    if (this.textures.has(src)) return this.textures.get(src)!;
    if (this.loadPromises.has(src)) return await this.loadPromises.get(src)!;
    return await this.loadTexture(src);
  }

  public release(src: string): void {
    const count = this.textureUsedCount.get(src);
    if (count === undefined) throw new Error("Texture not found");

    if (count === 1) {
      this.textureUsedCount.delete(src);
      const texture = this.textures.get(src);
      if (texture) {
        texture.remove();
        this.textures.delete(src);
      }
    } else {
      this.textureUsedCount.set(src, count - 1);
    }
  }
}

export default new TextureLoader();
