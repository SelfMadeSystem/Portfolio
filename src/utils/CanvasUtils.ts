/**
 * Takes an HTMLCanvasElement and returns an OffscreenCanvas object if the
 * browser supports it, otherwise returns the HTMLCanvasElement.
 * 
 * @param canvas The HTMLCanvasElement to convert to an OffscreenCanvas.
 */
export function getCanvas(canvas: HTMLCanvasElement): HTMLCanvasElement | OffscreenCanvas {
    return canvas.transferControlToOffscreen ? canvas.transferControlToOffscreen() : canvas;
}

/**
 * Creates either an HTMLCanvasElement or an OffscreenCanvas depending on
 * browser support.
 * 
 * @param width The width of the canvas.
 * @param height The height of the canvas.
 */
export function createCanvas(width: number = 0, height: number = 0): HTMLCanvasElement | OffscreenCanvas {
    if (typeof OffscreenCanvas !== 'undefined') {
        return new OffscreenCanvas(width, height);
    }
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    return canvas;
}
