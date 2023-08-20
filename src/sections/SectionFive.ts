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
            <div id="game-development" class="z-2 my-24 flex flex-col items-center p-8 rounded-8">
                <h2 class="text-4xl">Game Development</h2>
                <p class="text-xl max-w-lg text-center mx-8">
                    If you want to contact me, you can send me an email at
                    <a href="mailto:sms@shoghisimon.cc">sms@shoghisimon.cc</a> or send me a
                    message on Discord at <code>selfmadesystem</code>.
                </p>
            </div>

            <div class="pb-16 md:pl-15% w-full">
                <div class="primary-card w-full flex flex-col md:flex-row items-stretch md:rounded-l-8">
                    <div class="flex flex-col items-center p-8">
                        <h2 class="text-4xl">Minesvelte</h2>
                        <p class="text-xl max-w-lg mx-8">
                            This website is a portfolio for Mead Simon Chain Mail Designs.
                            It showcases the various fashion pieces that are available for purchase.
                            It is also connected to a Shopify store to facilitate the purchasing process.
                            Since the creation of this website, the online purchases have increased by more than 300%.
                        </p>
                        <a class="text-xl button" href="https://minesvelte.shoghisimon.cc">Visit</a>
                    </div>
                    <div class="separator"></div>
                    <iframe class="grow-2 w-full min-h-75vh border-none" src="https://minesvelte.shoghisimon.cc"></iframe>
                </div>
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