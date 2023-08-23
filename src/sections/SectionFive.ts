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
                    message on <a href="https://discord.com/">Discord</a> at <code>selfmadesystem</code>.
                </p>
            </div>

            <div class="pb-16 md:pl-15% w-full">
                <div class="primary-card w-full flex flex-col md:flex-row items-stretch md:rounded-l-8">
                    <div class="flex-1 grow-1 flex flex-col justify-between">
                        <portfolio-card class="portfolio-card flex flex-col-reverse justify-between gap-xl p-8 rounded-8">
                            <div class="flex flex-row items-center justify-center">
                                <button data-for="about" class="active" aria-label="about">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24">
                                    <path
                                        d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z" />
                                    </svg>

                                    <span class="tooltip">About</span>
                                </button>
                                <button data-for="technologies" aria-label="technologies">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24">
                                    <path
                                        d="M21.71 20.29L20.29 21.71A1 1 0 0 1 18.88 21.71L7 9.85A3.81 3.81 0 0 1 6 10A4 4 0 0 1 2.22 4.7L4.76 7.24L5.29 6.71L6.71 5.29L7.24 4.76L4.7 2.22A4 4 0 0 1 10 6A3.81 3.81 0 0 1 9.85 7L21.71 18.88A1 1 0 0 1 21.71 20.29M2.29 18.88A1 1 0 0 0 2.29 20.29L3.71 21.71A1 1 0 0 0 5.12 21.71L10.59 16.25L7.76 13.42M20 2L16 4V6L13.83 8.17L15.83 10.17L18 8H20L22 4Z" />
                                    </svg>

                                    <span class="tooltip">Technologies</span>
                                </button>
                            </div>
                            <div class="flex flex-col justify-between gap-4">
                            <h3 class="text-3xl">
                                Minesvelte
                            </h3>
                            <multi-height class="relative w-full">
                                <div data-name="about" class="content active text-xl text-center m-auto absolute top-0 left-0 w-full">
                                    A Minesweeper variant made with Svelte and TypeScript.
                                    Inspired by the games
                                    <a href="https://store.steampowered.com/app/709920/Tametsi/" target="_blank">Tametsi</a> and
                                    <a href="https://store.steampowered.com/app/265890/Hexcells/" target="_blank">Hexcells</a>,
                                    this game offers an infinite amount of procedurally generated levels.
                                    Mobile support is currently being worked on.
                                    <p>
                                        Note: zooming will not work in the iframe. If you want to play, please visit the website.
                                    </p>
                                </div>
                                <div data-name="technologies" class="content text-xl text-center m-auto absolute top-0 left-0 w-full">
                                        <ul class="text-left m-0">
                                            <li>Svelte - Used as the base framework</li>
                                            <li>SCSS - CSS with superpowers</li>
                                            <li>TypeScript - JavaScript with types. It's great!</li>
                                            <li>TailwindCSS - A utility-first CSS framework</li>
                                            <li>SVG - Used instead of canvas for drawing the game.</li>
                                        </ul>
                                    </div>
                            </multi-height>
                            </div>
                        </portfolio-card>
                        <a class="button m-8 mx-auto" href="https://minesvelte.shoghisimon.cc" target="_blank">Visit</a>
                    </div>
                    <div class="separator"></div>
                    <iframe class="flex-1 grow-2 min-h-75vh border-none" src="https://minesvelte.shoghisimon.cc"></iframe>
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