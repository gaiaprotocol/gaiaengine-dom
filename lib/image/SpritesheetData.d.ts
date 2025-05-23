export default interface SpritesheetData {
    frames: {
        [frame: string]: {
            frame: {
                x: number;
                y: number;
                w: number;
                h: number;
            };
        };
    };
    meta: {
        scale: number | string;
    };
    animations?: {
        [key: string]: string[];
    };
}
//# sourceMappingURL=SpritesheetData.d.ts.map