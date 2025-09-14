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
            <portfolio-section fullHeight class="secondary">
                <my-wave id="wave3" color="var(--base-wave)" class="relative transform -scale-y-[1] z-1"></my-wave>
                <div
                    class="secondary-card top-card title relative flex flex-col items-center
                -mb-24 -top-40 pt-32"
                >
                    <div id="backend-development" class="z-2 flex flex-col items-center pt-8 px-2 lg:p-8 rounded-8">
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
                                <h2 class="text-4xl mx-auto px-6 lg:px-0">Backend Development</h2>
                                <multi-height class="relative w-full">
                                    <div
                                        data-name="about"
                                        class="content active text-xl text-center m-auto absolute top-0 left-0 w-full"
                                    >
                                        When applications need to handle millions of users or process complex data, 
                                        that's where I shine. I've built everything from high-traffic Discord bots to 
                                        sophisticated development tools, always focusing on performance, reliability, 
                                        and developer experience.
                                    </div>
                                    <div
                                        data-name="technologies"
                                        class="content text-xl text-center m-auto absolute top-0 left-0 w-full"
                                    >
                                        <h3 class="text-3xl my-0">Technologies</h3>
                                        <div class="flex flex-row overflow-x-auto gap-4">
                                            <div class="flex flex-col items-center">
                                                <h4 class="text-2xl my-0">Languages</h4>
                                                <div>TypeScript</div>
                                                <div>Java</div>
                                                <div>Rust</div>
                                                <div>C#</div>
                                                <div>GDScript</div>
                                                <div>Haskell</div>
                                                <div>PHP</div>
                                                <div>Python</div>
                                            </div>
                                            <div class="flex flex-col items-center">
                                                <h4 class="text-2xl my-0">Frameworks</h4>
                                                <div>Next.JS</div>
                                                <div>Node.JS</div>
                                                <div>Bun.JS</div>
                                                <div>ASP.NET</div>
                                                <div>Express.JS</div>
                                                <div>Remix</div>
                                                <div>Rocket</div>
                                            </div>
                                            <div class="flex flex-col items-center">
                                                <h4 class="text-2xl my-0">Tools</h4>
                                                <div>Google</div>
                                                <div>Git</div>
                                                <div>Nix</div>
                                                <div>VSCode</div>
                                                <div>Fish</div>
                                                <div>Bash</div>
                                            </div>
                                            <div class="flex flex-col items-center">
                                                <h4 class="text-2xl my-0">Systems</h4>
                                                <div>Nginx</div>
                                                <div>Linux</div>
                                                <div>Apache2</div>
                                                <div>Podman</div>
                                                <div>Docker</div>
                                                <div>Kubernetes</div>
                                            </div>
                                            <div class="flex flex-col items-center">
                                                <h4 class="text-2xl my-0">Services</h4>
                                                <div>MySQL</div>
                                                <div>PostgreSQL</div>
                                                <div>MinIO</div>
                                                <div>MariaDB</div>
                                                <div>SQLite</div>
                                            </div>
                                        </div>
                                    </div>
                                </multi-height>
                            </div>
                        </portfolio-card>
                    </div>
                    <my-wave
                        color="var(--secondary-wave)"
                        neonempty
                        amount="2"
                        opacity="0.5"
                        class="relative z-1"
                    ></my-wave>
                </div>

                <div
                    class="flex flex-wrap pt-8 md:px-16 justify-evenly w-full items-stretch gap-x-48 sm:gap-x-16 gap-16 mb-16 z-6"
                >
                    <div
                        class="secondary-card flex-1 grow-1 flex flex-col justify-between rounded-8 sm:min-w-md max-w-lg"
                    >
                        <portfolio-card class="portfolio-card flex flex-col-reverse justify-between gap-xl p-8">
                            <div class="flex flex-row flex-wrap items-center justify-center">
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
                            <div class="flex flex-col justify-between gap-4 max-w-[calc(100vw-2rem)]">
                                <h3 class="text-3xl">Countryvia</h3>
                                <multi-height class="relative w-full">
                                    <div
                                        data-name="about"
                                        class="content active text-xl text-center m-auto absolute top-0 left-0 w-full"
                                    >
                                        I took over development of Countryvia, a popular Discord trivia bot focused on 
                                        geography and country facts. Built with Node.js and TypeScript, it serves over 
                                        65,000 servers and 2 million users, making it one of Discord's most widely-used 
                                        trivia bots.
                                    </div>
                                    <div
                                        data-name="technologies"
                                        class="content text-xl text-center m-auto absolute top-0 left-0 w-full"
                                    >
                                        <ul class="text-left m-0">
                                            <li>NodeJS - A JavaScript runtime built on Chrome's V8 JavaScript engine</li>
                                            <li>TypeScript - JavaScript with types. It's great!</li>
                                            <li>Discord.JS - A powerful library for interacting with the Discord API</li>
                                        </ul>
                                    </div>
                                </multi-height>
                            </div>
                        </portfolio-card>
                        <a
                            class="button m-8 mx-auto"
                            href="https://discord.gg/4vSs3KJUNN"
                            target="_blank"
                            >Join the Discord</a
                        >
                    </div>

                    <div
                        class="secondary-card flex-1 grow-1 flex flex-col justify-between rounded-8 sm:min-w-md max-w-lg"
                    >
                        <portfolio-card class="portfolio-card flex flex-col-reverse justify-between gap-xl p-8">
                            <div class="flex flex-row flex-wrap items-center justify-center">
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
                            <div class="flex flex-col justify-between gap-4 max-w-[calc(100vw-2rem)]">
                                <h3 class="text-3xl">Live JSX Editor</h3>
                                <multi-height class="relative w-full">
                                    <div
                                        data-name="about"
                                        class="content active text-xl text-center m-auto absolute top-0 left-0 w-full"
                                    >
                                        A real-time JSX editor with live preview, featuring multi-file support,
                                        NPM package imports, and advanced tooling. Built with custom esbuild
                                        integration and TailwindCSS v4 support for a seamless development experience.
                                        Perfect for prototyping and sharing React components quickly.
                                    </div>
                                    <div
                                        data-name="technologies"
                                        class="content text-xl text-center m-auto absolute top-0 left-0 w-full"
                                    >
                                        <ul class="text-left m-0">
                                            <li>TypeScript - JavaScript with types. It's great!</li>
                                            <li>React - A JavaScript library for building user interfaces</li>
                                            <li>esbuild - An extremely fast JavaScript bundler and minifier</li>
                                            <li>TailwindCSS - A utility-first CSS framework for rapid UI development</li>
                                            <li>Monaco Editor - The code editor that powers VS Code, for the web</li>
                                        </ul>
                                    </div>
                                </multi-height>
                            </div>
                        </portfolio-card>
                        <a
                            class="button m-8 mx-auto"
                            href="https://live-jsx-app.shoghisimon.ca/"
                            target="_blank"
                            >Visit</a
                        >
                    </div>

                    <div
                        class="secondary-card flex-1 grow-1 flex flex-col justify-between rounded-8 sm:min-w-md max-w-lg"
                    >
                        <portfolio-card class="portfolio-card flex flex-col-reverse justify-between gap-xl p-8">
                            <div class="flex flex-row flex-wrap items-center justify-center">
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
                            <div class="flex flex-col justify-between gap-4 max-w-[calc(100vw-2rem)]">
                                <h3 class="text-3xl">ServerScripter</h3>
                                <multi-height class="relative w-full">
                                    <div
                                        data-name="about"
                                        class="content active text-xl text-center m-auto absolute top-0 left-0 w-full"
                                    >
                                        A multi-platform Minecraft plugin that enables server-side scripting in multiple 
                                        languages. Built with Java and designed for cross-platform compatibility, it's been 
                                        powering MC-Galaxy since 2021, dramatically speeding up feature development through 
                                        rapid script implementation.
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
