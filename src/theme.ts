export type Theme = {
    frontName: string;
    isNeon: boolean;
};

// Frontend name -> Backend name (css class applied to body)
export const THEMES = {
    // TODO: System theme
    light: {
        frontName: 'Light',
        isNeon: false,
    },
    dark: {
        frontName: 'Dark',
        isNeon: true,
    },
    // for now, that's it
} satisfies Record<string, Theme>;

export type Themes = keyof typeof THEMES;

export const THEME_NAMES: Themes[] = Object.keys(THEMES) as Themes[];

export function getTheme(): Themes {
    const theme = document.body.classList.contains('dark') ? 'dark' : 'light';
    return theme;
}

export function isNeon(): boolean {
    return THEMES[getTheme()].isNeon;
}

export function setTheme(theme: Themes, save: boolean = true) {
    document.body.classList.remove(getTheme());
    document.body.classList.add(theme);

    if (save) localStorage.setItem('theme', theme);
}

export function initTheme() {
    const theme = localStorage.getItem('theme');
    if (theme != null) {
        setTheme(theme as Themes);
    } else {
        // Auto detect theme
        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const setTheStuff = () => {
            if (darkModeMediaQuery.matches) {
                setTheme('dark', false);
            } else {
                setTheme('light', false);
            }
        };

        darkModeMediaQuery.addEventListener('change', setTheStuff);
        setTheStuff();
    }
}

initTheme();
