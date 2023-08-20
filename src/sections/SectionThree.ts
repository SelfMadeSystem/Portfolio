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
                        <div class="grow-1 flex flex-col justify-between">
                            <portfolio-card class="portfolio-card flex flex-col-reverse justify-between gap-xl p-8 rounded-8">
                                <div class="flex flex-row items-center justify-center">
                                    <button data-for="about" class="active">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24">
                                        <path
                                            d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z" />
                                        </svg>
                                    </button>
                                    <button data-for="technologies">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24">
                                        <path
                                            d="M21.71 20.29L20.29 21.71A1 1 0 0 1 18.88 21.71L7 9.85A3.81 3.81 0 0 1 6 10A4 4 0 0 1 2.22 4.7L4.76 7.24L5.29 6.71L6.71 5.29L7.24 4.76L4.7 2.22A4 4 0 0 1 10 6A3.81 3.81 0 0 1 9.85 7L21.71 18.88A1 1 0 0 1 21.71 20.29M2.29 18.88A1 1 0 0 0 2.29 20.29L3.71 21.71A1 1 0 0 0 5.12 21.71L10.59 16.25L7.76 13.42M20 2L16 4V6L13.83 8.17L15.83 10.17L18 8H20L22 4Z" />
                                        </svg>
                                    </button>
                                    <button data-for="screenshots">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24">
                                        <path
                                            d="M21,17H7V3H21M21,1H7A2,2 0 0,0 5,3V17A2,2 0 0,0 7,19H21A2,2 0 0,0 23,17V3A2,2 0 0,0 21,1M3,5H1V21A2,2 0 0,0 3,23H19V21H3M15.96,10.29L13.21,13.83L11.25,11.47L8.5,15H19.5L15.96,10.29Z" />
                                        </svg>
                                    </button>
                                </div>
                                <div class="flex flex-col justify-between gap-4">
                                <h3 class="text-3xl">
                                    Mead Simon Chain Mail Designs
                                </h3>
                                <multi-height class="relative w-full">
                                    <div data-name="about" class="content active text-xl text-center m-auto absolute top-0 left-0 w-full">
                                    This website is a portfolio for Mead Simon Chain Mail Designs.
                                    It showcases the various fashion pieces that are available for purchase.
                                    It is also connected to a Shopify store to facilitate the purchasing process.
                                    Since the creation of this website, the online purchases have increased by more than 300%.
                                    </div>
                                    <div data-name="technologies" class="content text-xl text-center m-auto absolute top-0 left-0 w-full">
                                    <ul class="text-left m-0">
                                        <li>HTML - The language of the web</li>
                                        <li>SCSS - CSS with superpowers</li>
                                        <li>TypeScript - JavaScript with types. It's great!</li>
                                        <li>JQuery - Very useful for DOM manipulation</li>
                                        <li>PHP - Used to implement all the backend functionality</li>
                                    </ul>
                                    </div>
                                </multi-height>
                                </div>
                            </portfolio-card>
                            <a class="button m-8 mx-auto" href="https://meadsimon.ca" target="_blank">Visit</a>
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