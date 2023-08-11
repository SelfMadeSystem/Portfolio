import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('section-two')
export class SectionTwo extends LitElement {
    protected createRenderRoot(): Element | ShadowRoot {
        return this;
    }

    clickedCard(e: PointerEvent) {
        const card = e.currentTarget as HTMLElement;

        const duplicate = card.cloneNode(true) as HTMLElement;

        card.style.visibility = 'hidden';

        duplicate.style.position = 'fixed';

        const rect = card.getBoundingClientRect();
        // shrink rect by 1/1.05 to account for scale
        const top = rect.top + rect.height * 0.025;
        const left = rect.left + rect.width * 0.025;
        const width = rect.width * 0.95;
        const height = rect.height * 0.95;

        duplicate.style.top = `${top}px`;
        duplicate.style.left = `${left}px`;
        duplicate.style.width = `${width}px`;
        duplicate.style.height = `${height}px`;
        duplicate.style.zIndex = '1000';

        duplicate.style.scale = '1.05';

        duplicate.animate([
            {},
            {
                top: `0px`,
                left: `0px`,
                width: `100%`,
                height: `100%`,
            }],
            {
                duration: 500,
                easing: 'ease-in-out',
            }).onfinish = () => {
                duplicate.style.position = '';
                duplicate.style.top = '';
                duplicate.style.left = '';
                duplicate.style.width = '';
                duplicate.style.height = '';
                duplicate.style.zIndex = '';
                duplicate.style.scale = '';

                card.style.visibility = '';

                duplicate.remove();
            };

        document.body.appendChild(duplicate);

        requestAnimationFrame(() => {
            duplicate.classList.add('expanding');
        })
    };

    render() {
        // @unocss-include
        return html`
          <portfolio-section fullHeight class="primary"
            id="what-i-do">
            <div class="flex flex-wrap pt-8 px-16 justify-evenly w-full items-stretch gap-16 mb-16 z-6">
                <div
                    @click=${this.clickedCard}
                    class="primary-card flex flex-col items-center p-8 rounded-8
                    transition-transform duration-200
                    cursor-pointer
                    hover:scale-105">
                    <h2 class="text-4xl text-center">Web Development</h2>
                    <p class="text-xl max-w-sm text-center">
                    I create beautiful and reliable websites and web applications. I use modern
                    technologies like TypeScript, React, Vue, Lit, Tailwind, Vite, WordPress
                    and Shopify, but I also like to use vanilla HTML, CSS and JavaScript.
                    </p>
                </div>
                <div
                    @click=${this.clickedCard}
                    class="primary-card flex flex-col items-center p-8 rounded-8
                    transition-transform duration-200
                    cursor-pointer
                    hover:scale-105">
                    <h2 class="text-4xl text-center">Backend Development</h2>
                    <p class="text-xl max-w-sm text-center">
                    I create fast and reliable backend applications. I use modern
                    technologies like NodeJS, MongoDB, MySQL, PostgreSQL, PHP, Java,
                    C# and Rust. I would also like to learn older technologies like
                    C or COBOL.
                    </p>
                </div>
                <div
                    @click=${this.clickedCard}
                    class="primary-card flex flex-col items-center p-8 rounded-8
                    transition-transform duration-200
                    cursor-pointer
                    hover:scale-105">
                    <h2 class="text-4xl text-center">Game Development</h2>
                    <p class="text-xl max-w-sm text-center">
                    I like to mess around in game engines to challenge my creativity and
                    algorithmic problem solving skills outside of the regular tech landscape.
                    I use primarily Godot with GDScript and C#.
                    </p>
                </div>
            </div>

            <my-aquarium slot="background"
            maskid="wave2"
            flipmasky
            class="absolute inset-0
                    -top-[100vh] h-[calc(100%+100vh+10rem)] z-5"
            color="var(--base-wave)">
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