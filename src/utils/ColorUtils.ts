/**
 * Returns the color of an arbitrary string.
 *
 * If the str is of type `var(--*)`, it will return the color of the variable
 * by getting the style of the element.
 *
 * @param str The string to get the color of.
 * @param element The element to get the color of.
 * @returns The color of the string as a hex string.
 */
export function getColor(str: string, element: HTMLElement): string {
    if (str.startsWith('var(--')) {
        const varName = str.substring(4, str.length - 1);
        const style = getComputedStyle(element);
        return style.getPropertyValue(varName);
    } else {
        return str;
    }
}
