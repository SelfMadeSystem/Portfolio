import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('section-five')
export class SectionFive extends LitElement {
    protected createRenderRoot() {
        return this;
    }

    render() {
        // @unocss-include
        return html`
            <portfolio-section class="primary z-1" id="contact">
                <div
                    id="game-development"
                    class="primary-card z-2 mb-24 flex flex-col items-center pt-8 px-2 lg:p-8 rounded-8"
                >
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
                            <h2 class="text-4xl px-6">Game Development</h2>
                            <multi-height class="relative w-full">
                                <div
                                    data-name="about"
                                    class="content active text-xl text-center m-auto absolute top-0 left-0 w-full"
                                >
                                    I am experienced in game development using Unity, Godot and C# as well as web-based
                                    game development using TypeScript. . Click on
                                    <span class="inline-flex items-center gap-1">
                                        <svg class="smol-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
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
                                    <div class="flex flex-row justify-center gap-4">
                                        <div class="flex flex-col items-center">
                                            <h4 class="text-2xl my-0">Languages</h4>
                                            <div>JavaScript</div>
                                            <div>TypeScript</div>
                                            <div>C#</div>
                                            <div>GDScript</div>
                                            <div>Java</div>
                                            <div>Rust</div>
                                        </div>
                                        <div class="flex flex-col items-center">
                                            <h4 class="text-2xl my-0">Game Engines</h4>
                                            <div>Godot</div>
                                            <div>Unity</div>
                                            <div>LWJGL</div>
                                            <div>HTML5</div>
                                        </div>
                                    </div>
                                </div>
                            </multi-height>
                        </div>
                    </portfolio-card>
                </div>

                <div class="pb-16 md:pl-15% w-full z-2">
                    <div
                        class="primary-card right w-full flex flex-col md:flex-row items-stretch lt-md:b-l-none! md:rounded-l-8"
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
                                    <h3 class="text-3xl">Minesvelte</h3>
                                    <multi-height class="relative w-full">
                                        <div
                                            data-name="about"
                                            class="content active text-xl text-center m-auto absolute top-0 left-0 w-full"
                                        >
                                            A Minesweeper variant made with Svelte and TypeScript. Inspired by the games
                                            <a href="https://store.steampowered.com/app/709920/Tametsi/" target="_blank"
                                                >Tametsi</a
                                            >
                                            and
                                            <a
                                                href="https://store.steampowered.com/app/265890/Hexcells/"
                                                target="_blank"
                                                >Hexcells</a
                                            >, this game offers an infinite amount of procedurally generated levels.
                                            <p>Note: Mobile support is currently being worked on.</p>
                                        </div>
                                        <div
                                            data-name="technologies"
                                            class="content text-xl text-center m-auto absolute top-0 left-0 w-full"
                                        >
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
                            <a class="button mb-8 mx-auto" href="https://minesvelte.shoghisimon.cc" target="_blank"
                                >Visit</a
                            >
                            <a
                                class="button mb-8 mx-auto"
                                href="https://github.com/SelfMadeSystem/Minesvelte"
                                target="_blank"
                                >Source Code</a
                            >
                        </div>
                        <div class="separator"></div>
                        <iframe
                            class="flex-1 grow-2 min-h-75vh border-none"
                            src="https://minesvelte.shoghisimon.cc"
                        ></iframe>
                    </div>
                </div>

                <div class="pb-16 md:pr-15% w-full z-2">
                    <div
                        class="primary-card left w-full flex flex-col-reverse md:flex-row items-stretch lt-md:b-r-none! md:rounded-r-8"
                    >
                        <iframe
                            class="flex-1 grow-2 min-h-75vh border-none"
                            src="https://www.youtube.com/embed/wRPCxOlBcvw?si=6ekrq65VDIpc4AWC"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen
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
                                    <h3 class="text-3xl">A Walk Around The Block</h3>
                                    <multi-height class="relative w-full">
                                        <div
                                            data-name="about"
                                            class="content active text-xl text-center m-auto absolute top-0 left-0 w-full"
                                        >
                                            A Walk Around The Block is a puzzle game where you play as a block and you
                                            have to rotate around other blocks to get to a goal. I wrote my IB Math
                                            paper about the collision system used in this game.
                                            <p>Note: still in development. Please contact me if you want a demo.</p>
                                        </div>
                                        <div
                                            data-name="technologies"
                                            class="content text-xl text-center m-auto absolute top-0 left-0 w-full"
                                        >
                                            <ul class="text-left m-0">
                                                <li>
                                                    Godot - The game engine used. Mostly for UI, its awesome node
                                                    system, and rendering.
                                                </li>
                                                <li>
                                                    C# - Used to implement everything else, including the collision
                                                    system.
                                                </li>
                                            </ul>
                                        </div>
                                    </multi-height>
                                </div>
                            </portfolio-card>
                            <!-- <a class="button m-8 mx-auto" href="https://minesvelte.shoghisimon.cc" target="_blank">Visit</a> -->
                        </div>
                    </div>
                </div>

                <div class="pb-16 md:pl-15% w-full z-2">
                    <div
                        class="primary-card right w-full flex flex-col md:flex-row items-stretch lt-md:b-l-none! md:rounded-l-8"
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
                                    <h3 class="text-3xl">X In A Row</h3>
                                    <multi-height class="relative w-full">
                                        <div
                                            data-name="about"
                                            class="content active text-xl text-center m-auto absolute top-0 left-0 w-full"
                                        >
                                            X In A Row is a game where you have to get X in a row. It's like Tic Tac
                                            Toe, but with more options and more fun. There are presets for regular Tic
                                            Tac Toe, Gomoku, Connect 4, and Connect 5. You can play online with friends
                                            too. There is also a hexagonal board and a triangular board. This game does
                                            actually work on mobile, including pinch to zoom.
                                        </div>
                                        <div
                                            data-name="technologies"
                                            class="content text-xl text-center m-auto absolute top-0 left-0 w-full"
                                        >
                                            <ul class="text-left m-0">
                                                <li>TypeScript - I used vanilla TypeScript for this project.</li>
                                                <li>SCSS - CSS with superpowers.</li>
                                                <li>socket.io - Used for the online multiplayer.</li>
                                                <li>Vite - Used as the bundler.</li>
                                            </ul>
                                        </div>
                                    </multi-height>
                                </div>
                            </portfolio-card>
                            <a class="button mb-8 mx-auto" href="https://xinarow.shoghisimon.cc" target="_blank"
                                >Visit</a
                            >
                            <a
                                class="button mb-8 mx-auto"
                                href="https://github.com/SelfMadeSystem/XInARow"
                                target="_blank"
                                >Source Code</a
                            >
                        </div>
                        <div class="separator"></div>
                        <iframe
                            class="flex-1 grow-2 min-h-75vh border-none"
                            src="https://xinarow.shoghisimon.cc"
                        ></iframe>
                    </div>
                </div>

                <div class="pb-16 md:pr-15% w-full z-2">
                    <div
                        class="primary-card left w-full flex flex-col md:flex-row items-stretch lt-md:b-r-none! md:rounded-r-8"
                    >
                        <iframe
                            class="flex-1 grow-2 min-h-75vh border-none"
                            src="https://www.youtube.com/embed/yaZyVcugjh4?si=kIUTAXE7Fsd5_q3N"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen
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
                                    <h3 class="text-3xl">mc-parkou-rs</h3>
                                    <multi-height class="relative w-full">
                                        <div
                                            data-name="about"
                                            class="content active text-xl text-center m-auto absolute top-0 left-0 w-full"
                                        >
                                            mc-parkou-rs is a Minecraft parkour server written in Rust. It is currently
                                            in development and is not yet readily available. It uses a variety of
                                            complex algorithms to generate parkour courses, such as a prediction
                                            algorithm to predict the player's movement and a path creation algorithm to
                                            generate the course.
                                        </div>
                                        <div
                                            data-name="technologies"
                                            class="content text-xl text-center m-auto absolute top-0 left-0 w-full"
                                        >
                                            <ul class="text-left m-0">
                                                <li>Rust - The programming language used.</li>
                                                <li>
                                                    <a href="https://valence.rs" target="_blank">Valence</a> - The
                                                    Minecraft server framework used.
                                                </li>
                                            </ul>
                                        </div>
                                    </multi-height>
                                </div>
                            </portfolio-card>
                            <a
                                class="button mb-8 mx-auto"
                                href="https://github.com/SelfMadeSystem/mc-parkou-rs"
                                target="_blank"
                                >Source Code</a
                            >
                        </div>
                    </div>
                </div>

                <div class="z-2 my-24 primary-card flex flex-col items-center py-8 lg:p-8 rounded-8">
                    <h2 class="text-4xl">Contact</h2>
                    <p class="text-xl max-w-lg text-center mx-8">
                        If you want to contact me, you can send me an email at
                        <a href="mailto:sms@shoghisimon.ca">sms@shoghisimon.ca</a> or send me a message on Discord at
                        <a href="https://discord.com/users/299298175825739776"><code>selfmadesystem</code></a>
                    </p>
                </div>

                <my-aquarium
                    slot="background"
                    class="absolute -top-40 h-[calc(100%+20rem)] z-1"
                    color="var(--base-wave)"
                ></my-aquarium>
            </portfolio-section>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'section-five': SectionFive;
    }
}
