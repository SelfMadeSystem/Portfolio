import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import type { Themes } from '../theme';
import { THEME_NAMES, getTheme, setTheme } from '../theme';

/**
 * ThemeSwitcher is a component that allows the user to switch between themes.
 *
 * TODO: Don't make it take up too much space on mobile.
 */
@customElement('theme-switcher')
export class ThemeSwitcher extends LitElement {
    protected createRenderRoot() {
        return this;
    }

    render() {
        const currentTheme = getTheme();

        return html`
            <button
                @click=${() => this.setTheme(THEME_NAMES[(THEME_NAMES.indexOf(currentTheme) + 1) % THEME_NAMES.length])}
                class="theme-switcher"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                        color="currentColor"
                        d="M12,18C11.11,18 10.26,17.8 9.5,17.45C11.56,16.5 13,14.42 13,12C13,9.58 11.56,7.5 9.5,6.55C10.26,6.2 11.11,6 12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18M20,8.69V4H15.31L12,0.69L8.69,4H4V8.69L0.69,12L4,15.31V20H8.69L12,23.31L15.31,20H20V15.31L23.31,12L20,8.69Z"
                    />
                </svg>
                Theme
            </button>
        `;
    }

    setTheme(theme: Themes) {
        setTheme(theme);
        this.requestUpdate();
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'theme-switcher': ThemeSwitcher;
    }
}
