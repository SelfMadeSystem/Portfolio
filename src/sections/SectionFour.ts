import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('section-four')
export class SectionFour extends LitElement {
    protected createRenderRoot(): Element | ShadowRoot {
        return this;
    }

    render() {
        // @unocss-include
        return html`
            <portfolio-section fullHeight class="secondary" id="portfolio">
                <my-wave id="wave3" color="var(--base-wave)" class="relative transform -scale-y-[1] z-1"></my-wave>
                <div class="secondary-card title relative flex flex-col items-center
                mx-8
                -mb-24 -top-40 pt-32">
                    <div id="backend-development" class="z-2 my-24 flex flex-col items-center p-8 rounded-8">
                        <h2 class="text-4xl">Backend Development</h2>
                        <p class="text-xl max-w-lg text-center mx-8">
                            I have experience with backend development using NodeJS and ExpressJS.
                            I have also worked with MongoDB and MySQL databases.
                        </p>
                    </div>
                    <my-wave color="var(--secondary-wave)" neonempty amount="2" opacity="0.5" class="relative z-1"></my-wave>
                </div>
            </portfolio-section>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'section-four': SectionFour;
    }
}