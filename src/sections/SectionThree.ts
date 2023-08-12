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