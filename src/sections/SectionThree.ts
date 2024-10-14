import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('section-three')
export class SectionThree extends LitElement {
    protected createRenderRoot() {
        return this;
    }

    render() {
        // @unocss-include
        return html`
            <portfolio-section fullHeight class="z-2">
                <div
                    class="base-card top-card relative flex flex-col items-center z-2
                rounded-b-8
                -mb-24 -top-40 pt-32"
                >
                    <div id="web-development" class="flex flex-col items-center pt-8 px-2 lg:p-8 rounded-8">
                        <portfolio-card class="portfolio-card flex flex-col-reverse justify-between gap-xl">
                            <div class="flex flex-row items-center justify-center">
                                <button data-for="about" class="active" aria-label="about">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path
                                            d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z"
                                        />
                                    </svg>

                                    <span class="tooltip">About</span>
                                </button>
                                <button data-for="technologies" aria-label="technologies">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path
                                            d="M21.71 20.29L20.29 21.71A1 1 0 0 1 18.88 21.71L7 9.85A3.81 3.81 0 0 1 6 10A4 4 0 0 1 2.22 4.7L4.76 7.24L5.29 6.71L6.71 5.29L7.24 4.76L4.7 2.22A4 4 0 0 1 10 6A3.81 3.81 0 0 1 9.85 7L21.71 18.88A1 1 0 0 1 21.71 20.29M2.29 18.88A1 1 0 0 0 2.29 20.29L3.71 21.71A1 1 0 0 0 5.12 21.71L10.59 16.25L7.76 13.42M20 2L16 4V6L13.83 8.17L15.83 10.17L18 8H20L22 4Z"
                                        />
                                    </svg>

                                    <span class="tooltip">Technologies</span>
                                </button>
                            </div>
                            <div class="flex flex-col justify-between gap-4 w-max max-w-[calc(100vw-2rem)]">
                                <h2 class="text-4xl px-12">Web Development</h2>
                                <multi-height class="relative w-full">
                                    <div
                                        data-name="about"
                                        class="content active text-xl text-center m-auto absolute top-0 left-0 w-full"
                                    >
                                        I have been developing websites since 2018. I am experienced in many
                                        technologies and frameworks and have worked on numerous projects, from small
                                        websites to large web applications. Click on
                                        <span class="inline-flex items-center gap-1">
                                            <svg
                                                class="smol-svg"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    d="M21.71 20.29L20.29 21.71A1 1 0 0 1 18.88 21.71L7 9.85A3.81 3.81 0 0 1 6 10A4 4 0 0 1 2.22 4.7L4.76 7.24L5.29 6.71L6.71 5.29L7.24 4.76L4.7 2.22A4 4 0 0 1 10 6A3.81 3.81 0 0 1 9.85 7L21.71 18.88A1 1 0 0 1 21.71 20.29M2.29 18.88A1 1 0 0 0 2.29 20.29L3.71 21.71A1 1 0 0 0 5.12 21.71L10.59 16.25L7.76 13.42M20 2L16 4V6L13.83 8.17L15.83 10.17L18 8H20L22 4Z"
                                                />
                                            </svg>
                                            "Technologies"
                                        </span>
                                        for more information.
                                    </div>
                                    <div
                                        data-name="technologies"
                                        class="content text-xl text-center m-auto absolute top-0 left-0 w-full"
                                    >
                                        <h3 class="text-3xl my-0">Technologies</h3>
                                        <div class="flex flex-row overflow-x-auto gap-4">
                                            <div class="flex flex-col items-center">
                                                <h4 class="text-2xl my-0">Languages</h4>
                                                <div>HTML / CSS</div>
                                                <div>JavaScript</div>
                                                <div>TypeScript</div>
                                                <div>Java</div>
                                                <div>C#</div>
                                                <div>PHP</div>
                                                <div>Kotlin</div>
                                            </div>
                                            <div class="flex flex-col items-center">
                                                <h4 class="text-2xl my-0">Frameworks</h4>
                                                <div>React</div>
                                                <div>Next.JS</div>
                                                <div>Remix</div>
                                                <div>SvelteKit</div>
                                                <div>Lit.JS</div>
                                            </div>
                                            <div class="flex flex-col items-center">
                                                <h4 class="text-2xl my-0">Services</h4>
                                                <div>Cloudflare</div>
                                                <div>Nginx</div>
                                                <div>Apache2</div>
                                                <div>Linux</div>
                                            </div>
                                        </div>
                                    </div>
                                </multi-height>
                            </div>
                        </portfolio-card>
                    </div>
                </div>

                <div class="pb-16 lg:pl-15% w-full z-2">
                    <div
                        class="base-card right w-full flex flex-col md:flex-row items-stretch lt-lg:b-l-none! lg:rounded-l-8"
                    >
                        <div class="flex-1 grow-1 flex flex-col justify-between">
                            <portfolio-card
                                class="portfolio-card flex flex-col-reverse justify-between gap-xl p-8 rounded-8"
                            >
                                <div class="flex flex-row items-center justify-center">
                                    <button data-for="about" class="active" aria-label="about">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <path
                                                d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z"
                                            />
                                        </svg>

                                        <span class="tooltip">About</span>
                                    </button>
                                    <button data-for="technologies" aria-label="technologies">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <path
                                                d="M21.71 20.29L20.29 21.71A1 1 0 0 1 18.88 21.71L7 9.85A3.81 3.81 0 0 1 6 10A4 4 0 0 1 2.22 4.7L4.76 7.24L5.29 6.71L6.71 5.29L7.24 4.76L4.7 2.22A4 4 0 0 1 10 6A3.81 3.81 0 0 1 9.85 7L21.71 18.88A1 1 0 0 1 21.71 20.29M2.29 18.88A1 1 0 0 0 2.29 20.29L3.71 21.71A1 1 0 0 0 5.12 21.71L10.59 16.25L7.76 13.42M20 2L16 4V6L13.83 8.17L15.83 10.17L18 8H20L22 4Z"
                                            />
                                        </svg>

                                        <span class="tooltip">Technologies</span>
                                    </button>
                                </div>
                                <div class="flex flex-col justify-between gap-4">
                                    <h3 class="text-3xl">Mead Simon Chain Mail Designs</h3>
                                    <multi-height class="relative w-full">
                                        <div
                                            data-name="about"
                                            class="content active text-xl text-center m-auto absolute top-0 left-0 w-full"
                                        >
                                            This website is a portfolio for Mead Simon Chain Mail Designs. It showcases
                                            the various fashion pieces that are available for purchase. It is also
                                            connected to a Shopify store to facilitate the purchasing process. Since the
                                            creation of this website, the online purchases have increased by more than
                                            300%.
                                        </div>
                                        <div
                                            data-name="technologies"
                                            class="content text-xl text-center m-auto absolute top-0 left-0 w-full"
                                        >
                                            <ul class="text-left m-0">
                                                <li>HTML - The language of the web</li>
                                                <li>SCSS - CSS with superpowers</li>
                                                <li>TypeScript - JavaScript with types. It's great!</li>
                                                <li>JQuery - Very useful for DOM manipulation</li>
                                                <li>AJAX - Used to communicate with the website's backend</li>
                                                <li>PHP - Used to implement all the backend functionality</li>
                                            </ul>
                                        </div>
                                    </multi-height>
                                </div>
                            </portfolio-card>
                            <a class="button m-8 mx-auto" href="https://meadsimon.ca" target="_blank">Visit</a>
                        </div>
                        <div class="separator"></div>
                        <iframe
                            class="flex-1 grow-2 min-h-75vh border-none"
                            src="https://meadsimon.ca"
                            title="Mead Simon Chain Mail Designs"
                        ></iframe>
                    </div>
                </div>

                <div class="pb-16 lg:pr-15% w-full z-2">
                    <div
                        class="base-card left w-full flex flex-col-reverse md:flex-row items-stretch lt-lg:b-r-none! lg:rounded-r-8"
                    >
                        <iframe
                            class="flex-1 grow-2 min-h-75vh border-none"
                            src="https://abacuscleaninginc.com/"
                            title="Abacus Cleaning Services Inc."
                        ></iframe>
                        <div class="separator"></div>
                        <div class="flex-1 grow-1 flex flex-col justify-between">
                            <portfolio-card
                                class="portfolio-card flex flex-col-reverse justify-between gap-xl p-8 rounded-8"
                            >
                                <div class="flex flex-row items-center justify-center">
                                    <button data-for="about" class="active" aria-label="about">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <path
                                                d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z"
                                            />
                                        </svg>

                                        <span class="tooltip">About</span>
                                    </button>
                                    <button data-for="technologies" aria-label="technologies">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <path
                                                d="M21.71 20.29L20.29 21.71A1 1 0 0 1 18.88 21.71L7 9.85A3.81 3.81 0 0 1 6 10A4 4 0 0 1 2.22 4.7L4.76 7.24L5.29 6.71L6.71 5.29L7.24 4.76L4.7 2.22A4 4 0 0 1 10 6A3.81 3.81 0 0 1 9.85 7L21.71 18.88A1 1 0 0 1 21.71 20.29M2.29 18.88A1 1 0 0 0 2.29 20.29L3.71 21.71A1 1 0 0 0 5.12 21.71L10.59 16.25L7.76 13.42M20 2L16 4V6L13.83 8.17L15.83 10.17L18 8H20L22 4Z"
                                            />
                                        </svg>

                                        <span class="tooltip">Technologies</span>
                                    </button>
                                </div>
                                <div class="flex flex-col justify-between gap-4">
                                    <h3 class="text-3xl">Abacus Cleaning Services Inc.</h3>
                                    <multi-height class="relative w-full">
                                        <div
                                            data-name="about"
                                            class="content active text-xl text-center m-auto absolute top-0 left-0 w-full"
                                        >
                                            This website showcases the services this cleaning business has to offer. It
                                            also provides a way for potential customers to contact the business.
                                        </div>
                                        <div
                                            data-name="technologies"
                                            class="content text-xl text-center m-auto absolute top-0 left-0 w-full"
                                        >
                                            <ul class="text-left m-0">
                                                <li>HTML - The language of the web</li>
                                                <li>CSS - Used to style the website</li>
                                                <li>JavaScript - Used for the animations and the form</li>
                                            </ul>
                                            That's it! This website is a static website hosted on Cloudflare Pages.
                                        </div>
                                    </multi-height>
                                </div>
                            </portfolio-card>
                            <a class="button m-8 mx-auto" href="https://abacuscleaninginc.com/" target="_blank"
                                >Visit</a
                            >
                        </div>
                    </div>
                </div>

                <my-aquarium
                    slot="background"
                    maskid="wave3"
                    flipmasky
                    class="absolute inset-0
                            -top-40 h-[calc(100%+20rem)] z-1"
                    color="var(--primary-wave)"
                ></my-aquarium>
            </portfolio-section>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'section-three': SectionThree;
    }
}
