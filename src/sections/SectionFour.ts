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
                -mb-24 -top-40 pt-40">
                <div class="px-4">
                    <h2 class="text-4xl">Portfolio</h2>
                    <p class="text-xl max-w-lg text-center">
                    Here are some of my projects. If you want to see more, check out my
                    <a href="https://github.com/SelfMadeSystem" target="_blank">GitHub</a>.
                    </p>
                </div>
                <my-wave color="var(--secondary-wave)" neonempty amount="2" opacity="0.5" class="relative z-1"></my-wave>
                </div>
                <div
                class="flex flex-wrap flex-row justify-center items-stretch gap-16 mb-24">

                <portfolio-card class="portfolio-card secondary-card
                    flex flex-row justify-between gap-xl p-8 rounded-8">
                    <div class="flex flex-col items-center justify-center">
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
                        Shoghi Simon's Portfolio
                    </h3>
                    <multi-height class="relative w-full md:w-lg">
                        <div data-name="about" class="content active text-xl text-center m-auto absolute top-0 left-0 w-full">
                        This is my portfolio website. I hope you like it!
                        </div>

                        <div data-name="technologies" class="content text-xl text-center m-auto absolute top-0 left-0 w-full">
                        <ul class="text-left m-0">
                            <li>HTML - The language of the web</li>
                            <li>SCSS - CSS with superpowers</li>
                            <li>TypeScript - JavaScript with types. It's great!</li>
                            <li>Lit - Easily make web components</li>
                            <li>UnoCSS - A utility-first CSS framework</li>
                        </ul>
                        </div>
                    </multi-height>
                    <a class="button" href="https://shoghisimon.cc" target="_blank">Visit</a>
                    </div>
                </portfolio-card>

                <portfolio-card class="portfolio-card secondary-card
                    flex flex-row justify-between gap-xl p-8 rounded-8">
                    <div class="flex flex-col items-center justify-center">
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
                    <multi-height class="relative w-full md:w-lg">
                        <div data-name="about" class="content active text-xl text-center m-auto absolute top-0 left-0 w-full">
                        Mead Simon Chain Mail Designs is a website for high-end
                        chain mail fashion.
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
                    <a class="button" href="https://meadsimon.ca" target="_blank">Visit</a>
                    </div>
                </portfolio-card>

                <portfolio-card class="portfolio-card secondary-card
                    flex flex-row justify-between gap-xl p-8 rounded-8">
                    <div class="flex flex-col items-center justify-center">
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
                        Minesvelte
                    </h3>
                    <multi-height class="relative w-full md:w-lg">
                        <div data-name="about" class="content active text-xl text-center m-auto absolute top-0 left-0 w-full">
                        Minesvelte is a web-based game inspired by Minesweeper, but
                        with lots of twists and different board layouts. Super customizable.
                        Mobile support is currently under construction.
                        </div>

                        <div data-name="technologies" class="content text-xl text-center m-auto absolute top-0 left-0 w-full">
                        <ul class="text-left m-0">
                            <li>SCSS - CSS with superpowers</li>
                            <li>TypeScript - JavaScript with types. It's great!</li>
                            <li>Svelte - A super cool framework for building web apps</li>
                        </ul>
                        </div>
                    </multi-height>
                    <a class="button" href="https://meadsimon.ca" target="_blank">Visit</a>
                    </div>
                </portfolio-card>

                <portfolio-card class="portfolio-card secondary-card
                    flex flex-row justify-between gap-xl p-8 rounded-8">
                    <div class="flex flex-col items-center justify-center">
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
                        Abacus Cleaning Services Inc.
                    </h3>
                    <multi-height class="relative w-full md:w-lg">
                        <div data-name="about" class="content active text-xl text-center m-auto absolute top-0 left-0 w-full">
                        Abacus Cleaning Services Inc. is a website for a cleaning
                        company. The website is
                        still under construction
                        </div>

                        <div data-name="technologies" class="content text-xl m-auto absolute top-0 left-0 w-full">
                        <ul class="text-left m-0">
                            <li>HTML - The language of the web</li>
                            <li>CSS - The style of the web</li>
                            <li>JavaScript - The logic of the web</li>
                        </ul>
                        <p>
                            I only used vanilla tools because the website needed nothing
                            more.
                        </p>
                        </div>
                    </multi-height>
                    <!-- Go to dev website for now kuz real website doesn't exist -->
                    <!-- href="https://abacuscleaninginc.com" -->
                    <a class="button" href="https://abacus-cal.pages.dev" target="_blank">Visit</a>
                    </div>
                </portfolio-card>
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