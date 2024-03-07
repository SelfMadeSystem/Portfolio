import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('section-four')
export class SectionFour extends LitElement {
    protected createRenderRoot() {
        return this;
    }

    render() {
        // @unocss-include
        return html`
            <portfolio-section fullHeight class="secondary" id="portfolio">
                <my-wave id="wave3" color="var(--base-wave)" class="relative transform -scale-y-[1] z-1"></my-wave>
                <div
                    class="secondary-card title relative flex flex-col items-center
                -mb-24 -top-40 pt-32"
                >
                    <div id="backend-development" class="z-2 my-24 flex flex-col items-center p-8 rounded-8">
                        <h2 class="text-4xl">Backend Development</h2>
                        <p class="text-xl max-w-lg text-center mx-8">
                            I have experience with backend development using NodeJS, NextJS, Java, PHP, and ExpressJS. I
                            have also worked with various databases, such as MongoDB and MySQL.
                        </p>
                    </div>
                    <my-wave
                        color="var(--secondary-wave)"
                        neonempty
                        amount="2"
                        opacity="0.5"
                        class="relative z-1"
                    ></my-wave>
                </div>

                <div class="flex flex-wrap pt-8 md:px-16 justify-evenly w-full items-stretch gap-16 mb-16 z-6">
                    <div class="secondary-card flex-1 grow-1 flex flex-col justify-between rounded-8 max-w-lg">
                        <portfolio-card class="portfolio-card flex flex-col-reverse justify-between gap-xl p-8">
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
                                <button data-for="platforms">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path
                                            d="M4,1H20A1,1 0 0,1 21,2V6A1,1 0 0,1 20,7H4A1,1 0 0,1 3,6V2A1,1 0 0,1 4,1M4,9H20A1,1 0 0,1 21,10V14A1,1 0 0,1 20,15H4A1,1 0 0,1 3,14V10A1,1 0 0,1 4,9M4,17H20A1,1 0 0,1 21,18V22A1,1 0 0,1 20,23H4A1,1 0 0,1 3,22V18A1,1 0 0,1 4,17M9,5H10V3H9V5M9,13H10V11H9V13M9,21H10V19H9V21M5,3V5H7V3H5M5,11V13H7V11H5M5,19V21H7V19H5Z"
                                        />
                                    </svg>
                                    <span class="tooltip">Platforms</span>
                                </button>
                                <button data-for="languages">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path
                                            d="M19.14,7.5A2.86,2.86 0 0,1 22,10.36V14.14A2.86,2.86 0 0,1 19.14,17H12C12,17.39 12.32,17.96 12.71,17.96H17V19.64A2.86,2.86 0 0,1 14.14,22.5H9.86A2.86,2.86 0 0,1 7,19.64V15.89C7,14.31 8.28,13.04 9.86,13.04H15.11C16.69,13.04 17.96,11.76 17.96,10.18V7.5H19.14M14.86,19.29C14.46,19.29 14.14,19.59 14.14,20.18C14.14,20.77 14.46,20.89 14.86,20.89A0.71,0.71 0 0,0 15.57,20.18C15.57,19.59 15.25,19.29 14.86,19.29M4.86,17.5C3.28,17.5 2,16.22 2,14.64V10.86C2,9.28 3.28,8 4.86,8H12C12,7.61 11.68,7.04 11.29,7.04H7V5.36C7,3.78 8.28,2.5 9.86,2.5H14.14C15.72,2.5 17,3.78 17,5.36V9.11C17,10.69 15.72,11.96 14.14,11.96H8.89C7.31,11.96 6.04,13.24 6.04,14.82V17.5H4.86M9.14,5.71C9.54,5.71 9.86,5.41 9.86,4.82C9.86,4.23 9.54,4.11 9.14,4.11C8.75,4.11 8.43,4.23 8.43,4.82C8.43,5.41 8.75,5.71 9.14,5.71Z"
                                        />
                                    </svg>
                                    <span class="tooltip">Languages</span>
                                </button>
                            </div>
                            <div class="flex flex-col justify-between gap-4">
                                <h3 class="text-3xl">ServerScripter</h3>
                                <multi-height class="relative w-full">
                                    <div
                                        data-name="about"
                                        class="content active text-xl text-center m-auto absolute top-0 left-0 w-full"
                                    >
                                        ServerScripter is a multi-platform Java plugin that allows you to write scripts
                                        for your Minecraft servers. Due to the dynamic nature of the plugin, it can
                                        easily be ported to multiple platforms and it is easy to add support for
                                        language. The plugin has been used by MC-Galaxy for over a year now and has been
                                        proven to be stable. It has been very useful in speeding up the development of
                                        the server by allowing rapid implementation of simple features.
                                    </div>
                                    <div
                                        data-name="technologies"
                                        class="content text-xl text-center m-auto absolute top-0 left-0 w-full"
                                    >
                                        <ul class="text-left m-0">
                                            <li>Java - The main programming language used to create the plugin.</li>
                                            <li>Gradle - The build tool used to build the plugin.</li>
                                        </ul>
                                    </div>
                                    <div
                                        data-name="platforms"
                                        class="content text-xl text-center m-auto absolute top-0 left-0 w-full"
                                    >
                                        <ul class="text-left m-0">
                                            <li>Spigot - The main platform the plugin is built for.</li>
                                            <li>BungeeCord - The is compatible with the proxy server BungeeCord.</li>
                                            <li>Velocity - The plugin has been ported to Velocity.</li>
                                        </ul>
                                    </div>
                                    <div
                                        data-name="languages"
                                        class="content text-xl text-center m-auto absolute top-0 left-0 w-full"
                                    >
                                        <ul class="text-left m-0">
                                            <li>
                                                Python - The original plugin
                                                <a href="https://github.com/SelfMadeSystem/SPYgotUtils" target="_blank"
                                                    >SPYgotUtils</a
                                                >
                                                was written for Python. Support is via
                                                <a href="https://www.jython.org" target="_blank">Jython</a> or
                                                <a href="https://www.graalvm.org" target="_blank">GraalVM</a>.
                                            </li>
                                            <li>
                                                JavaScript - Support is via
                                                <a href="http://mozilla.github.io/rhino/" target="_blank">Rhino</a> or
                                                <a href="https://www.graalvm.org" target="_blank">GraalVM</a>.
                                            </li>
                                            <li>
                                                Groovy - Support is via
                                                <a href="https://www.groovy-lang.org" target="_blank">Groovy</a>.
                                            </li>
                                            <li>
                                                R - Support is via
                                                <a href="https://www.graalvm.org" target="_blank">GraalVM</a>.
                                            </li>
                                        </ul>
                                    </div>
                                </multi-height>
                            </div>
                        </portfolio-card>
                        <a
                            class="button m-8 mx-auto"
                            href="https://github.com/SelfMadeSystem/ServerScripter"
                            target="_blank"
                            >Visit</a
                        >
                    </div>

                    <div class="secondary-card flex-1 grow-1 flex flex-col justify-between rounded-8 max-w-lg">
                        <portfolio-card class="portfolio-card flex flex-col-reverse justify-between gap-xl p-8">
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
                                <h3 class="text-3xl">MyDiscordBot</h3>
                                <multi-height class="relative w-full">
                                    <div
                                        data-name="about"
                                        class="content active text-xl text-center m-auto absolute top-0 left-0 w-full"
                                    >
                                        MyDiscordBot is a simple and easily extendable Discord bot. It doesn't come with
                                        many features built-in, but it is rather used as a base to easily build your own
                                        bot. It has been used as the base of the BigSister bot, a custom-made bot used
                                        by MC-Galaxy.
                                    </div>
                                    <div
                                        data-name="technologies"
                                        class="content text-xl text-center m-auto absolute top-0 left-0 w-full"
                                    >
                                        <ul class="text-left m-0">
                                            <li>TypeScript - The main programming language used to create the bot.</li>
                                            <li>Discord.js - The API used to communicate with Discord.</li>
                                            <li>Node.JS - The runtime used to run the bot.</li>
                                        </ul>
                                    </div>
                                </multi-height>
                            </div>
                        </portfolio-card>
                        <a
                            class="button m-8 mx-auto"
                            href="https://github.com/SelfMadeSystem/MyDiscordBot"
                            target="_blank"
                            >Visit</a
                        >
                    </div>
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
