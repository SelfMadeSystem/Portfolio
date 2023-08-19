import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('section-one')
export class SectionOne extends LitElement {
    protected createRenderRoot(): Element | ShadowRoot {
        return this;
    }

    render() {
        // @unocss-include
        return html`
        <portfolio-section fullHeight id="start">
            <div id="header-card" class="flex flex-col items-center
            backdrop-filter backdrop-blur-md
            rounded-8 p-8 mt-16 z-6 overflow-hidden
            ">
                <div class="z-8">
                    <h1 class="text-6xl text-center">
                    <span>Hi, I'm</span>
                    <span>Shoghi Simon</span>
                    <span id="hand-wave">👋</span>
                    </h1>
                    <p class="text-xl max-w-lg text-center">
                    I'm a full-stack developer. I love to create fast and reliable software
                    to
                    help others accomplish their goals.
                    </p>
                </div>
            </div>

            <my-wave slot="background" id="wave1"
            neonempty
            neonclipped
            class="absolute inset-0 transform -scale-y-[1] z-6"
            speed="[0.01, 0.03]"
            waveWidth="[2, 4]"
            waveHeight="1"
            amount="3"
            opacity="0.6"
            waveWidthInRelationToHeight="false"
            color="var(--base-wave)"></my-wave>
  
            <div slot="background" id="arrow-down"
            class="absolute
            bottom-16 left-1/2
            transform -translate-x-1/2 rotate-45
            w-8 h-8
            z-6">
            </div>
        </portfolio-section>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'section-one': SectionOne;
    }
}