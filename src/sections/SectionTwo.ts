import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import BackendImg from '../assets/backend.png';
import FrontendImg from '../assets/frontend.png';
import GameImg from '../assets/game.png';

@customElement('section-two')
export class SectionTwo extends LitElement {
    protected createRenderRoot() {
        return this;
    }

    clickedCard(e: PointerEvent) {
        const card = e.currentTarget as HTMLElement;

        // Top div to prevent scrolling
        const topDiv = document.createElement('div');
        topDiv.classList.add('top-div');
        document.body.appendChild(topDiv);
        const cancel = (e: Event) => {
            e.preventDefault();
            e.stopPropagation();
        };
        topDiv.onwheel = cancel;
        topDiv.ontouchmove = cancel;
        topDiv.onpointermove = cancel;

        const duplicate = card.cloneNode(true) as HTMLElement;

        const jumpTo = card.dataset.jumpTo!;
        const element = document.getElementById(jumpTo);

        const scrollIntoView = () => {
            if (element) {
                element.scrollIntoView({
                    behavior: 'instant',
                    block: 'start',
                });
            }
        };

        card.style.visibility = 'hidden';

        const rect = card.getBoundingClientRect();

        const top = rect.top + card.offsetWidth * 0.0275; // 1.1 * 0.025 = 0.0275
        const left = rect.left + card.offsetWidth * 0.0275;
        const width = card.offsetWidth;
        const height = card.offsetHeight;
        // TODO: Doesn't work on mobile when transition to scale 1.05 isn't done

        duplicate.style.position = 'fixed';
        duplicate.style.top = `${top}px`;
        duplicate.style.left = `${left}px`;
        duplicate.style.width = `${width}px`;
        duplicate.style.height = `${height}px`;
        duplicate.style.zIndex = '1000';

        duplicate.style.scale = '1.05';

        duplicate.classList.remove('hover:scale-105');

        duplicate.animate(
            [
                {},
                {
                    top: `0px`,
                    left: `0px`,
                    width: `100%`,
                    height: `100%`,
                    scale: '1',
                    borderWidth: '0',
                    borderRadius: '0',
                },
            ],
            {
                duration: 500,
                easing: 'ease-in-out',
                fill: 'forwards',
            },
        ).onfinish = () => {
            card.style.visibility = '';

            duplicate.animate(
                [
                    {},
                    {
                        opacity: 0,
                    },
                ],
                {
                    duration: 300,
                    delay: 100, // Give time for window to scroll
                    easing: 'ease-in-out',
                },
            ).onfinish = () => {
                duplicate.remove();
                topDiv.remove();
            };

            scrollIntoView();

            window.history.pushState({}, '', `#${jumpTo}`);
        };

        card.parentElement!.appendChild(duplicate);

        requestAnimationFrame(() => {
            duplicate.classList.add('expanding');
        });
    }

    render() {
        // @unocss-include
        return html`
            <portfolio-section fullHeight class="primary" id="what-i-do">
                <div class="flex flex-wrap pt-8 md:px-16 justify-evenly w-full items-stretch gap-16 mb-16 z-6">
                    <div
                        @click=${this.clickedCard}
                        data-jump-to="web-development"
                        class="primary-card to-base flex flex-col items-center p-8 pb-4 rounded-8
                    transition-transform duration-200
                    cursor-pointer
                    hover:scale-105"
                    >
                        <h2 class="text-4xl text-center">Web Development</h2>
                        <img class="w-xs" alt="Some HTML Code" src=${FrontendImg} />

                        <p class="mt-4 text-sm text-center">Click to learn more</p>
                    </div>
                    <div
                        @click=${this.clickedCard}
                        data-jump-to="backend-development"
                        class="primary-card to-secondary flex flex-col items-center p-8 pb-4 rounded-8
                    transition-transform duration-200
                    cursor-pointer
                    hover:scale-105"
                    >
                        <h2 class="text-4xl text-center">Backend Development</h2>
                        <img class="w-xs" alt="Some Java Code" src=${BackendImg} />

                        <p class="mt-4 text-sm text-center">Click to learn more</p>
                    </div>
                    <div
                        @click=${this.clickedCard}
                        data-jump-to="game-development"
                        class="primary-card to-primary flex flex-col items-center p-8 pb-4 rounded-8
                    transition-transform duration-200
                    cursor-pointer
                    hover:scale-105"
                    >
                        <h2 class="text-4xl text-center">Game Development</h2>
                        <img class="w-xs" alt="Minesvelte Game" src=${GameImg} />

                        <p class="mt-4 text-sm text-center">Click to learn more</p>
                    </div>
                </div>

                <my-aquarium
                    slot="background"
                    maskid="wave2"
                    flipmasky
                    class="absolute inset-0
                    -top-[100vh] h-[calc(100%+100vh+10rem)] z-5"
                    color="var(--base-wave)"
                >
                </my-aquarium>
            </portfolio-section>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'section-two': SectionTwo;
    }
}
