import { CSSResultGroup, LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Adds ripples every time a cursor pointer clicks.
 */
@customElement('pointer-ripple')
export class PointerRipple extends LitElement {
    createRenderRoot() {
        return this;
    }

    connectedCallback() {
        super.connectedCallback();
        window.addEventListener("pointerdown", this.doRipple); // TODO: DO NOT CONNECT IF THE USER SAYS THEY DON'T LIKE FLASHING LIGHTS
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener("pointerdown", this.doRipple);
    }

    doRipple = (e: PointerEvent) => {
        console.log(e.pointerType);
        if (e.pointerType == "mouse") {

            const ripples: HTMLDivElement[] = [];
            const create = () => {
                const ripple = document.createElement('div');

                ripple.classList.add("pointer-ripple");

                ripple.style.setProperty("left", `${e.pageX}px`);
                ripple.style.setProperty("top", `${e.pageY}px`);

                requestAnimationFrame(() => {
                    ripple.classList.add("pointer-ripple-in");
                });

                this.appendChild(ripple);

                ripples.push(ripple);
            };

            create();

            const amnt = 6;
            const interval = 150;

            for (let i = 1; i < amnt; i++) {
                setTimeout(create, interval * i);
            }



            setTimeout(() => {
                ripples.forEach(r => r.remove());
            }, 1000 + interval * (amnt - 1));
        }
    };
}

declare global {
    interface HTMLElementTagNameMap {
        'pointer-ripple': PointerRipple;
    }
}