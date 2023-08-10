import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

type PortfolioCardSelected =
    "about" | // Description of project
    "technologies" | // Technologies used (explain why they were used)
    "screenshots"; // Screenshots of project


/**
 * A card that displays a project.
 */
@customElement('portfolio-card')
export class PortfolioCard extends LitElement {
    @property({ type: String }) href = '';
    @property({ type: String }) title = '';
    // @property({ type: String }) description = '';
    // @property({ type: Array }) technologies: string[] = [];
    // @property({ type: Array }) screenshots: string[] = []; // TODO

    @state() selected: PortfolioCardSelected = "about";

    @state() height: number | undefined;


    protected createRenderRoot(): Element | ShadowRoot {
        return this;
    }

    calculateHeight() {
        const elems = this.querySelectorAll("p");

        let maxHeight = 0;

        elems.forEach(elem => {
            const height = elem.clientHeight;

            if (height > maxHeight) {
                maxHeight = height;
            }
        });

        this.height = maxHeight;
    }

    connectedCallback() {
        super.connectedCallback();

        requestAnimationFrame(() => {
            this.calculateHeight();
        });

        window.addEventListener("resize", () => {
            this.calculateHeight();
        });
    }

    render() {
        // @unocss-include
        return html`
        <div class="portfolio-card secondary-card h-full w-full
        flex flex-row justify-between gap-xl p-8 rounded-8">
            <div class="flex flex-col items-center justify-center">
                <button class="button" @click=${() => this.selected = "about"}>
                    <svg class=${this.selected === "about" ? "active" : ""} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z" /></svg>
                </button>
                <button class="button" @click=${() => this.selected = "technologies"}>
                    <svg class=${this.selected === "technologies" ? "active" : ""} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.71 20.29L20.29 21.71A1 1 0 0 1 18.88 21.71L7 9.85A3.81 3.81 0 0 1 6 10A4 4 0 0 1 2.22 4.7L4.76 7.24L5.29 6.71L6.71 5.29L7.24 4.76L4.7 2.22A4 4 0 0 1 10 6A3.81 3.81 0 0 1 9.85 7L21.71 18.88A1 1 0 0 1 21.71 20.29M2.29 18.88A1 1 0 0 0 2.29 20.29L3.71 21.71A1 1 0 0 0 5.12 21.71L10.59 16.25L7.76 13.42M20 2L16 4V6L13.83 8.17L15.83 10.17L18 8H20L22 4Z" /></svg>
                </button>
                <button class="button" @click=${() => this.selected = "screenshots"}>
                    <svg class=${this.selected === "screenshots" ? "active" : ""} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21,17H7V3H21M21,1H7A2,2 0 0,0 5,3V17A2,2 0 0,0 7,19H21A2,2 0 0,0 23,17V3A2,2 0 0,0 21,1M3,5H1V21A2,2 0 0,0 3,23H19V21H3M15.96,10.29L13.21,13.83L11.25,11.47L8.5,15H19.5L15.96,10.29Z" /></svg>
                </button>
            </div>
            <div class="flex flex-col justify-between gap-4">
                <h3 class="text-3xl">
                    ${this.title}
                </h3>
                <div class="md:w-lg relative" style="min-height: ${this.height}px">
                    <p class="text-xl text-center m-auto absolute top-0 left-0 w-full ${this.selected === "about" ? "active" : ""}">
                        ${this.children}
                    </p>
                </div>
                <a class="button" href=${this.href} target="_blank">Visit</a>
            </div>
        </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'portfolio-card': PortfolioCard;
    }
}