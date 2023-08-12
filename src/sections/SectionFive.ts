import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('section-five')
export class SectionFive extends LitElement {
    protected createRenderRoot(): Element | ShadowRoot {
        return this;
    }

    render() {
        // @unocss-include
        return html`
        <portfolio-section class="primary z-1" id="contact">
            <div id="backend-development" class="z-2 my-24 flex flex-col items-center p-8 rounded-8">
                <h2 class="text-4xl">Backend Development</h2>
                <p class="text-xl max-w-lg text-center mx-8">
                    If you want to contact me, you can send me an email at
                    <a href="mailto:sms@shoghisimon.cc">sms@shoghisimon.cc</a> or send me a
                    message on Discord at <code>selfmadesystem</code>.
                </p>
            </div>

            <div id="game-development" class="z-2 my-24 flex flex-col items-center p-8 rounded-8">
                <h2 class="text-4xl">Game Development</h2>
                <p class="text-xl max-w-lg text-center mx-8">
                    If you want to contact me, you can send me an email at
                    <a href="mailto:sms@shoghisimon.cc">sms@shoghisimon.cc</a> or send me a
                    message on Discord at <code>selfmadesystem</code>.
                </p>
            </div>

            <div class="z-2 my-24 primary-card flex flex-col items-center p-8 rounded-8">
                <h2 class="text-4xl">Contact</h2>
                <p class="text-xl max-w-lg text-center mx-8">
                    If you want to contact me, you can send me an email at
                    <a href="mailto:sms@shoghisimon.cc">sms@shoghisimon.cc</a> or send me a
                    message on Discord at <code>selfmadesystem</code>.
                </p>
            </div>


            <my-aquarium slot="background"
            maskid="lastwave"
            maskInverse
            class="absolute -top-40 h-[calc(100%+20rem)] z-1"
            color="var(--base-wave)"></my-aquarium>
        </portfolio-section>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'section-five': SectionFive;
    }
}