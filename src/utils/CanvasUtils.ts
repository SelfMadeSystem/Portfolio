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
 * Creates an HTMLCanvasElement and returns it. If the browser supports
 * OffscreenCanvas, it will return an OffscreenCanvas as well.
 * 
 * @param width The width of the canvas.
 * @param height The height of the canvas.
 * @returns A tuple with the first element being the HTMLCanvasElement and the second being the OffscreenCanvas (or the HTMLCanvasElement if the browser doesn't support OffscreenCanvas)
 */
export function createCanvas(width: number = 0, height: number = 0): [HTMLCanvasElement, HTMLCanvasElement | OffscreenCanvas] {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    return [canvas, getCanvas(canvas)];
}
