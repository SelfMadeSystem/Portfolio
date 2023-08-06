import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { THEME_NAMES, getTheme, setTheme } from '../theme';

/**
 * ThemeSwitcher is a component that allows the user to switch between themes.
 */
@customElement('theme-switcher')
export class ThemeSwitcher extends LitElement {
    render() {
        const currentTheme = getTheme();
        return html`
        <select @change=${(e: Event) => {
                const theme = (e.target as HTMLSelectElement).value;
                setTheme(theme as any);
            }}>
            ${THEME_NAMES.map(theme => html`
            <option value=${theme} ?selected=${theme === currentTheme}>${theme}</option>
            `)}
        </select>
        `;
    }

    static override styles = css`
        `;
}

declare global {
    interface HTMLElementTagNameMap {
        'theme-switcher': ThemeSwitcher;
    }
}