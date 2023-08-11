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
                <div
                class="flex flex-row flex-wrap justify-evenly items-start w-full gap-x-24 md:gap-x-0 gap-y-24 px-24 md:px-0 mb-24 z-2">
                <div
                    class="mt-0 xl:mt-24 order-last md:order-none base-card
                    flex flex-col items-center p-8 rounded-8 min-w-72">
                    <h2 class="text-4xl">Tools I use</h2>
                    <ul class="text-xl max-w-lg">
                    <li>Git</li>
                    <li>GitHub</li>
                    <li>VSCode</li>
                    <li><abbr title="I use Arch btw 😎">Linux</abbr></li>
                    </ul>
                </div>
                <div class="md:mx-32 lg:mx-64 xl:mx-0 lg:max-w-none flex-basis-full xl:flex-basis-[unset]
                    order-first xl:order-none w-fit
                    base-card p-8 rounded-b-8
                    flex flex-col items-center
                    relative -top-40 pt-40 -mb-40 min-w-72">
                    <h2 class="text-4xl">Languages</h2>

                    <div class="flex flex-col sm:flex-row items-start gap-6">
                    <div class="flex flex-col">
                        <h3 class="text-3xl">Web</h3>
                        <ul class="text-xl max-w-lg">
                        <li>HTML</li>
                        <li>CSS</li>
                        <li>SCSS</li>
                        <li>JavaScript</li>
                        <li>TypeScript</li>
                        </ul>
                    </div>
                    <div class="flex flex-col">
                        <h3 class="text-3xl">Backend</h3>
                        <ul class="text-xl max-w-lg">
                        <li>NodeJS</li>
                        <li>PHP</li>
                        <li>Python</li>
                        <li>Java</li>
                        <li>C#</li>
                        <li>Rust</li>
                        <li>SQL</li>
                        </ul>
                    </div>
                    <div class="flex flex-col">
                        <h3 class="text-3xl">Game</h3>
                        <ul class="text-xl max-w-lg">
                        <li>C#</li>
                        <li>GDScript</li>
                        <li>Java</li>
                        </ul>
                    </div>
                    </div>
                </div>
                <div
                    class="mt-0 xl:mt-24 base-card flex flex-col items-center p-8 rounded-8  min-w-72">
                    <h2 class="text-4xl">Frameworks</h2>
                    <ul class="text-xl max-w-lg">
                    <li>Node.JS</li>
                    <li>Bun</li>
                    <li>React</li>
                    <li>Vue</li>
                    <li>Lit</li>
                    <li>Next</li>
                    <li>Express</li>
                    <li>WordPress</li>
                    <li>Shopify</li>
                    <li>Unity</li>
                    <li>Godot</li>
                    </ul>
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