import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * A button with a ripple effect.
 *
 * @slot - This element has a slot
 */
@customElement('portfolio-section')
export class PortfolioSection extends LitElement {
    /**
     * Whether or not the section should take up the full height of the screen.
     */
    @property({ type: Boolean })
    fullHeight = false;

    /**
     * Whether or not the section should center its contents.
     */
    @property({ type: Boolean })
    center = false;

    render() {
        return html`
        <section>
            <div class="background">
                <slot name="background"></slot>
            </div>
            <slot></slot>
        </section>
        `;
    }

    static override styles = css`
        :host {
            position: relative;
            display: block;
            width: 100%;
            height: 100%;
        }

        :host([fullHeight]) {
            height: 100vh;
        }

        section {
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
            width: 100%;
            height: 100%;
            isolation: isolate;
        }

        .background {
            display: block;
            position: absolute;
            inset: 0;
            z-index: -1;
        }
        
        :host([center]) section {
            display: flex;
            justify-content: center;
            align-items: center;
        }
        `;
}

declare global {
    interface HTMLElementTagNameMap {
        'portfolio-section': PortfolioSection;
    }
}