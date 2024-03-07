import { LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

/**
 * A card that displays a project.
 */
@customElement('portfolio-card')
export class PortfolioCard extends LitElement {
    protected createRenderRoot() {
        return this;
    }

    connectedCallback() {
        super.connectedCallback();

        const buttons = this.querySelectorAll('button');

        buttons.forEach(button => {
            button.addEventListener('click', () => {
                buttons.forEach(button => {
                    button.classList.remove('active');
                });

                button.classList.add('active');

                const allContent = this.querySelectorAll(`[data-name]`);

                const content = this.querySelectorAll(`[data-name="${button.dataset.for}"]`);

                allContent.forEach(content => {
                    content.classList.remove('active');
                });

                content.forEach(content => {
                    content.classList.add('active');
                });
            });
        });
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'portfolio-card': PortfolioCard;
    }
}
