import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * A slider meant to represent my current skill level in a particular skill.
 *
 * @slot - This element has a slot
 */
@customElement('skill-slider')
export class SkillSlider extends LitElement {
    /**
     * The color scheme of the skill.
     */
    @property({ type: String })
    colorScheme = '';

    /**
     * The value from 0 to 100 of the slider.
     */
    @property({ type: Number })
    value = 0;

    render() {
        return html`
        <div class="slider" style="--__skill-slider-value: ${this.value};
        --skill-slider-track-color: var(--${this.colorScheme});">
            <div class="track"></div>
            <div class="thumb"></div>
        </div>
        `;
    }

    static override styles = css`
        :host {
            display: block;
            width: 100%;
            height: 100%;
        }

        .slider {
            position: relative;
            width: 100%;
            height: 100%;
        }

        .track {
            position: absolute;
            inset: 0;
            background-color: var(--skill-slider-track-color, var(--skill-slider-track-color-default));
            border-radius: var(--skill-slider-track-border-radius, var(--skill-slider-track-border-radius-default));
        }

        .thumb {
            position: absolute;
            inset: 0;
            background-color: var(--skill-slider-thumb-color, var(--skill-slider-thumb-color-default));
            border-radius: var(--skill-slider-thumb-border-radius, var(--skill-slider-thumb-border-radius-default));
            transform: translateX(calc(var(--__skill-slider-value) * 1% - 50%));
        }

        .slider::before {
            content: '';
            position: absolute;
            inset: 0;
            background-color: var(--skill-slider-track-color, var(--skill-slider-track-color-default));
            border-radius: var(--skill-slider-track-border-radius, var(--skill-slider-track-border-radius-default));
            opacity: 0.5;
        }

        .slider::after {
            content: '';
            position: absolute;
            inset: 0;
            background-color: var(--skill-slider-thumb-color, var(--skill-slider-thumb-color-default));
            border-radius: var(--skill-slider-thumb-border-radius, var(--skill-slider-thumb-border-radius-default));
            transform: translateX(calc(var(--__skill-slider-value) * 1% - 50%));
            opacity: 0.5;
        }
        `;
}

declare global {
    interface HTMLElementTagNameMap {
        'skill-slider': SkillSlider;
    }
}