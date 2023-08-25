import { LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

/**
 * A component that has a variable height based on the content inside of it.
 */
@customElement('multi-height')
export class MultiHeight extends LitElement {
    createRenderRoot() {
        return this;
    }

    calculateHeight() {
        let maxHeight = 0;

        [...this.children].forEach(elem => {
            const height = elem.clientHeight;

            if (height > maxHeight) {
                maxHeight = height;
            }
        });

        this.style.height = `${maxHeight}px`;
    }

    connectedCallback() {
        super.connectedCallback();

        requestAnimationFrame(() => {
            this.calculateHeight();
        });

        window.addEventListener("resize", () => {
            this.calculateHeight();
        });
    }
    

}

declare global {
    interface HTMLElementTagNameMap {
        'multi-height': MultiHeight;
    }
}