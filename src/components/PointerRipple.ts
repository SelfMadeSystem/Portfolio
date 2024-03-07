import { LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

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
        // only flashing lights when reduced motion is off
        if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
            window.addEventListener('pointerdown', this.doRipple);
        }
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener('pointerdown', this.doRipple);
    }

    doRipple = (e: PointerEvent) => {
        if (e.pointerType === 'mouse') {
            const ripples: HTMLDivElement[] = [];

            const create = () => {
                const ripple = document.createElement('div');

                ripple.classList.add('pointer-ripple');

                ripple.style.setProperty('left', `${e.pageX}px`);
                ripple.style.setProperty('top', `${e.pageY}px`);

                requestAnimationFrame(() => {
                    ripple.classList.add('pointer-ripple-in');
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

            setTimeout(
                () => {
                    ripples.forEach(r => r.remove());
                },
                1000 + interval * (amnt - 1),
            );
        }
    };
}

declare global {
    interface HTMLElementTagNameMap {
        'pointer-ripple': PointerRipple;
    }
}
