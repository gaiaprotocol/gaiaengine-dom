import { AppRoot } from "@commonmodule/app";
import GameScreen from "./GameScreen.js";
export default class Fullscreen extends GameScreen {
    constructor(...gameNodes) {
        super(document.documentElement.clientWidth, window.innerHeight, ...gameNodes);
        this.appendTo(AppRoot);
    }
}
//# sourceMappingURL=Fullscreen.js.map