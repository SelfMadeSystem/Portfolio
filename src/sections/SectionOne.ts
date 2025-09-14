import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('section-one')
export class SectionOne extends LitElement {
    protected createRenderRoot() {
        return this;
    }

    render() {
        // @unocss-include
        return html`
            <portfolio-section fullHeight id="start">
                <div
                    id="header-card"
                    class="flex flex-col items-center
                    backdrop-filter backdrop-blur-md
                    rounded-8 p-8 mt-16 z-6 overflow-hidden
            "
                >
                    <div class="z-8">
                        <h1 class="text-6xl text-center">
                            <span>Hi, I'm</span>
                            <span>Shoghi Simon</span>
                            <span id="hand-wave">👋</span>
                        </h1>
                        <div class="text-xl max-w-lg mx-auto text-center">
                            I've built Discord bots serving 2+ million users, e-commerce sites that 
                            tripled sales, and development tools that speed up workflows.
                        </div>
                        <div
                            class="text-lg block max-w-lg mx-auto text-center mt-4 opacity-80 cursor-pointer"
                            @click=${(e: Event) => {
                                e.preventDefault();
                                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                            }}>
                            Let's build something amazing together.
                        </div>
                    </div>
                </div>

                <my-wave
                    slot="background"
                    id="wave1"
                    neonempty
                    neonclipped
                    class="absolute inset-0 transform -scale-y-[1] z-6"
                    .speed=${[0.01, 0.03] satisfies [number, number]}
                    .waveWidth=${[2, 4] satisfies [number, number]}
                    waveHeight="1"
                    amount="3"
                    opacity="0.6"
                    ?wavewidthinrelationtoheight=${false}
                    color="var(--base-wave)"
                ></my-wave>

                <div
                    slot="background"
                    id="arrow-down"
                    class="absolute
                    bottom-16 left-1/2
                    transform -translate-x-1/2 rotate-45
                    cursor-pointer
                    w-8 h-8
                    z-6"
                    @click=${() => {
                        document.getElementById('what-i-do')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                ></div>
            </portfolio-section>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'section-one': SectionOne;
    }
}
