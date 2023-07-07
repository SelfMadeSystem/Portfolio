import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * A button with a ripple effect.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('ripple-button')
export class RippleButton extends LitElement {
    /**
     * Color scheme of the button.
     */
    @property({ type: String })
    colorScheme: 'primary' | 'secondary' = 'primary';

    /**
     * Style of the button.
     */
    @property({ type: String })
    buttonStyle: 'solid' | 'outline' = 'solid';

    /**
     * If to have hover ripples.
     */
    @property({ type: Boolean })
    hover = false;

    /**
     * List of click ripple elements.
     */
    clickElements: HTMLElement[] = [];

    /**
     * List of hover ripple elements.
     */
    hoverElements: HTMLElement[] = [];

    render() {
        return html`
        <button
            @pointerdown=${this._onPointerDown}
            @pointerenter=${this._onPointerEnter}
            style="--__ripple_button: var(--${this.colorScheme});
            --__ripple_button_click-color: var(--${this.colorScheme}-click-ripple, var(--${this.colorScheme}-light));
            --__ripple_button_click-opacity: var(--${this.colorScheme}-click-ripple-opacity);
            --__ripple_button_hover-color: var(--${this.colorScheme}-hover-ripple, var(--${this.colorScheme}-light));
            --__ripple_button_hover-opacity: var(--${this.colorScheme}-hover-ripple-opacity);
            "
            class="style-${this.buttonStyle}"
        >
            <span class="ripples">
                <span class="click">${this.clickElements}</span>
                <span class="hover">${this.hoverElements}</span>
            </span>
            <span class="no">
                <span>
                    <slot></slot>
                </span>
            </span>
        </button>
    `;
    }

    private rippleShared(e: PointerEvent, elems: HTMLElement[], type: 'click' | 'hover' = 'click'): (e1: PointerEvent) => boolean {
        const rect = (e.target as HTMLElement).getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const element = document.createElement('div');
        element.classList.add('ripple');
        element.style.left = `${x}px`;
        element.style.top = `${y}px`;

        element.style.setProperty('--__ripple_button-size', `${Math.sqrt(Math.max(
            (rect.width - x) ** 2 + y ** 2,
            x ** 2 + y ** 2,
            (rect.width - x) ** 2 + (rect.height - y) ** 2,
            x ** 2 + (rect.height - y) ** 2
        )) * 2}px`);

        element.animate([
            { transform: 'translate(-50%, -50%) scale(0)' },
            { transform: 'translate(-50%, -50%) scale(1)' }
        ], {
            duration: 500,
            easing: 'cubic-bezier(0, 0, 0.4, 1)'
        });

        elems.push(element);
        this.requestUpdate();

        let did = false;

        const cb = (e1: PointerEvent) => {
            if (did || e1.pointerId !== e.pointerId) return false;
            did = true;
            const fadeAnimation = element.animate([
                { opacity: `var(--__ripple-button-opacity, var(--base-${type}-ripple-opacity))` },
                { opacity: 0 }
            ], {
                duration: 500
            });

            fadeAnimation.onfinish = () => {
                elems.splice(elems.indexOf(element), 1);
                this.requestUpdate();
            };

            return true;
        };

        return cb;
    }

    private _onPointerDown(e: PointerEvent) {
        const cb1 = this.rippleShared(e, this.clickElements);
        const cb = (e1: PointerEvent) => {
            if (cb1(e1)) {
                window.removeEventListener('pointerup', cb);
                window.removeEventListener('pointercancel', cb);
            }
        };

        window.addEventListener('pointerup', cb);
        window.addEventListener('pointercancel', cb);
    }

    private _onPointerEnter(e: PointerEvent) {
        if (!this.hover) return;
        const cb1 = this.rippleShared(e, this.hoverElements, 'hover');
        const cb = (e1: PointerEvent) => {
            if (cb1(e1)) {
                this.removeEventListener('pointerleave', cb);
                this.removeEventListener('pointercancel', cb);
            }
        };

        this.addEventListener('pointerleave', cb);
        this.addEventListener('pointercancel', cb);
    }

    static styles = css`
        :host {
            display: block;
            overflow: hidden;
        }

        button {
            position: relative;
            border: none;
            cursor: pointer;
            outline: none;
            width: 100%;
            height: 100%;
            margin: 0;
            overflow: hidden;
            isolation: isolate;
            background: transparent;
            padding: 0.5rem 0.5rem;
        }

        button.style-solid {
            background-color: var(--__ripple_button);
            border-radius: 0.5rem;
        }

        button.style-outline {
            border-radius: 1rem;
        }

        .no {
            position: relative;
            pointer-events: none;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
        }

        button.style-outline .no {
            background-color: var(--__ripple_button);
            border-radius: 0.5rem;
            box-shadow: 0 0 0.25rem 0 #000;
        }

        .ripple {
            position: absolute;
            min-width: var(--__ripple_button-size);
            min-height: var(--__ripple_button-size);
            aspect-ratio: 1/1;
            border-radius: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: -1;
        }

        .click .ripple {
            background-color: var(--__ripple_button_click-color);
            opacity: var(--__ripple_button_click-opacity, var(--base-click-ripple-opacity));
        }

        .hover .ripple {
            background-color: var(--__ripple_button_hover-color);
            opacity: var(--__ripple_button_hover-opacity, var(--base-hover-ripple-opacity));
        }
  `;
}

declare global {
    interface HTMLElementTagNameMap {
        'ripple-button': RippleButton;
    }
}
