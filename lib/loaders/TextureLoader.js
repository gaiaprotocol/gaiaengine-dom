import ResourceLoader from "./ResourceLoader.js";
class TextureLoader extends ResourceLoader {
    async loadFromPath(src) {
        const loadPromise = new Promise((resolve, reject) => {
            const image = new Image();
            image.src = src;
            image.crossOrigin = "anonymous";
            image.onload = () => {
                if (this.isResourceInUse(src)) {
                    if (this.resources.has(src)) {
                        reject(new Error(`Texture already exists: ${src}`));
                    }
                    else {
                        this.resources.set(src, image);
                        resolve(image);
                    }
                }
                else {
                    resolve(undefined);
                }
                this.pendingLoads.delete(src);
            };
            image.onerror = (event) => {
                console.error(`Failed to load texture: ${src}`);
                reject(event);
                this.pendingLoads.delete(src);
            };
        });
        this.pendingLoads.set(src, loadPromise);
        return await loadPromise;
    }
    cleanup(texture) {
        texture.remove();
    }
}
export default new TextureLoader();
//# sourceMappingURL=TextureLoader.js.map