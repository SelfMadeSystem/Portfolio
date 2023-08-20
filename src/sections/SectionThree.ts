import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('section-three')
export class SectionThree extends LitElement {
    protected createRenderRoot(): Element | ShadowRoot {
        return this;
    }

    render() {
        // @unocss-include
        return html`
            <portfolio-section fullHeight id="what-i-use" class="z-2">
                <div class="base-card relative flex flex-col items-center
                mx-8 rounded-b-8
                -mb-24 -top-40 pt-32">
                    <div id="web-development" class="z-2 my-24 flex flex-col items-center p-8 rounded-8">
                        <h2 class="text-4xl">Web Development</h2>
                        <p class="text-xl max-w-lg text-center mx-8">
                            I have been developing websites for over 5 years now.
                            I have experience with many different technologies and frameworks.
                            I have worked on many different projects, from small websites to large web applications.
                        </p>
                    </div>
                </div>

                <div class="pb-16 lg:pl-15% w-full">
                    <div class="base-card w-full flex flex-col md:flex-row items-stretch lg:rounded-l-8">
                        <div class="flex flex-col items-center p-8">
                            <h2 class="text-4xl">Mead Simon Chain Mail Designs</h2>
                            <p class="text-xl max-w-lg mx-8">
                                This website is a portfolio for Mead Simon Chain Mail Designs.
                                It showcases the various fashion pieces that are available for purchase.
                                It is also connected to a Shopify store to facilitate the purchasing process.
                                Since the creation of this website, the online purchases have increased by more than 300%.
                            </p>
                            <a class="text-xl button" href="https://meadsimon.ca">Visit</a>
                        </div>
                        <div class="separator"></div>
                        <iframe class="grow-2 w-full min-h-75vh border-none" src="https://meadsimon.ca"></iframe>
                    </div>
                </div>

                <div class="pb-16 lg:pr-15% w-full">
                    <div class="base-card w-full flex flex-col-reverse md:flex-row items-stretch lg:rounded-r-8">
                        <iframe class="grow-2 w-full min-h-75vh border-none" src="https://abacus-cal.pages.dev"></iframe>
                        <div class="separator"></div>
                        <div class="flex flex-col items-center p-8">
                            <h2 class="text-4xl">Abacus Cleaning Services Inc.</h2>
                            <p class="text-xl max-w-lg mx-8">
                                I have been working on a website for my father's chain mail business.
                            </p>
                            <a class="text-xl button" href="https://abacus-cal.pages.dev">Visit</a>
                        </div>
                    </div>
                </div>

                <my-aquarium slot="background"
                maskid="wave3"
                flipmasky
                class="absolute inset-0
                            -top-40 h-[calc(100%+20rem)] z-1"
                color="var(--primary-wave)">
                <!-- <div class="absolute inset-0"
                    style="
                box-shadow: inset 0 -10rem 5rem -5rem var(--base);
                "></div> -->
                </my-aquarium>
            </portfolio-section>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'section-three': SectionThree;
    }
}